module.exports = {
  verbose: true,
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,js,vue}'
  ],
  coveragePathIgnorePatterns: [
    'src/main.ts',
    'src/main.interfaces.ts',
    'src/main.constants.ts',
    'src/router/index.ts',
    'src/store/*',
  ],
  coverageReporters: ['html', 'text', 'lcov'],
  moduleFileExtensions: ['js', 'json', 'ts', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
}