import { SECRET_KEY } from "~/env"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

/** Generate token */
export const genJwtToken = (payload: object, secret = SECRET_KEY): string => {
    return jwt.sign(payload, secret, { expiresIn: "7d" })
}

export const genBcryptHash = (plainText: string, saltRounds: number = 10): string => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(plainText, salt)
    return hash
}
