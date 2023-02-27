import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { SECRET_KEY } from "~/env"
import { Authentication } from "~/functions/auth"

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: SECRET_KEY,
        },
        async (jwtPayload, done) => {
            try {
                // TODO: remove it
                if (Date.now() > jwtPayload.expires) return done("Token expired")

                const find = { username: jwtPayload.username }
                // const user = await Authentication.UserModel.findOne(find).exec()
                // return done(null, user)

                // const refreshTokens = await Authentication.model.RefreshToken.find({ user: user.id });
            } catch (error) {
                return done(error)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

export default passport
