module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.test.(ts|js)'],
  collectCoverage: true,
  // globalSetup: "<rootDir>/__tests__/repository/globalSetup.ts",
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
};
