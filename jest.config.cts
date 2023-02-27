module.exports = {
    verbose: true,
    rootDir: "./",
    roots: ["<rootDir>"],
    moduleNameMapper: {
        "~(.*)": "<rootDir>/src$1",
    },
    // clearMocks: true,
    testEnvironment: "node",
    testMatch: ["<rootDir>/src/**/__tests__/**/*.[jt]s?(x)", "<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"],
    preset: "ts-jest",
    transform: {
        "^.+.tsx?$": [
            "ts-jest",
            {
                tsconfig: "<rootDir>/tsconfig.json",
            },
        ],
    },
}
