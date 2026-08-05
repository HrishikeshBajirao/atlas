import { getCountry } from "../api/restcountries"

export async function handleCountrySubmit (e, index, countryInput, setCountries, setRecentSearches){
    e.preventDefault();

    setCountries((currCountries) => {
        const newCountries = [...currCountries]
        newCountries[index] = {...newCountries[index], searched:true, loading: true, countryInfo:null}
        return newCountries
    })

    try {
        const foundCountry = await getCountry(countryInput); 
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