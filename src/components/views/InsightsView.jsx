import { PopulationHorizontalBarChart } from '../visualizations/Population'
import { AreaScatterPlot } from '../visualizations/Density'

export function InsightsView({countries}){
    

    return (

        <div className="relative">

            <PopulationHorizontalBarChart 
                countries = {countries}
            />

            <AreaScatterPlot 
                countries = {countries}
            />

        </div>
    )
}