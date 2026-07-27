import { useState, useEffect } from "react"
import CountryBlock from './components/CountryBlock'
import RecentSearches from "./components/RecentSearches"

const RECENT_SEARCHES_KEY = "atlas-recent-searches";

function App() {
  const numberOfCountries = 2
  const [countries, setCountries] = useState(
    [...Array(numberOfCountries)].map(() => {
      return {
        countryInput: "",
        loading: false,
        searched: false,
        countryInfo: null
      }
    })
  );
  const [recentSearches, setRecentSearches] = useState(JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || []);

  useEffect(() => {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
  }, [recentSearches])

  return (
    <>
      <p className=" my-5 text-7xl text-center">🌍</p>
      <h1 className="text-center my-6 text-5xl text-white tracking-widest">ATLAS</h1>
      <p className="text-3xl text-center text-slate-400 my-6">Explore countries of the world</p>
      <div className="country-blocks flex justify-center gap-10 flex-wrap">
        {[...Array(numberOfCountries)].map((_, index) => (
          <CountryBlock
            key = {index}
            index = {index}
            countries = {countries}
            setCountries = {setCountries}
            setRecentSearches = {setRecentSearches}
          />
        ))}
      </div>
      <RecentSearches 
        recentSearches = {recentSearches}
        setRecentSearches = {setRecentSearches}
        countries = {countries}
        setCountries = {setCountries}
      />
    </>
  )
}

export default App; 