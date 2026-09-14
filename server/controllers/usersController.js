import { createUser, getUserByEmail } from '../db/queries/users.js'
import { hashPassword, checkHashPassword, makeJWT } from '../db/auth.js'
import { UnauthorizedError, BadRequestError } from '../middleware/errorHandler.js'
import { cfg } from '../config.js'

export async function createUserHandler(req, res){
    const userEmail = req.body.email
    const password = req.body.password

    if(!userEmail || !password){
        throw new Error("email and password are required")
    }

    const result = await createUser({
        email: userEmail,
        hashedPassword: await hashPassword(password),
    })

    res.status(201).json(result)
}

export async function loginUserHandler(req, res){
    const userEmail = req.body.email
    const password = req.body.password

    if(!userEmail || !password){
        throw new BadRequestError("email and password are required")
    }

//AUTHENTICATION
    const user = await getUserByEmail(userEmail)
    if(!user){
        throw new UnauthorizedError("incorrect email or password")
    }

    const verified = await checkHashPassword(user.hashedPassword, password)
    if(!verified){
        throw new UnauthorizedError("incorrect email or password")
    }

//SESSION CREATION
    const token = makeJWT(user.id, 60 * 60, cfg.jwtSecret)

    const {hashedPassword, ...userWithoutHash} = user
    const userWithToken = {...userWithoutHash, token}
    res.status(200).json(userWithToken)
    
}