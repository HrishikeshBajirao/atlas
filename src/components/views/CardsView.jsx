import { SearchForm } from "../SearchForm"
import { Loading } from "../Loading"
import { CountryCardOutput } from "../CountryCardOutput"
import { Button1 } from "../Button1"

export function CardsView({ index, countries, setCountries, setRecentSearches, setNumberOfSlots, countriesList}) {
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
    <div className="flex justify-center gap-5 flex-wrap">
      <div
        id="main-page-container"
        className={`${searched ? "hidden" : ""} my-5 mx-auto w-md rounded-sm p-2.5`}
      >
        <SearchForm
          index={index}
          setCountries={setCountries}
          countryInput={countryInput}
          setRecentSearches={setRecentSearches}
          countriesList = {countriesList}
          setNumberOfSlots={setNumberOfSlots}
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
            <CountryCardOutput 
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
          </>
        )}
      </div>
    </div>
  )
}