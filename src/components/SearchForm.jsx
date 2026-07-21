import getCountry from "../api/restcountries"

export default function SearchFormContainer({countryInput, searched, setSearched, setLoading, setCountryInfo, setCountryInput}){

    const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(true);
    setLoading(true);
    setCountryInfo(null);

    try {
      const foundCountry = await getCountry(countryInput.toLowerCase().trim());
      setCountryInfo(foundCountry);
      console.log(foundCountry);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

    return (
        <div id="input-container" className={`${searched ? "hidden" : ""} my-5 mx-auto w-md h-[40vh] flex items-center justify-center rounded-sm p-2.5`}>
        <form id="country-form" className="w-full flex items-center justify-around" onSubmit={handleSubmit}>
            <input type="text" 
              value={countryInput} 
              onChange={(e) => setCountryInput(e.target.value)} 
              className="w-2/3 bg-slate-700  rounded-xl shadow-2xl py-3 px-2.5 
                text-white text-xl text-center placeholder:text-slate-400"
              placeholder="Search country"
              required />
          <button id="submit-btn" 
            className="block bg-blue-600 text-white px-4 py-3 rounded-lg font-medium 
              transition duration-300 ease-in-out transform hover:bg-blue-500 hover:cursor-pointer
              hover:scale-105 active:scale-95">
            Search
          </button>
        </form>
      </div>
    )
}