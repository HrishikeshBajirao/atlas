import express from "express"
import cors from "cors"
import { getCountriesListHandler, getCountryDataHandler } from './controllers/countriesController.js'
import { getGdpHistoricalHandler, getPopulationHistoricalHandler } from './controllers/dataController.js'
import errorHandler from './middleware/errorHandler.js'

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://hrishikeshbajirao.github.io"
    ]
}));

app.get('/api/health', (req, res) => {
    res.json("working!")
})

app.get('/api/countries', getCountriesListHandler);
app.get('/api/countries/:code', getCountryDataHandler);
app.get('/api/data/gdp-historical', getGdpHistoricalHandler);
app.get('/api/data/gdp-historical/:code', getGdpHistoricalHandler);
app.get('/api/data/population-historical/:code', getPopulationHistoricalHandler)

app.use(errorHandler)

app.listen(PORT, () => console.log("server listening on ", PORT))