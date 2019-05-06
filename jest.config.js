module.exports = {
  bail: false,
  collectCoverage: true,
  collectCoverageFrom: [
    // 'src/?(**/)*.[jt]s',
    'src/*.[jt]s',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [],
  coverageReporters: [
    'text',
    'html',
  ],
  notify: true,
  testMatch: [
    '**/?(*.)test.[jt]s',
  ],
  testURL: 'http://localhost/',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
};
