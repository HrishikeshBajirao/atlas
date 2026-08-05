import { Button1 } from "./Button1"
import { handleCountrySubmit } from '../utils/handleCountrySubmit.js'

export function SearchForm({index, setCountries, countryInput, setRecentSearches}){
  return (
      <form id="country-form" className="w-full flex items-center justify-around mt-20" 
        onSubmit={(e) => handleCountrySubmit(e, index, countryInput, setCountries, setRecentSearches)}>
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