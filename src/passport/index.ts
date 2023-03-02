import { PassportStatic } from "passport"
import local from "./localStrategy"
import jwt from "./jwtStrategy"
import { User } from "~/model/user.model"
import userService from "~/service/user.service"

const passportConfig: (passport: PassportStatic) => void = (passport: PassportStatic) => {
    local(passport)
    jwt(passport)
}

export default passportConfig
