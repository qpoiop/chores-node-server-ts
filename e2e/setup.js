import { spawn } from "child_process"
import path from "path"
import net from "net"

// 서버 실행 커맨드
const serverStartCommand = `yarn start:dev`
// 서버 디렉토리 경로
const serverDirPath = path.join(__dirname, "..")

let serverProcess
let serverUrl

// 서버 프로세스 실행 함수
const startServer = () => {
    serverProcess = spawn(serverStartCommand, {
        cwd: serverDirPath,
        stdio: ["pipe", "pipe", "pipe"],
        shell: true,
    })

    // 서버 에러 처리
    serverProcess.stderr.on("data", data => {
        console.error(`Server error: ${data}`)
    })

    // 서버 시작 후 서버 URL 추출 및 환경변수 설정
    serverProcess.stdout.on("data", data => {
        const dataStr = data.toString()
        const urlMatch = dataStr.match(/Server started at (https?:\/\/[\w.:]+)\n/)
        if (urlMatch) {
            serverUrl = urlMatch[1]
            global.SERVER_URL = serverUrl
            console.log(`Server started at ${serverUrl}`)
        }
    })

    // 서버 프로세스 종료 처리
    serverProcess.on("exit", code => {
        console.log(`Server exited with code ${code}`)
    })
}

// 포트 사용 가능 여부 체크 함수
const checkPortInUse = port => {
    return new Promise((resolve, reject) => {
        const server = net.createServer()
        server.once("error", err => {
            if (err.code === "EADDRINUSE") {
                console.error(`Port ${port} is already in use`)
                reject(err)
            } else {
                reject(err)
            }
            server.close()
        })
        server.once("listening", () => {
            server.close()
            resolve()
        })
        server.listen(port)
    })
}

// 테스트 시작 전 서버 실행
module.exports = async () => {
    console.log("START SETUP")
    jest.setTimeout(30000)

    // 포트 3000이 이미 사용 중인지 확인
    await checkPortInUse(3000)

    // 서버 실행
    startServer()
}
