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

// export async function getCountry(code){
//     try{
//         const response = await fetch(`https://countries.dev/alpha/${code}`);
//         const data = await response.json();
//         // console.log(data)
//         const countryInfo = {
//             alpha3Code: data.alpha3Code,
//             numericCode: data.numericCode,
//             name: data.name,
//             flag: data.flags,
//             population: data.population,
//             capital: data.capital,
//             languages: data.languages.map((language) => language.name),
//             area: data.area,
//             region: data.region,
//             currency: data.currencies.map((currency) => `${currency.symbol} - ${currency.name}`)
//         }
//         // console.log(country)
//         return countryInfo
//     } catch (err) {
//         console.log(err)
//     }
// }



// export async function getCountriesList(){
//     try{
//         const response = await fetch("https://countries.dev/countries");

//         if (!response.ok) {
//             throw new Error(`Failed to fetch countries: ${response.status}`);
//         }

//         const data = await response.json();
//         // console.log(data)
//         const countries = data.map((country) => {
//             return {
//                 value: country.name, 
//                 label: country.name, 
//                 alpha3: country.alpha3Code
//             }
//         })
//         // console.log(countries)
//         return countries;
//     } catch (err) {
//         console.log(err)
//         throw err
//     }
// }

