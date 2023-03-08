import { config } from "dotenv"
import { join } from "path"

// .env 파일 로드 (중복 키가 존재할 경우 나중에 로드한 환경 변수 파일이 적용 됨)
const rootEnvPath = join(__dirname, "..", ".env") // 루트 디렉터리의 공통 환경 변수 파일 경로
config({ path: rootEnvPath }) // 루트 디렉터리에서 사용되는 환경 변수 로드

// const aEnvPath = join(__dirname, ".env") // 현재 패키지 환경 변수 파일 경로
// config({ path: aEnvPath }) // 환경 변수 로드

export const NODE_ENV = process.env.NODE_ENV || "development"

export const HOST = process.env.HOST || "0.0.0.0"
export const PORT = process.env.PORT || 3000

export const SECRET_KEY = process.env.SECRET_KEY || "secretkey"
export const RATE_LIMIT = process.env.RATE_LIMIT || 0
