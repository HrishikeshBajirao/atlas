import Loading from './Loading'
import { handleSubmit } from '../utils/handleCountrySubmit.js'

export default function TableView({countries, setCountries, setRecentSearches}){
    return (
        <div className={`grid grid-cols-8 border-1 text-white`}>
            <div></div>
            <div>Name</div>
            <div>Continent</div>
            <div>Capital</div>
            <div>Area</div>
            <div>Population</div>
            <div>Languages</div>
            <div>Currency</div>
            
            {countries.map((country, index) => {
                const { countryInput, countryInfo, searched, loading } = country || {}
                
                return (
                    <>
                    <input 
                        type="text"
                        value={countryInput} 
                        onChange={(e) => setCountries((currCountries) => {
                            const newCountries = [...currCountries]
                            newCountries[index] = {...newCountries[index], countryInput: e.target.value}
                            return newCountries
                        })}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                handleSubmit(e, index, countryInput, setCountries, setRecentSearches)
                            }
                        }}
                        className="w-2/3 bg-slate-700  rounded-xl shadow-2xl py-3 px-2.5 
                        text-white text-xl text-center placeholder:text-slate-400"
                        placeholder="Search country"
                        required 
                    />
                    <div key="name">
                        {
                            loading ? (
                              <Loading countryInput={countryInput} />
                            ) : !searched || countryInfo ? countryInfo?.names.common
                            : "invalid country"
                        }
                    </div>
                    <div key="continent">{countryInfo?.continents.join(', ')}</div>
                    <div key="capital">{countryInfo?.capitals[0].name}</div>
                    <div key="area">{countryInfo?.area.kilometers.toLocaleString()}</div>
                    <div key="population">{countryInfo?.population.toLocaleString()}</div>
                    <div key="language">{countryInfo?.languages[0].name}</div>
                    <div key="currency">{countryInfo?.currencies[0].name}</div>
                    </>
                )
                
            })}

        </div>
    )
}