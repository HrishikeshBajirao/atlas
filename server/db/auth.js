import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../middleware/errorHandler.js'

export async function hashPassword(password){
    const hash = await argon2.hash(password)
    return hash
}

export async function checkHashPassword(hash, password){
    const result = await argon2.verify(hash, password)
    return result
}

export function makeJWT(userId, expiresIn, secret){
    const iat = Math.floor(Date.now() / 1000)
    const payload = {
        iss: "atlas",
        sub: userId,
        iat,
        exp: iat + expiresIn
    }

    const token = jwt.sign(payload, secret)
    return token
}

export function validateJWT(token, secret){
    try{
        const decoded = jwt.verify(token, secret)

        if(typeof decoded === "string" || !decoded.sub){
            throw new UnauthorizedError("Invalid JWT")
        }

        return decoded.sub
    } catch {
        throw new UnauthorizedError("Invalid or Expired JWT")
    }
}

export function getBearerToken(req){
    const authHeader = req.headers["authorization"]

    let token;
    if(authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1]
    }

    return token
}