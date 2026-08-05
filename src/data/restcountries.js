const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY;

export async function getCountry(name){
    const response = await fetch(
        `https://api.restcountries.com/countries/v5/names.common/${name.toLowerCase().trim()}`,
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        }
    );
    const data = await response.json();
    return data.data.objects[0];
}

export async function getCountriesList(){
    const response = await fetch(
        "https://api.restcountries.com//countries/v5?response_fields=names.common",
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        }
    );
    const data = await response.json();
    console.log(data.data.objects)
    return data.data.objects;
}

