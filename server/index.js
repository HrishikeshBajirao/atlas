import express from "express"
import cors from "cors"
import { getCountriesListHandler, getCountryDataHandler } from './controllers/countriesController.js'
import { getGdpHistoricalHandler, getPopulationHistoricalHandler } from './controllers/dataController.js'
import { createUserHandler, loginUserHandler, refreshUserHandler, revokeUserHandler, updateUserHandler } from './controllers/usersController.js'
import { resetUserHandler } from './controllers/adminController.js'
import { getFavoritesHandler, addFavoriteCountryHandler, removeFavoriteCountryHandler} from './controllers/favoritesController.js'
import errorHandler from './middleware/errorHandler.js'

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://hrishikeshbajirao.github.io"
    ]
}));

app.get('/api/health', (req, res) => { res.json("working!") })

app.delete('/admin/reset', resetUserHandler)

app.get('/api/countries', getCountriesListHandler);
app.get('/api/countries/:code', getCountryDataHandler);
app.get('/api/data/gdp-historical', getGdpHistoricalHandler);
app.get('/api/data/gdp-historical/:code', getGdpHistoricalHandler);
app.get('/api/data/population-historical/:code', getPopulationHistoricalHandler)

app.post('/auth/signup', createUserHandler)
app.post('/auth/login', loginUserHandler)
app.post('/auth/refresh', refreshUserHandler)
app.post('/auth/revoke', revokeUserHandler)
// app.put('/auth/users', updateUserHandler)

app.get('/favorites', getFavoritesHandler)
app.post('/favorites/:countryId', addFavoriteCountryHandler)
app.delete('/favorites/:countryId', removeFavoriteCountryHandler)

app.use(errorHandler)

app.listen(PORT, () => console.log("server listening on ", PORT))