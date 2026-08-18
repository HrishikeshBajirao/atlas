import { Loading } from '../Loading'

export function TableView({countries}){

    const comparisonGroups = [
        {
            title: "🌍 Geography",
            panels: [
                {
                    label: "Name",
                    values: countries.filter(c => c.countryInfo !== null).map(c => c.countryInfo?.name)
                },
                {
                    label: "Continent",
                    values: countries.filter(c => c.countryInfo !== null).map(c => c.countryInfo?.region)
                },
                {
                    label: "Capital",
                    values: countries.filter(c => c.countryInfo !== null).map(c => c.countryInfo?.capital)
                },
                {
                    label: "Area (sqkm)",
                    values: countries.filter(c => c.countryInfo !== null).map(c => c.countryInfo?.area.toLocaleString())
                }
            ]
        },
        {
            title: "👥 Demographics",
            panels: [
                {
                    label: "Population",
                    values: countries.filter(c => c.countryInfo !== null).map(c => c.countryInfo?.population.toLocaleString())
                },
                {
                    label: "Languages",
                    values: countries.filter(c => c.countryInfo !== null).map(c => c.countryInfo?.languages[0])
                }
            ]
        },
        {
            title: "💰 Economy",
            panels: [
                {
                    label: "Currency",
                    values: countries.filter(c => c.countryInfo !== null).map(c => c.countryInfo?.currency[0])
                }
            ]
        }

    ]

    const notNullCountriesCount = countries.filter(c => c.countryInfo !== null).length

    return (
        <div className="overflow-x-auto my-10 mx-10 border border-slate-700 gap-1 rounded-lg">
            <div className="min-w-[900px] grid text-black"
            style={{ gridTemplateColumns: `200px repeat(${notNullCountriesCount}, minmax(250px, 1fr))` }}>

                {/* ------- FIRST ROW ------- */}
                <div className="bg-white sticky left-0 z-10" style={{ gridColumn: 1 }}></div>

                {/* first cell of every column excapt first will be the country's flag */}
                {countries.map((country, index) => {
                    const { countryInfo } = country;
                    return (
                        //render only when the country is selected
                        country.countryInfo !== null ? 
                            <div key={index} className="flex justify-center items-center">
                                <img 
                                    src={countryInfo?.flag.svg}
                                    width="200"
                                />
                            </div>
                        :
                            ""
                    )
                    
                })}

                {comparisonGroups.map((group) => {
                    return (
                        <>
                        <div key={group.title} 
                        style={{ gridColumn: 1 }}
                        className="col-span-full
                            mt-8
                            pb-2
                            pl-4
                            border-b
                            border-r border-slate-700/50
                            text-2xl
                            font-semibold
                            tracking-wide
                            text-black
                            bg-gray"><span className="sticky left-0 bg-white pr-4">{group.title}</span></div>

                        {group.panels.map((panel) => {
                            return (
                                <>
                                <div key={panel.label}
                                style={{ gridColumn: 1 }}
                                className="sticky left-0 z-10 text-lg py-1.5 font-semibold 
                                text-black px-4 border-b border-r border-slate-700/50 bg-white">
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
                                                    text-black
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
                                                        text-black
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