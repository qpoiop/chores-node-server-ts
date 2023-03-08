import autocannon from "autocannon"

// 성능 측정 테스트 모듈
describe("Performance Test", () => {
    let result
    // 서버 URL을 가져옴
    const serverUrl = global.SERVER_URL || "http://localhost:3000"

    // 성능 측정 테스트 이전에 서버 실행
    beforeAll(async () => {
        // 서버 URL이 없으면 에러 처리
        if (!serverUrl) {
            throw new Error("Server URL not found")
        }

        // autocannon을 사용하여 HTTP 성능 측정 실행
        result = await autocannon({
            url: serverUrl,
            connections: 10,
            duration: 10,
        })
    })

    // 성능 측정 결과를 출력하고 테스트 종료
    test("measure performance", async () => {
        console.log("result:", result)

        // 평균 파일 사이즈 계산
        const meanResponseSize = result.latency.mean * (result.throughput.mean / 1000)
        const totalBytes = result.latency.totalCount * meanResponseSize
        const meanFileSize = totalBytes / result.requests.total
        console.log(`평균 파일 사이즈: ${meanFileSize} bytes`)

        // 처리량 계산
        const throughput = result.throughput.average
        console.log(`평균 요청당 처리량: ${throughput} requests/second`)

        // 에러율 계산
        const errorRate = result.errors / result.requests.total
        console.log(`에러 발생률: ${(errorRate * 100).toFixed(2)}%`)

        // 메모리 사용량 출력
        const memoryUsage = process.memoryUsage().rss
        console.log(`메모리 사용량: ${memoryUsage} bytes`)

        // 측정 시간 출력
        console.log(`측정 시간: ${result.duration} ms`)

        // 프로미스 반환
        // return new Promise(resolve => setTimeout(resolve, 0))
    }, 30000) // 타임아웃 시간을 30초로 설정
})
