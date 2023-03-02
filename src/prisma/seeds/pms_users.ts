import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

const main = async () => {
    const seedUser = await prisma.pms_users.upsert({
        where: { e_id: "qpoiop" },
        update: {},
        create: {
            e_id: "qpoiop",
            e_systemid: "UniqueSystemId",
            // crypto.createHash("sha256").update("1234").digest("hex"),
            e_pw: await bcrypt.hash("1234", 10),
            e_name: "안주찬",
            e_email: "qpoiop3@embracelabs.com",
        },
    })
    console.log(seedUser)
}

const wrapper = (func: () => Promise<void>): (() => void) => {
    return () => {
        func().catch(e => console.log(e))
    }
}

const seeder = (): void => {
    main()
        .catch(e => {
            console.error(e)
            process.exit(1)
        })
        .finally(
            wrapper(async () => {
                await prisma.$disconnect()
            })
        )
}

export default seeder
