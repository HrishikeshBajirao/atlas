import { csv } from "d3"

export async function getPopulationByCountry(code){
    const url = new URL(`https://ourworldindata.org/grapher/population.csv?v=1&csvType=filtered&useColumnShortNames=true&time=-10000..2020&country=~${code.toUpperCase()}`)

    try{
        const data = await csv(url)
        return data
    } catch(err){
        throw new Error(`Unable to fetch population data from OWID: ${err.message}`)
    }

}