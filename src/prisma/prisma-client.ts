declare global {
    var prisma: PrismaClient | undefined
}

import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {
    // 개발 환경에서 prisma client 중복 선언 방지
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ["query"],
        })
    }
    prisma = global.prisma
}

export default prisma
