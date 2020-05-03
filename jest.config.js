module.exports = {
  preset: "ts-jest",
  testRegex: "/test/.*.test.ts$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  globals: {
    "ts-jest": {
      packageJson: "package.json",
    },
  },
  collectCoverageFrom: ["<rootDir>/src/index.ts"],
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
