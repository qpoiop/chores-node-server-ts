import { User } from "~/model/user.model"
import prisma from "~/prisma/prisma-client"
import { compare } from "bcrypt"
import HttpException from "~/model/exception.model"
import { HttpCode } from "~/config/httpDefinitions"

export default {
    // TODO : change to passport
    signin: async (payload: { e_id: string; e_pw: string }) => {
        console.log("arguements", payload)
        const user = (await prisma.pms_users.findUnique({
            where: {
                e_id: payload.e_id.trim(),
            },
        })) as User

        if (user) {
            const isMatch = await compare(payload.e_pw, user.e_pw)

            if (isMatch) {
                return user
            } else {
                throw new HttpException(HttpCode.UNAUTHORIZED, "INVALID PASSWORD")
            }
        }

        throw new HttpException(HttpCode.NOTFOUND, "USER NOT FOUND")
    },
}
