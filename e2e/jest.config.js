module.exports = {
    // 테스트 파일 경로 지정
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js?$",
    // 테스트 환경 설정
    testEnvironment: "node",
    // 자세한 실행 결과 출력 옵션
    verbose: true,
    // 코드 커버리지 측정
    collectCoverage: true,
    // 커버리지 결과 파일 저장 폴더 설정
    coverageDirectory: "<rootDir>/coverage",
    // 테스트 실행 전 파일 설정
    setupFiles: ["<rootDir>/setup.js"],
    // jest 기본 리포터와 로그 출력 리포터 설정
    reporters: ["default", ["jest-junit", { outputDirectory: "reports", outputName: "report.xml" }]],
    // 병렬 실행 워커 수 설정
    // maxWorkers: 4,
    // 예상하지 못한 에러 발생시 테스트 중단
    bail: true,
    // 실행할 파일 확장자 목록 설정
    moduleFileExtensions: ["js", "json"],
    // TypeScript를 사용하기 위한 설정
    transform: {
        "^.+\\.js$": "babel-jest",
    },
}
