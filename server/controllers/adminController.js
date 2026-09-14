import { resetUsers } from '../db/queries/users.js'

export async function resetUserHandler(req, res){
    await resetUsers()
    res.status(204).send()
}