import { useState, useEffect } from "react"
import './styles/App.css'
import { ComparisonPlatform } from './components/ComparisonPlatform.jsx'
import { SelectDisplayMode } from './components/SelectDisplayMode'
import { getCountriesList } from './data/restcountries.js'

const RECENT_SEARCHES_KEY = "atlas-recent-searches";

getCountriesList()

function App() {
  const [numberOfSlots, setNumberOfSlots] = useState(2)
  const [recentSearches, setRecentSearches] = useState(JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || []);
  const [countries, setCountries] = useState(
    [...Array(numberOfSlots)].map(() => {
      return {
        countryInput: "",
        loading: false,
        searched: false,
        countryInfo: null,
        requestId: null
      }
    })
  );
  const [displayMode, setDisplayMode] = useState("")
  const [countriesList, setCountriesList] = useState([])

  //fetch all countries list once after app loads to populate the Select input searchable input
  useEffect(() => {
    async function loadCountries(){
      try{
        const data = await getCountriesList()
        setCountriesList(data)
      } catch (err) {
        console.error("Failed to load countries:", err);
      }
    }
    loadCountries()
  }, [])

  //store in local storage whenever recentStorage state changes
  useEffect(() => {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
  }, [recentSearches])

  return (
    <>

      {displayMode === "" ?
        <>
        <p className=" my-5 text-7xl text-center">🌍</p>
        <h1 className="text-center my-6 text-5xl text-white tracking-widest">ATLAS</h1>
        <p className="text-3xl text-center text-slate-400 my-6">Explore countries of the world</p>

        <div className="divider w-[98%] h-[1px] bg-slate-200 mx-auto my-4"></div>
        <SelectDisplayMode 
          setDisplayMode = {setDisplayMode}
        />
        </>
      :
        
        <ComparisonPlatform 
          countries = {countries}
          setCountries = {setCountries}
          recentSearches = {recentSearches}
          setRecentSearches = {setRecentSearches}
          countriesList = {countriesList}
          setNumberOfSlots = {setNumberOfSlots}
          displayMode = {displayMode}
          setDisplayMode = {setDisplayMode}
        />

      }
    </>
  )
}

export default App; 