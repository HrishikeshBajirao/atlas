const API_KEY = import.meta.env.VITE_REST_COUNTRIES_API_KEY;

export default async function getCountry(name){
    const response = await fetch(
        `https://api.restcountries.com/countries/v5/names.common/${name}`,
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        }
    );

    const data = await response.json();

    return data.data.objects[0];
}