import { getHistoricalGdp } from '../services/getHistoricalGdp.js'

export async function getGdpHistoricalHandler(req, res, next){

    try{
        let gdpData = await getHistoricalGdp();

        const countryCode = req.params.code
        if(countryCode){
            gdpData = gdpData.filter((item) => item.Code.toLowerCase() === countryCode.toLowerCase())
        }

        //throw not found error for invalid country code
        if(gdpData.length === 0){
            const err = new Error(`Invalid Country Code: There is no country with code: ${countryCode}`);
            err.statusCode = 404;
            err.code = "COUNTRY_NOT_FOUND";;
            throw err;
        }

        res.status(200).json({
            success: true,
            data: gdpData
        });
    } catch(err) {
        next(err);
    }

}