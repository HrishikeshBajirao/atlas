import { useState, useEffect } from "react"
import { CountryBlock } from './components/CountryBlock'
import { RecentSearches } from "./components/RecentSearches"
import { SelectDisplayMode } from './components/SelectDisplayMode'
import { TableView } from './components/TableView'

const RECENT_SEARCHES_KEY = "atlas-recent-searches";

function App() {
  const [numberOfSlots, setNumberOfSlots] = useState(2)
  const [recentSearches, setRecentSearches] = useState(JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || []);
  const [countries, setCountries] = useState(
    [...Array(numberOfSlots)].map(() => {
      return {
        countryInput: "",
        loading: false,
        searched: false,
        countryInfo: null
      }
    })
  );
  const [displayMode, setDisplayMode] = useState("cards")

  //store in local storage whenever recentStorage state changes
  useEffect(() => {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
  }, [recentSearches])

  //add a new slot to the comparison panel
  const handleAddSlotClick = () => {
    setNumberOfSlots((currSlots) => currSlots + 1)
    setCountries((currCountries) => {
      return [...currCountries,
        {
          countryInput: "",
          loading: false,
          searched: false,
          countryInfo: null
        }
      ]
    })
  }

  return (
    <>
      <p className=" my-5 text-7xl text-center">🌍</p>
      <h1 className="text-center my-6 text-5xl text-white tracking-widest">ATLAS</h1>
      <p className="text-3xl text-center text-slate-400 my-6">Explore countries of the world</p>

      <SelectDisplayMode 
        displayMode = {displayMode}
        setDisplayMode = {setDisplayMode}
      />

      {displayMode === 'cards' 
        ? <div className="country-blocks flex justify-center gap-10 flex-wrap">
            {[...Array(numberOfSlots)].map((_, index) => (
              <CountryBlock
                key = {index}
                index = {index}
                countries = {countries}
                setCountries = {setCountries}
                setRecentSearches = {setRecentSearches}
                setNumberOfSlots = {setNumberOfSlots}
              />
            ))}
          </div>
        :
          <TableView 
            countries = {countries}
            setCountries = {setCountries}
            setRecentSearches = {setRecentSearches}
          />
      }
      
      <button
        className="block mx-auto my-3 bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium
                  transition duration-300 ease-in-out transform
                  hover:bg-emerald-500 hover:scale-105
                  active:scale-95 hover:cursor-pointer"
        onClick={handleAddSlotClick}
      >
        + Add Comparison Slot
      </button>

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