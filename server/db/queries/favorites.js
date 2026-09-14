import { db } from '../index.js'
import { favorites, users, countries } from '../schema.js'
import { eq, and } from 'drizzle-orm'

export async function getFavorites(userId){
    const result = await db
        .select({
            userId: users.id,
            country: countries.id,
        })
        .from(users)
        .leftJoin(favorites, eq(users.id, favorites.userId))
        .leftJoin(countries, eq(countries.id, favorites.countryId))
        .where(eq(favorites.userId, userId))
    return result
}

export async function addFavorite(userId, countryId){
    const [result] = await db
        .insert(favorites)
        .values({
            userId, countryId
        })
        .returning()
    return result
}

export async function removeFavorite(userId, countryId){
    await db
        .delete(favorites)
        .where(and(
            eq(favorites.countryId, countryId),
            eq(favorites.userId, userId))
        )
}