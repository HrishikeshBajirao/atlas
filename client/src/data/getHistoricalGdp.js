export async function getHistoricalGdp(){

    const url = new URL(`${import.meta.env.VITE_API_URL}/api/data/gdp-historical`)
    
    const response = await fetch(url);

    if(!response.ok){
        throw new Error("failed to fetch historical GDP data")
    }

    const data = await response.json();
    return data.data;

}

export async function getHistoricalGdpByCountry(code){

    const url = new URL(`${import.meta.env.VITE_API_URL}/api/data/gdp-historical`)
    
    const response = await fetch(url);

    if(!response.ok){
        throw new Error("failed to fetch historical GDP data")
    }

    const data = await response.json();
    return data.data.filter((item) => item.Code.toLowerCase() === code.toLowerCase());

}

