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
    let countries = []
    for(let i=0;i<3;i++){
        let response = await fetch(
            `https://api.restcountries.com/countries/v5?limit=100&offset=${100 * i}&response_fields=names.common`,
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        );
        let data = await response.json();
        countries = [...countries, ...data.data.objects.map((country) => {
            return {
                value: country.names.common.toLowerCase(), label: country.names.common
            }
        })]
    }
    console.log(countries)
    return countries;
}

