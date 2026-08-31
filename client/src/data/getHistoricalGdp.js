// import { csv } from "d3"

// export async function getHistoricalGdp(){

//     try{
//         const data = await csv(
//             "https://ourworldindata.org/grapher/gdp-worldbank.csv"
//         );
//         return data;
//     } catch(err){
//         throw new Error("message", err)
//     }

// }

export async function getHistoricalGdp(){

    const url = new URL(`${import.meta.env.VITE_API_URL}/api/data/gdp-historical`)
    
    const response = await fetch(url);

    if(!response.ok){
        throw new Error("failed to fetch historical GDP data")
    }

    const data = await response.json();
    return data.data;

}