import { Prisma, PrismaClient } from "@prisma/client"

type PrismaOptionType = PrismaClient<Prisma.PrismaClientOptions, "query">
declare global {
    var prisma: PrismaOptionType | undefined
}

let prisma: PrismaOptionType

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient({
        log: [
            {
                emit: "event",
                level: "query",
            },
        ],
    })
} else {
    // 개발 환경에서 prisma client 중복 선언 방지
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: [
                {
                    emit: "stdout",
                    level: "query",
                },
            ],
        })
    }
    prisma = global.prisma
}

export default prisma
