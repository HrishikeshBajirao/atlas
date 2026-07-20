import { useState } from "react"
import getCountry from "./api/restcountries"

function App() {
  const [countryInput, setCountryInput] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <>
      <h1 className="text-center my-2.5 text-4xl text-blue">Atlas</h1>
      <div id="input-container" className=" my-5 mx-auto w-xs border-gray border-1 rounded-sm p-2.5">
        <form id="country-form" className="m-2.5" onSubmit={(e) => handleSubmit(e)}>
          <label className="my-2.5 mx-auto">
            Country:
            <input type="text" value={countryInput} onChange={(e) => setCountryInput(e.target.value)} className="mx-2 w-1/2 border-gray border-1 rounded-xs" required />
          </label>
          <button id="submit-btn" className="block my-2.5 mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition duration-300 ease-in-out transform hover:bg-blue-700 hover:text-blue-100 hover:cursor-pointer">
            Submit
          </button>
        </form>
      </div>
      <div id="output-container" className={` ${searched ? "block" : "hidden"} my-5 mx-auto w-md border-gray border-1 rounded-sm p-2.5`}>
        {loading ? (
          <p className="text-xl text-red-500 text-center">Data Loading...</p>
        ) : 
        countryInfo ? (
          <>
            <p className="text-center text-lg">Country: {countryInfo.names.common}</p>
            <p className="text-center text-lg">Population: {countryInfo.population.toLocaleString()}</p>
            <p className="text-center text-lg">Capital: {countryInfo.capitals[0].name}</p>
            <p className="text-center text-lg">Currency: {countryInfo.currencies[0].name}</p>
          </>
        ) : (
          <p className="text-center text-lg text-red-300">There is no data on this country</p>
        )}
      </div>
    </>
  )
}

export default App;