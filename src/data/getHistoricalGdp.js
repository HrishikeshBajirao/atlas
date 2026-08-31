import { csv } from "d3"

export async function getHistoricalGdp(){

    try{
        const data = await csv(
            "https://ourworldindata.org/grapher/gdp-worldbank.csv"
        );
        return data;
    } catch(err){
        throw new Error("message", err)
    }

}