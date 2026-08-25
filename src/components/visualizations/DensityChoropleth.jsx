import * as d3 from 'd3'
import { feature } from "topojson-client"
import { useRef, useEffect } from 'react'

export function DensityChoropleth({countries}){

    const getDensityColor = (density) => {
        if (density < 10) return "#22c55e"
        if (density < 50) return "#84cc16"
        if (density < 100) return "#eab308"
        if (density < 250) return "#f97316"
        if (density < 500) return "#ef4444"
        return "#b91c1c"
    };

    const svgRef = useRef();
    const tooltipRef = useRef();

    useEffect(() => {
    //Consolidating data to render
        const areaPopulationData = countries.filter((country) => country.countryInfo)
            .map((country) => (
                {
                    name: country.countryInfo.name,
                    code: country.countryInfo.alpha3Code,
                    numericCode: country.countryInfo.numericCode,
                    population: country.countryInfo.population,
                    area: country.countryInfo.area,
                    density:  (country.countryInfo.population / country.countryInfo.area).toFixed(2)
                }
        ))
    
        let cancelled = false

        async function drawMap(){
            const parent = svgRef.current.parentElement;
            const w = parent.clientWidth * 0.9;
            const h = 500
            const padding = 20
    
            const world = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");

            //if the component is unmounted then return
            if(cancelled || !world) return

            const countries = feature(world, world.objects.countries)

            const projection = d3.geoEqualEarth()
                .fitExtent([[padding, padding], [w-padding, h-padding]], countries)

            const path = d3.geoPath(projection)

            const svg = d3.select(svgRef.current)
            const tooltip = d3.select(tooltipRef.current)
            svg.selectAll('*').remove();

            //to make the map zoomable
            const mapGroup = svg.append("g");
            
            svg
                .attr("viewBox", `0 0 ${w} ${h}`)
                .attr("width", w)
                .attr("height", h)
    
            mapGroup
                .selectAll("path")
                .data(countries.features)
                .join("path")
                .attr("d", path)
                .attr("fill", d => {
                    const country = areaPopulationData.find(item => item.numericCode === String(d.id))
                    return country ? getDensityColor(country.density) : "#334155";
                })
                .attr("stroke", "white")
                .attr("stroke-width", 0.5)
                .on("mouseenter", () => {
                    tooltip.classed("hidden", false);
                })
                .on("mousemove", function(e, d) {

                    const country = areaPopulationData.find(item => item.numericCode === String(d.id))
                    if (!country) {
                        tooltip.classed("hidden", true);
                        return;
                    }

                    const containerRect = svgRef.current.parentElement.getBoundingClientRect()

                    tooltip
                        .classed("hidden", false)
                        .style('left', `${e.clientX - containerRect.left}px`)
                        .style('top', `${e.clientY - containerRect.top}px`)
                        .html(
                            `<p>Country: ${country?.name ?? "Country"}</p>
                            <p>Population: ${country.population.toLocaleString()}</p>
                            <p>Area: ${country.area.toLocaleString()} sqkm</p>
                            <p>Density: ${country.density}</p>
                            
                        `)
                    
                    //make the stroke width broader on hovering over a country
                    d3.select(this)
                        .attr("stroke", "black")
                        .attr("stroke-width", 2);                    

                })
                .on("mouseleave", function() {
                    tooltip.classed("hidden", true)
                    d3.select(this)
                        .attr("stroke", "white")
                        .attr("stroke-width", 0.5);
                })

            const zoom = d3.zoom()
                .scaleExtent([1, 8])
                .on("zoom", (event) => {
                    mapGroup.attr("transform", event.transform);
                });

            svg.call(zoom)

        

        }

        drawMap();

        return () => {
            cancelled = true;
        };

    }, [countries])

    return (
        <>
        <svg ref={svgRef}></svg>
        <div 
            ref={tooltipRef} 
            className="tooltip absolute pointer-events-none hidden bg-slate-800 text-white font-semibold px-3 py-2 rounded-lg"
        ></div>
        </>
    )
}