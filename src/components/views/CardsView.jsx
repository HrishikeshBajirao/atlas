import { Loading } from "../Loading"
import { CountryCardOutput } from "../CountryCardOutput"

export function CardsView({countries, setCountries, setRecentSearches, setNumberOfSlots, countriesList}){
  return (
    <div className="flex flex-wrap overflow-auto-y">
      {countries.filter((country) => country.countryInfo !== null).map((_, index) => (
        <CountryCard
            key = {index}
            index = {index}
            countries = {countries}
            setCountries = {setCountries}
            setRecentSearches = {setRecentSearches}
            setNumberOfSlots = {setNumberOfSlots}
            countriesList = {countriesList}
        />
        ))}
    </div>
  )
}

export function CountryCard({ index, countries, setCountries, setNumberOfSlots}) {
  const { countryInput, countryInfo, loading } = countries[index] || {}

  return (
    <div
      className="my-1 mx-auto w-[33%] h-[380px] max-w-[800px] px-3 rounded-sm"
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
        </>
      ) : (
        <></>
      )}
    </div>
  )
}