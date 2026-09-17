import { db } from '../index.js'
import { refresh_tokens } from '../schema.js'
import { eq } from 'drizzle-orm'

export async function addDBRefreshToken(tokenObj){
    await db
        .insert(refresh_tokens)
        .values(tokenObj)
        .onConflictDoNothing()
}

export async function getUserFromRefreshToken(token){
    const [result] = await db
        .select()
        .from(refresh_tokens)
        .where(eq(refresh_tokens.token, token));
    return result;
}

export async function revokeUserRefreshToken(token){
    await db
        .update(refresh_tokens)
        .set({revokedAt: new Date(Date.now())})
        .where(eq(refresh_tokens.token, token))
}