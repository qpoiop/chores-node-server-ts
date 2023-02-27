import prisma from "~/prisma/prisma-client"
import { User } from "./model"

export default {
    createUser: async (user: User) => {},
    updateUser: async () => {},
    findUserById: async (id: string) => {
        const user = (await prisma.pms_users.findUnique({
            where: {
                e_id: id,
            },
            // select: {
            //     id: true,
            //     email: true,
            //     password: true,
            //     name: true,
            //     createdAt: true,
            //     updatedAt: true,
            // },
        })) as User

        return user
    },
    findUserByQuery: async () => {},
}
