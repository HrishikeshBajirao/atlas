import { getCountry } from "../data/restcountries.js"

export async function handleCountrySubmit (index, countryCode, setCountries, setRecentSearches){
    // console.log(countryCode)
    setCountries((currCountries) => {
        const newCountries = [...currCountries]
        newCountries[index] = {...newCountries[index], searched:true, loading: true, countryInfo:null}
        return newCountries
    })

    try {
        const foundCountry = await getCountry(countryCode); 
        setCountries((currCountries) => {
            const newCountries = [...currCountries]
            newCountries[index] = {...newCountries[index], countryInfo: foundCountry}
            return newCountries
        })
        // console.log(foundCountry);
        if(foundCountry){
        setRecentSearches((currentRecentSearches) => [
            { name: foundCountry.name, code: foundCountry.alpha3Code },
            ...currentRecentSearches
            .filter((item) => item.name !== foundCountry.name)
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