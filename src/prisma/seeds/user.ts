import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
    const seedUser = await prisma.pms_users.upsert({
        where: { e_id: "qpoiop" },
        update: {},
        create: {},
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
