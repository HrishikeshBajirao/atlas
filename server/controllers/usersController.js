import { createUser, getUserByEmail } from '../db/queries/users.js'
import { hashPassword, checkHashPassword, makeJWT, makeRefreshToken, getBearerToken } from '../db/auth.js'
import { UnauthorizedError, BadRequestError } from '../middleware/errorHandler.js'
import { cfg } from '../config.js'
import { addDBRefreshToken, getUserFromRefreshToken, revokeUserRefreshToken } from '../db/queries/refreshTokens.js'

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

    const refreshToken = makeRefreshToken()
    await addDBRefreshToken({
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    })

    const {hashedPassword, ...userWithoutHash} = user
    const userWithToken = {...userWithoutHash, token, refreshToken}
    res.status(200).json(userWithToken)
    
}

export async function refreshUserHandler(req, res){
    const refreshToken = getBearerToken(req)
    const tokenObj = await getUserFromRefreshToken(refreshToken)

    if(!tokenObj){
        throw new UnauthorizedError("Invalid Token")
    }

    if(Date.now() > new Date(tokenObj.expiresAt).getTime() 
    || tokenObj.revokedAt && Date.now() > new Date(tokenObj.revokedAt).getTime()){
        throw new UnauthorizedError();
    }

    const token = makeJWT(tokenObj.userId, 60 * 60, cfg.jwtSecret)
    res.status(200).json({token})
}

export async function revokeUserHandler(req, res){
    const refreshToken = getBearerToken(req)
    await revokeUserRefreshToken(refreshToken)
    res.status(204).send()
}

export async function updateUserHandler(req, res){
    
}