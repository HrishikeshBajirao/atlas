import { Loading } from './Loading'
import { SearchForm } from './SearchForm'

export function TableView({countries, setCountries, setRecentSearches, countriesList}){

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

            {/* ------- FIRST ROW ------- */}
            <div></div>
            {/* first cell of every column excapt first will be the search box */}
            {countries.map((country, index) => {
                const { countryInput } = country;
                return <SearchForm 
                    key={index}
                    index = {index}
                    setCountries = {setCountries}
                    countryInput = {countryInput}
                    setRecentSearches = {setRecentSearches}
                    countriesList = {countriesList}
                />
            })}
            
            {/* ------- OTHER ROWS -------- */}
            {comparisonPanels.map((panel) => {
                return (
                <>
                    {/* First cell of every row except first is the property name, e.g. population, capital... */}
                    <div key={panel.label}>{panel.label}</div>

                    {/* the values for a property for all countries is put in this row-wise manner */}
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