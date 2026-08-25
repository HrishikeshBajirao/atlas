import { PopulationHorizontalBarChart } from '../visualizations/Population'
import { AreaScatterPlot } from '../visualizations/Density'
import { DensityChoropleth } from '../visualizations/DensityChoropleth'
import { GdpOverTheYears } from '../visualizations/GdpOverTheYears'
import { ChartPanel } from '../ChartPanel'

export function InsightsView({countries}){
    

    return (

        <div className="relative">

            <h1 className="text-4xl font-semibold text-slate-900 my-5 text-center">
                📊 Insights
            </h1>

            <p className="mt-2 text-slate-500 text-2xl text-center">
                Explore population, area, density, and other relationships
                through interactive visualizations.
            </p>

            <span className="inline-block mt-4 px-3 py-1 rounded-full
                            bg-slate-100 text-sm text-slate-500 mx-auto my-5 ml-[43%]">
                Comparing {countries.length} countries
            </span>

            <ChartPanel
                icon="👨‍👩‍👧‍👦"
                chartName="Population Bar Chart"
                chartDescription="Compare the Population..."
                chart={PopulationHorizontalBarChart}
                countries={countries}
            />

            <ChartPanel
                icon="🗺️"
                chartName="Area Population Density Scatter Plot"
                chartDescription=""
                chart={AreaScatterPlot}
                countries={countries}
            />

            <ChartPanel
                icon="🌐"
                chartName="Population Density World Choropleth"
                chartDescription=""
                chart={DensityChoropleth}
                countries={countries}
            />

            <ChartPanel
                icon="💸"
                chartName="GDP over the years"
                chartDescription=""
                chart={GdpOverTheYears}
                countries={countries}
            />

        </div>
    )
}