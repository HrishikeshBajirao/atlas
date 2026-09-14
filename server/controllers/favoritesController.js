import { getFavorites, addFavorite, removeFavorite } from '../db/queries/favorites.js'
import {cfg} from '../config.js'
import { UnauthorizedError } from '../middleware/errorHandler.js'
import { getBearerToken, validateJWT } from '../db/auth.js'

export async function getFavoritesHandler(req, res){
    const token = getBearerToken(req)
    if(!token){
        throw new UnauthorizedError("Invalid Token")
    }
    const userId = validateJWT(token, cfg.jwtSecret)

    const favs = await getFavorites(userId)
    res.status(200).json(favs)
}

export async function addFavoriteCountryHandler(req, res){
    const token = getBearerToken(req)
    if(!token){
        throw new UnauthorizedError("Invalid Token")
    }
    const userId = validateJWT(token, cfg.jwtSecret)

    const countryId = req.params.countryId

    const result = await addFavorite(userId, countryId)
    res.status(201).json(result)
}

export async function removeFavoriteCountryHandler(req, res){
    const token = getBearerToken(req)
    if(!token){
        throw new UnauthorizedError("Invalid Token")
    }
    const userId = validateJWT(token, cfg.jwtSecret)

    const countryId = req.params.countryId

    await removeFavorite(userId, countryId)
    res.status(204).send()
}
