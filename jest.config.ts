/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
  transform: {
    // '^.+\\.[tj]sx?$' для обработки файлов js/ts с помощью `ts-jest`
    // '^.+\\.m?[tj]sx?$' для обработки файлов js/ts/mjs/mts с помощью `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // настройки для ts-jest
      },
    ],
  },
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    '^@api': '<rootDir>/src/utils/burger-api.ts'
  }
};

export default config;
