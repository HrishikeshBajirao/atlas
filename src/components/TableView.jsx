import Loading from './Loading'
import { handleCountrySubmit } from '../utils/handleCountrySubmit.js'

export default function TableView({countries, setCountries, setRecentSearches}){

    const comparisonPanels = [
        {
            label: "Name",
            values: countries.map(c => c.countryInfo?.names.common)
        },
        {
            label: "Continent",
            values: countries.map(c => c.countryInfo?.continents.join(", "))
        },
        {
            label: "Capital",
            values: countries.map(c => c.countryInfo?.capitals[0].name)
        },
        {
            label: "Area",
            values: countries.map(c => c.countryInfo?.area.kilometers.toLocaleString())
        },
        {
            label: "Population",
            values: countries.map(c => c.countryInfo?.population.toLocaleString())
        },
        {
            label: "Languages",
            values: countries.map(c => c.countryInfo?.languages[0].name)
        },
        {
            label: "Currency",
            values: countries.map(c => c.countryInfo?.currencies[0].name)
        },
    ]

    return (
        <div className="grid border text-white"
        style={{ gridTemplateColumns: `repeat(${countries.length + 1}, minmax(0, 1fr))` }}>

            <div></div>
            
            {countries.map((country, index) => {
                const { countryInput } = country;
                return <input 
                    type="text"
                    value={countryInput} 
                    onChange={(e) => setCountries((currCountries) => {
                        const newCountries = [...currCountries]
                        newCountries[index] = {...newCountries[index], countryInput: e.target.value}
                        return newCountries
                    })}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            handleCountrySubmit(e, index, countryInput, setCountries, setRecentSearches)
                        }
                    }}
                    className="w-2/3 bg-slate-700  rounded-xl shadow-2xl py-3 px-2.5 
                    text-white text-xl text-center placeholder:text-slate-400"
                    placeholder="Search country"
                    required 
                />
            })}
            
            {comparisonPanels.map((panel) => {
                return (
                <>
                    <div key={panel.label}>{panel.label}</div>
                    {
                        panel.label === "Name" 
                        ? 
                            panel.values.map((value, index) => {
                                return countries[index].loading ? 
                                    <Loading countryInput={countries[index].countryInput} />
                                    : !countries[index].searched || countries[index].countryInfo ?
                                    <div key={index}>{value}</div>
                                    : <div key={index}>Invalid Country</div>
                            })
                        :  
                            panel.values.map((value, index) => {
                                return <div key={index}>{value}</div>
                            })
                    }
                </>
                )
            })}

        </div>
    )
}