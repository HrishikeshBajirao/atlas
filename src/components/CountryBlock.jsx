import { SearchForm } from "./SearchForm"
import { Loading } from "./Loading"
import { CountryCard } from "./CountryCardOutput"
import { Button1 } from "./Button1"

export function CountryBlock({ index, countries, setCountries, setRecentSearches, setNumberOfSlots}) {
  const { countryInput, countryInfo, searched, loading } = countries[index] || {}

  const handleMoreBtn = () => {
    setCountries(currCountries => {
      const newCountries = [...currCountries]
      newCountries[index] = {
        ...newCountries[index],
        searched: false,
        countryInput: "",
        countryInfo: null
      }
      return newCountries
    })
  }

  return (
    <div>
      <div
        id="main-page-container"
        className={`${searched ? "hidden" : ""} my-5 mx-auto w-md rounded-sm p-2.5`}
      >
        <SearchForm
          index={index}
          setCountries={setCountries}
          countryInput={countryInput}
          setRecentSearches={setRecentSearches}
        />
      </div>

      <div
        id="output-container"
        className={`${searched ? "block" : "hidden"} my-5 mx-auto w-full max-w-[800px] px-3 rounded-sm`}
      >
        {loading ? (
          <Loading countryInput={countryInput} />
        ) : countryInfo ? (
          <>
            <CountryCard 
              countryInfo={countryInfo} 
              index={index}
              setCountries = {setCountries}
              setNumberOfSlots = {setNumberOfSlots}
            />
            <Button1 buttonText="Search More" handleClick={handleMoreBtn} />
          </>
        ) : (
          <>
            <p className="my-5 text-center text-2xl text-red-300">
              There is no country named {countryInput}
            </p>
            <p className="text-center text-2xl text-red-300">
              Search for another country
            </p>
            <Button1 buttonText="Search here" handleClick={handleMoreBtn} />
          </>
        )}
      </div>
    </div>
  )
}