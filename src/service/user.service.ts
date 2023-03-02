import { User } from "~/model/user.model"
import prisma from "~/prisma/prisma-client"
import { genBcryptHash } from "~/config/utils"

export default {
    createUser: async ({ e_id, e_systemid, e_pw, e_department, e_email, e_name }: User) => {
        const hashedPassword = genBcryptHash(e_pw)
        const user = (await prisma.pms_users.create({
            data: {
                e_id,
                e_systemid,
                e_pw: hashedPassword,
                e_email,
                e_name,
                e_department,
            },
        })) as User

        return user
    },
    updateUser: async () => {},
    findUserById: async (id: string) => {
        const user = (await prisma.pms_users.findUnique({
            where: {
                e_id: id,
            },
        })) as User

        return user
    },
    findUserByQuery: async () => {},
}
