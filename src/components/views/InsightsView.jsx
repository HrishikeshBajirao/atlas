import { PopulationHorizontalBarChart } from '../visualizations/Population'
import { AreaScatterPlot } from '../visualizations/Density'
import { ChartPanel } from '../ChartPanel'

export function InsightsView({countries}){
    

    return (

        <div className="relative">

            <ChartPanel
                chartName="Population Bar Chart"
                chart={PopulationHorizontalBarChart}
                countries={countries}
            />

            <ChartPanel
                chartName="Area Population Density Scatter Plot"
                chart={AreaScatterPlot}
                countries={countries}
            />

        </div>
    )
}