import Button1 from "./Button1"
import getCountry from "../api/restcountries"

export default function SearchFormContainer({countryInput, searched, setSearched, 
      setLoading, setCountryInfo, setCountryInput, setRecentSearches}){

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(true);
    setLoading(true);
    setCountryInfo(null);

    try {
      const foundCountry = await getCountry(countryInput.toLowerCase().trim());
      setCountryInfo(foundCountry);
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
      setLoading(false);
    }
  }

  return (
      <div id="input-container" className={`${searched ? "hidden" : ""} my-5 mx-auto w-md h-[30vh] flex items-center justify-center rounded-sm p-2.5`}>
      <form id="country-form" className="w-full flex items-center justify-around" 
        onSubmit={handleSubmit}>
          <label htmlFor="country-input" className="sr-only">Country name</label>
          <input 
            id="country-input"
            type="text" 
            value={countryInput} 
            onChange={(e) => setCountryInput(e.target.value)} 
            className="w-2/3 bg-slate-700  rounded-xl shadow-2xl py-3 px-2.5 
              text-white text-xl text-center placeholder:text-slate-400"
            placeholder="Search country"
            required />
        <Button1 
          buttonText="Search"
        />
      </form>
    </div>
  )
}