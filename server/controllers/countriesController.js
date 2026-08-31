import { getCountriesList, getCountry } from '../services/getCountriesData.js'

//get countries list for the react-select dropdown in the forntend
export async function getCountriesListHandler(req, res, next){

    try{
        const countries = await getCountriesList();
        res.status(200).json({
            success: true,
            data: countries
        });
    } catch (err) {
        next(err);
    }

}

//get country data by country alpha3Code
export async function getCountryDataHandler(req, res, next){

    try{
        const code = req.params.code;
        const countryData = await getCountry(code);
        res.status(200).json({
            success: true,
            data: countryData
        });
    } catch(err) {
        next(err);
    }

}