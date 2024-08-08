const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');

// Paths
const coverageSummaryPath = path.resolve(__dirname, 'coverage/coverage-summary.json');
const junitReportPath = path.resolve(__dirname, 'coverage/report.xml');

// Load coverage-summary.json
const coverageSummary = JSON.parse(fs.readFileSync(coverageSummaryPath, 'utf8'));

// Check if report.xml exists
if (!fs.existsSync(junitReportPath)) {
    const errorMessage = '::error:: report.xml not found. Add jest-junit plugin for the test report https://www.npmjs.com/package/jest-junit';
    console.error(errorMessage);
    process.exit(1);
}

// Load report.xml
const junitReport = fs.readFileSync(junitReportPath, 'utf8');

// Function to create a coverage badge URL based on coverage percentage
function createCoverageBadge(coverage) {
    let color;
    if (coverage < 40) {
        color = 'red';
    } else if (coverage < 60) {
        color = 'orange';
    } else if (coverage < 80) {
        color = 'yellow';
    } else if (coverage < 90) {
        color = 'yellowgreen';
    } else {
        color = 'green';
    }
    return `https://img.shields.io/badge/Coverage-${coverage}%25-${color}.svg`;
}

// Process coverage-summary.json data
let totalStatements = 0;
let coveredStatements = 0;
let totalBranches = 0;
let coveredBranches = 0;
let totalFunctions = 0;
let coveredFunctions = 0;
let totalLines = 0;
let coveredLines = 0;

for (const [filePath, data] of Object.entries(coverageSummary)) {
    if (filePath !== 'total') {
        totalStatements += data.statements.total;
        coveredStatements += data.statements.covered;
        totalBranches += data.branches.total;
        coveredBranches += data.branches.covered;
        totalFunctions += data.functions.total;
        coveredFunctions += data.functions.covered;
        totalLines += data.lines.total;
        coveredLines += data.lines.covered;
    }
}

// Calculate coverage percentages
const statementsCoverage = Math.round((coveredStatements / totalStatements) * 100);
const branchesCoverage = Math.round((coveredBranches / totalBranches) * 100);
const functionsCoverage = Math.round((coveredFunctions / totalFunctions) * 100);
const linesCoverage = Math.round((coveredLines / totalLines) * 100);

// Generate coverage badge
const coverageBadgeURL = createCoverageBadge(statementsCoverage);

// Process JUnit report data
let tests = 0;
let skipped = 0;
let failures = 0;
let errors = 0;
let time = 0;

parseString(junitReport, (err, result) => {
    if (err) {
        throw new Error('Error parsing JUnit report XML');
    }
    const testsuites = result.testsuites.testsuite;
    testsuites.forEach((suite) => {
        tests += parseInt(suite.$.tests, 10);
        skipped += parseInt(suite.$.skipped, 10);
        failures += parseInt(suite.$.failures, 10);
        errors += parseInt(suite.$.errors, 10);
        time += parseFloat(suite.$.time);
    });
});

// Format time in minutes and seconds
const minutes = Math.floor(time / 60);
const seconds = (time % 60).toFixed(2);

// Prepare the file-level coverage report table
const coverageReport = [];
const summary = coverageSummary.total;

Object.keys(coverageSummary).forEach(filePath => {
    if (filePath !== 'total') {
        const relativeFilePath = path.relative(__dirname, filePath);
        const fileCoverage = coverageSummary[filePath];

        coverageReport.push({
            file: relativeFilePath,
            lines: `${fileCoverage.lines.covered}/${fileCoverage.lines.total}`,
            branches: `${fileCoverage.branches.covered}/${fileCoverage.branches.total}`,
            functions: `${fileCoverage.functions.covered}/${fileCoverage.functions.total}`,
            statements: `${fileCoverage.statements.covered}/${fileCoverage.statements.total}`
        });
    }
});

// Convert the coverage report to markdown table format
const tableHeaders = ['File', 'Statements (Covered/Total)', 'Branches (Covered/Total)', 'Functions (Covered/Total)', 'Lines (Covered/Total)'];
const tableRows = coverageReport.map(row => [row.file, row.statements, row.branches, row.functions, row.lines]);

const markdownTable = [
    `| ${tableHeaders.join(' | ')} |`,
    `| ${tableHeaders.map(() => '---').join(' | ')} |`,
    ...tableRows.map(row => `| ${row.join(' | ')} |`)
].join('\n');

// Prepare the summary
const summaryTable = [
    `| Metric | Total | Covered | Uncovered |`,
    `| ------ | ----- | ------- | --------- |`,
    `| Statements | ${summary.statements.total} | ${summary.statements.covered} | ${summary.statements.total - summary.statements.covered} |`,
    `| Branches | ${summary.branches.total} | ${summary.branches.covered} | ${summary.branches.total - summary.branches.covered} |`,
    `| Functions | ${summary.functions.total} | ${summary.functions.covered} | ${summary.functions.total - summary.functions.covered} |`,
    `| Lines | ${summary.lines.total} | ${summary.lines.covered} | ${summary.lines.total - summary.lines.covered} |`
].join('\n');

// Get coverage threshold from GitHub Actions inputs
const coverageThreshold = parseInt(process.env.COVERAGE_THRESHOLD, 10) || 70;
console.log(`DEBUG: Read coverageThreshold: ${coverageThreshold}`);
const coverageStatus = statementsCoverage >= coverageThreshold ? 'PASSED' : 'FAILED';

// Determine badge color
const statusColor = coverageStatus === 'PASSED' ? 'green' : 'red';
const coverageStatusBadgeURL = `https://img.shields.io/badge/Status-${coverageStatus}-${statusColor}.svg`;

// Generate the full markdown content with accordion
const markdownContent = `# Test Coverage Report

#### Generated on: ${new Date().toLocaleString()}

## Coverage Threshold

#### Coverage Threshold: ${coverageThreshold}%

![${coverageStatus}](${coverageStatusBadgeURL})

## Coverage Summary

| Lines | Statements | Branches | Functions |
| --- | --- | --- | --- |
| <img alt="Coverage: ${statementsCoverage}%" src="${coverageBadgeURL}" /><br/> | ${linesCoverage}% (${coveredLines}/${totalLines}) | ${branchesCoverage}% (${coveredBranches}/${totalBranches}) | ${functionsCoverage}% (${coveredFunctions}/${totalFunctions}) |

## Test Summary

| Tests | Skipped | Failures | Errors | Time |
| ----- | ------- | -------- | ------ | ---- |
| ${tests} | ${skipped} :zzz: | ${failures} :x: | ${errors} :fire: | ${minutes}m ${seconds}s :stopwatch: |

<details>
<summary><h2>File Coverage Details</h2></summary>

${markdownTable}

</details>

`;

// Write the markdown content to a file
const outputFilePath = path.resolve(__dirname, 'test-coverage-report.md');
fs.writeFileSync(outputFilePath, markdownContent);

console.log(`Coverage report generated at ${outputFilePath}`);
console.log(`Coverage threshold: ${coverageThreshold}%`);
console.log(`Status: ${coverageStatus}`);

if (coverageStatus === 'FAILED') {
    const errorMessage = `::error::Test Coverage is below the threshold of ${coverageThreshold}%`;
    console.error(errorMessage);
    console.error('Error: Process completed with exit code 1');
    process.exit(1);
}