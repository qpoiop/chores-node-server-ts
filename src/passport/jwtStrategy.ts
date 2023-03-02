import { PassportStatic } from "passport"
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt"
import { ResponseStatus } from "~/config/httpDefinitions"
import { SECRET_KEY } from "~/env"
import { User } from "~/model/user.model"
import prisma from "~/prisma/prisma-client"
import userService from "~/service/user.service"

export default (passport: PassportStatic): void => {
    passport.serializeUser((user, done) => {
        done(null, (user as User).e_id)
    })

    passport.deserializeUser(async (id: string, done) => {
        const user = await userService.findUserById(id)
        console.log("deserializeUser", user)
        if (user) return done(null, user)
        else done(null)
    })

    passport.use(
        "jwt",
        new Strategy(
            {
                // jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: SECRET_KEY,
            },
            async (payload: any | undefined, done: VerifiedCallback) => {
                try {
                    // 유효하지 않은 토큰인 케이스
                    if (Date.now() > payload.expires) return done(null, false, ResponseStatus.UNAUTHORIZED)

                    const { e_id } = payload as User
                    const user = await userService.findUserById(e_id)

                    // 존재하지 않는 유저 정보를 가지고 있는 케이스
                    if (!user) return done(null, false, ResponseStatus.NOTFOUND)

                    // 인증 성공
                    return done(null, user)
                } catch (error) {
                    // 기타 인증 에러 케이스
                    console.error(error)
                    done(error)
                }
            }
        )
    )
}
