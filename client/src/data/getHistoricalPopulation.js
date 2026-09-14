export async function getHistoricalPopulation(code){

    const url = new URL(`${import.meta.env.VITE_API_URL}/api/data/population-historical/${code}`)
    
    const response = await fetch(url);

    if(!response.ok){
        throw new Error("failed to fetch historical Population data")
    }

    const data = await response.json();
    return data.data;

}