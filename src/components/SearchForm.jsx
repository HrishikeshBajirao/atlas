import Button1 from "./Button1"
import getCountry from "../api/restcountries"

export default function SearchForm({index, setCountries, countryInput, setRecentSearches}){

  const handleSubmit = async (e) => {
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

  return (
      <form id="country-form" className="w-full flex items-center justify-around mt-20" 
        onSubmit={handleSubmit}>
          <label htmlFor="country-input" className="sr-only">Country name</label>
          <input 
            id="country-input"
            type="text" 
            value={countryInput} 
            onChange={(e) => setCountries((currCountries) => {
              const newCountries = [...currCountries]
              newCountries[index] = {...newCountries[index], countryInput: e.target.value}
              return newCountries
            })} 
            className="w-2/3 bg-slate-700  rounded-xl shadow-2xl py-3 px-2.5 
              text-white text-xl text-center placeholder:text-slate-400"
            placeholder="Search country"
            required />
        <Button1 
          buttonText="Search"
        />
      </form>
  )
}