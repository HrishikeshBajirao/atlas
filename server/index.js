import express from "express"
import cors from "cors"
import { getCountriesListHandler, getCountryDataHandler } from './controllers/countriesController.js'
import { getGdpHistoricalHandler, getPopulationHistoricalHandler } from './controllers/dataController.js'
import { createUserHandler, loginUserHandler, refreshUserHandler, revokeUserHandler, updateUserHandler } from './controllers/usersController.js'
import { resetUserHandler } from './controllers/adminController.js'
import { getFavoritesHandler, addFavoriteCountryHandler, removeFavoriteCountryHandler} from './controllers/favoritesController.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { db } from './db/index.js'
import { sql } from 'drizzle-orm';

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json())
app.use(cors());

app.get('/healthz', async (req, res) => {
  res.status(200).send()

  // try {
  //   await db.execute(sql`SELECT 1`);

  //   res.status(200).json({
  //     status: "ok",
  //     database: "connected",
  //     uptime: process.uptime()
  //   });
  // } catch {
  //   res.status(503).json({
  //     status: "error",
  //     database: "unavailable",
  //   });
  // }
})

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

//error middleware
app.use(notFoundHandler);
app.use(errorHandler)

app.listen(PORT, () => console.log("server listening on ", PORT))