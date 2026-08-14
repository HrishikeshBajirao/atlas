import { getCountry } from "../data/restcountries.js"

export async function handleCountrySubmit (index, countryCode, setCountries, setRecentSearches){

    //add requestID to prevent stale data to overwrite the state
    const newRequestId = crypto.randomUUID();
    
    //set the keys newCountries to default values
    setCountries((currCountries) => {
        const newCountries = [...currCountries]
        newCountries[index] = {
            ...newCountries[index], 
            searched:true, 
            loading: true, 
            countryInfo:null,
            requestId: newRequestId
        }
        return newCountries
    })

    try {
        const foundCountry = await getCountry(countryCode); 

        setCountries((currCountries) => {

            //check if newer response is started and ignore and just set the already fetched data
            if(currCountries[index].requestId !== newRequestId){
                return currCountries
            }

            const newCountries = [...currCountries]
            newCountries[index] = {...newCountries[index], countryInfo: foundCountry}
            return newCountries
        })

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

            //check if newer response is started and ignore and just set the already fetched data
            if(currCountries[index].requestId !== newRequestId){
                return currCountries
            }

            const newCountries = [...currCountries]
            newCountries[index] = {...newCountries[index], loading: false}
            return newCountries
        })
    }    
}