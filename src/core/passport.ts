import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { SECRET_KEY } from "~/env"
import { User } from "~/model/user.model"
import userService from "~/service/user.service"

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: SECRET_KEY,
        },
        async (payload, done) => {
            try {
                // TODO: remove it
                if (Date.now() > payload.expires) return done("Token expired")

                // TODO: check token is valid
                const { e_id } = payload
                const user = await userService.findUserById(e_id)
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, (user as User).e_id)
})

passport.deserializeUser(async (id: string, done) => {
    const user = await userService.findUserById(id)
    console.log("deserializeUser", user)
    if (user) return done(null, user)
})

export default passport
