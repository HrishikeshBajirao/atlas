import { Loading } from './Loading'
import { SearchForm } from './SearchForm'

export function TableView({countries, setCountries, setRecentSearches, countriesList}){

    const comparisonGroups = [
        {
            title: "🌍 Geography",
            panels: [
                {
                    label: "Name",
                    values: countries.map(c => c.countryInfo?.name)
                },
                {
                    label: "Continent",
                    values: countries.map(c => c.countryInfo?.region)
                },
                {
                    label: "Capital",
                    values: countries.map(c => c.countryInfo?.capital)
                },
                {
                    label: "Area (sqkm)",
                    values: countries.map(c => c.countryInfo?.area.toLocaleString())
                }
            ]
        },
        {
            title: "👥 Demographics",
            panels: [
                {
                    label: "Population",
                    values: countries.map(c => c.countryInfo?.population.toLocaleString())
                },
                {
                    label: "Languages",
                    values: countries.map(c => c.countryInfo?.languages[0])
                }
            ]
        },
        {
            title: "💰 Economy",
            panels: [
                {
                    label: "Currency",
                    values: countries.map(c => c.countryInfo?.currency[0])
                }
            ]
        }

    ]


    return (
        <div className="overflow-x-auto my-10 mx-10 border border-slate-700 gap-1 rounded-lg">
            <div className="min-w-[900px] grid text-white"
            style={{ gridTemplateColumns: `200px repeat(${countries.length}, minmax(250px, 1fr))` }}>

                {/* ------- FIRST ROW ------- */}
                <div></div>
                {/* first cell of every column excapt first will be the search box */}
                {countries.map((country, index) => {
                    const { countryInput } = country;
                    return (
                        <>
                        <div key={index} className="flex justify-center items-center">
                            <SearchForm 
                                key={index}
                                index = {index}
                                setCountries = {setCountries}
                                countryInput = {countryInput}
                                setRecentSearches = {setRecentSearches}
                                countriesList = {countriesList}
                            />
                        </div>
                        </>
                    )
                    
                })}

                {comparisonGroups.map((group) => {
                    return (
                        <>
                        <div key={group.title} 
                        className="col-span-full
                            mt-8
                            mb-2
                            border-b
                            border-slate-700
                            text-2xl
                            font-semibold
                            tracking-wide
                            text-slate-300">{group.title}</div>

                        {group.panels.map((panel) => {
                            return (
                                <>
                                <div key={panel.label}
                                className="sticky left-0 z-10 bg-slate-800 text-lg py-1.5 font-semibold text-gray-300 pr-5 rounded-md px-4">
                                    {panel.label}
                                </div>

                                {/* the values for a property for all countries is put in this row-wise manner */}
                                {
                                    panel.label === "Name" 
                                    ? 
                                        panel.values.map((value, index) => {
                                            return countries[index].loading ? 
                                                <Loading countryInput={countries[index].countryInput} />
                                                : !countries[index].searched || countries[index].countryInfo ?
                                                <div 
                                                    className="px-4
                                                    py-2
                                                    text-center
                                                    text-lg
                                                    font-medium
                                                    text-slate-100
                                                    border-b
                                                    border-slate-700/50"
                                                key={index}>{value}</div>
                                                : <div key={index}>Invalid Country</div>
                                        })
                                    :  
                                        panel.values.map((value, index) => {
                                            return <div 
                                                        className="px-4
                                                        py-2
                                                        text-center
                                                        text-lg
                                                        font-medium
                                                        text-slate-100
                                                        border-b
                                                        border-slate-700/50" 
                                                    key={index}>{value}</div>
                                        })
                                }
                                </>
                            )
                        })}
                        </>
                    )

                })}
                
                
            </div>
        </div>
    )
}

// ------- OTHER ROWS --------
//                 {comparisonPanels.map((panel) => {
//                     return (
//                     <>
//                         {/* First cell of every row except first is the property name, e.g. population, capital... */}
//                         <div key={panel.label}
//                         className="sticky left-0 z-10 bg-slate-800 text-2xl py-1.5 font-semibold text-gray-300 pr-5 rounded-md px-4">{panel.label}</div>

//                         {/* the values for a property for all countries is put in this row-wise manner */}
//                         {
//                             panel.label === "Name" 
//                             ? 
//                                 panel.values.map((value, index) => {
//                                     return countries[index].loading ? 
//                                         <Loading countryInput={countries[index].countryInput} />
//                                            : !countries[index].searched || countries[index].countryInfo ?
//                                         <div key={index}>{value}</div>
//                                         : <div key={index}>Invalid Country</div>
//                                 })
//                             :  
//                                 panel.values.map((value, index) => {
//                                     return <div key={index}>{value}</div>
//                                 })
//                         }
//                     </>
//                     )
//                 })}