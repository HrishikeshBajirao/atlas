import { getCountry } from "../data/restcountries.js"

export async function handleCountrySubmit (index, country, setCountries, setRecentSearches){
    console.log(country)
    setCountries((currCountries) => {
        const newCountries = [...currCountries]
        newCountries[index] = {...newCountries[index], searched:true, loading: true, countryInfo:null}
        return newCountries
    })

    try {
        const foundCountry = await getCountry(country); 
        setCountries((currCountries) => {
        const newCountries = [...currCountries]
        newCountries[index] = {...newCountries[index], countryInfo: foundCountry}
        return newCountries
        })
        console.log(foundCountry);
        if(foundCountry){
        setRecentSearches((currentRecentSearches) => [
            { name: foundCountry.names.common, code: foundCountry.codes.alpha_2 },
            ...currentRecentSearches
            .filter((item) => item.name !== foundCountry.names.common)
            .slice(0, 4),
        ]);
        }
    } catch (err) {
        console.error(err);
    } finally {
        setCountries((currCountries) => {
        const newCountries = [...currCountries]
        newCountries[index] = {...newCountries[index], loading: false}
        return newCountries
        })
    }    
    }