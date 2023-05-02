module.exports = {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: ['<rootDir>/src/app/**/*.js'],

  coverageDirectory: '__tests__/coverage',

  coverageReporters: ['text-summary', 'lcov'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  testMatch: ['**/__tests__/**/*.test.js'],

  transform: {
    '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin',
  },

  globals: {
    connection: null,
  },
};
