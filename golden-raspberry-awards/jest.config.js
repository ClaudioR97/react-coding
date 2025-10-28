export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', 
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', 
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@mui|@babel)/)', 
  ],
};
