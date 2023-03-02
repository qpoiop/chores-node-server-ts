import { PassportStatic } from "passport"
import * as passportLocal from "passport-local"
import { isEmpty, isNull } from "lodash"
import { compare } from "bcrypt"
import { User } from "~/model/user.model"
import { ResponseFormat, ResponseStatus } from "~/config/httpDefinitions"
import userService from "~/service/user.service"

const LocalStrategy = passportLocal.Strategy

declare type LocalStrategyCBFunc = (error: unknown, user?: User, options?: ResponseFormat) => void

export default (passport: PassportStatic): void => {
    const local = new LocalStrategy(
        {
            usernameField: "e_id",
            passwordField: "e_pw",
        },

        async (e_id, e_pw, done: LocalStrategyCBFunc): Promise<void> => {
            try {
                const user = await userService.findUserById(e_id)

                if (isEmpty(user) || isNull(user)) return done(null, undefined, ResponseStatus.INVALIDPARAMS)

                const isMatch: Boolean = await compare(e_pw, user.e_pw)

                if (!isMatch) {
                    return done(null, undefined, ResponseStatus.UNAUTHORIZED)
                }

                done(null, user)
            } catch (error) {
                console.error(error)
                done(error)
            }
        }
    )
    passport.use(local)
}
