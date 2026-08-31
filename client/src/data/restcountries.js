export async function getCountry(code){
    const url = new URL(`${import.meta.env.VITE_API_URL}/api/countries/${code}`)
    
    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`failed to fetch country: ${code}`)
    }

    const data = await response.json();
    return data.data;   

}

export async function getCountriesList(){
    const url = new URL(`${import.meta.env.VITE_API_URL}/api/countries`)
    
    const response = await fetch(url);

    if(!response.ok){
        throw new Error("failed to fetch countries list")
    }

    const data = await response.json();
    return data.data;  
}