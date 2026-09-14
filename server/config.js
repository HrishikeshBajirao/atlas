if (!process.env.RENDER) {
    process.loadEnvFile()
}

const dbUrl = process.env.DB_URL
const jwtSecret =process.env.JWT_SECRET
if(!dbUrl){
    throw new Error("database connections url is missing from environment variables");
}
if(!jwtSecret){
    throw new Error("JWT secret is missing from the environment variables")
}

export const cfg = {
    dbUrl, jwtSecret
}