import * as d3 from 'd3'
import { useRef, useEffect } from 'react'

export function AreaScatterPlot({countries}){

    const getDensityColor = (density) => {
        if (density < 10) return "#22c55e"
        if (density < 50) return "#84cc16"
        if (density < 100) return "#eab308"
        if (density < 250) return "#f97316"
        if (density < 500) return "#ef4444"
        return "#b91c1c"
    }

    const svgRef = useRef()
    const tooltipRef = useRef()

    useEffect(() => {

    //Consolidating data to render
        const areaPopulationData = countries.filter((country) => country.countryInfo)
            .map((country) => (
                {
                    name: country.countryInfo.name,
                    code: country.countryInfo.alpha3Code,
                    population: country.countryInfo.population / 1000000,
                    area: country.countryInfo.area,
                    density:  (country.countryInfo.population / country.countryInfo.area).toFixed(2)
                }
        ))

    //measurements and initialization
        const parent = svgRef.current.parentElement;
        const w = parent.clientWidth * 0.9;
        const h = 400
        const padding = 100

        const svg = d3
            .select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
        
        const tooltip = d3.select(tooltipRef.current)
        
        svg.selectAll('*').remove()

    //Scales and Axes
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(areaPopulationData, d => d.area)])
            .range([padding, w-padding])

        const xAxis = d3.axisBottom(xScale)

        svg
            .append('g')
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr('transform', 'translate(0, ' + (h-padding) + ')')

        svg
            .append('text')
            .attr('x', w/2 - 80)
            .attr('y', h-padding/2)
            .style('font-size', '14px')
            .text('Area (in sqkm)')

        const yScale = d3
            .scaleLinear()
            .domain([d3.max(areaPopulationData, d => d.population), 0])
            .range([padding, h-padding])
        
        const yAxis = d3.axisLeft(yScale)

        svg
            .append('g')
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr('transform', 'translate(' + padding + ', 0)')
        
        svg
            .append('text')
            .attr('x', 45)
            .attr('y', 80)
            .style('font-size', '14px')
            .text("Population (in millions)")
    
    //Rendering Data       
        svg
            .selectAll('circle')
            .data(areaPopulationData)
            .enter()
            .append('circle')
            .attr('r', 8)
            .attr('data-area', d => d.area)
            .attr('data-population', d => d.population)
            .attr('class', 'dot')
            .attr('fill', d => getDensityColor(d.density))
            .on("mouseenter", (e, d) => {
                
                const [x, y] = d3.pointer(e, svgRef.current)

                const svgRect = svgRef.current.getBoundingClientRect()
                const containerRect = svgRef.current.parentElement.getBoundingClientRect()

                tooltip
                    .classed("hidden", false)
                    .style('left', `${x + svgRect.left - containerRect.left}px`)
                    .style('top', `${y + svgRect.top - containerRect.top}px`)
                    .html(
                        `<p>Country: ${d.name}</p>
                        <p>Population: ${d.population}</p>
                        <p>Area: ${d.area}</p>
                        <p>Density: ${d.density}</p>`
                    )
            })
            .on("mouseleave", () => {
                tooltip.classed("hidden", true)
            })
            .transition()
            .duration(750)
            .attr('cx', d => xScale(d.area))
            .attr('cy', d => yScale(d.population))

        //country labels
        svg
            .selectAll('.country-label')
            .data(areaPopulationData)
            .enter()
            .append('text')
            .attr('class', 'country-label')
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .text(d => d.code) 
            .transition()
            .duration(750)
            .attr('x', d => xScale(d.area))
            .attr('y', d => yScale(d.population) + 20)

    //Legend
        const legend = svg
            .append('g')
            .attr("id", "legend")
            .attr('transform', 'translate(' + w*0.6 + ' , ' + h*0.1 + ')')

        const densityColors = [
            "#22c55e",      // green
            "#84cc16",     // lime
            "#eab308",    // yellow
            "#f97316",   // orange
            "#ef4444",   // red
            "#b91c1c"       // dark red
        ];

        legend
            .selectAll('rect')
            .data(densityColors)
            .enter()
            .append("rect")
            .attr("width", 30)
            .attr("height", 25)
            .attr('x', (d, i) => i*30)
            .attr('fill', d => d)
            .attr("stroke", "black")
            .attr("stroke-width", 1)

        //Legend Axis

        const ticks = [0, 10, 50, 100, 250, 500, '500+']

        const xScaleLegend = d3
            .scaleLinear()
            .domain([0, 6])
            .range([0, 180])

        const xAxisLegend = d3.axisBottom(xScaleLegend)
            .tickSize(7)
            .tickFormat(d => ticks[d])

        legend  
            .append('g')
            .call(xAxisLegend)
            .attr('transform', 'translate(0, 25)')

        legend
            .append("text")
            .text("Population Density")
            .attr('transform', 'translate(23, -10)')

    }, [countries])

    return (
        <>
        <svg ref={svgRef}
            className="bg-white mx-auto my-10 rounded-lg border border-black"
        ></svg>
        <div 
            ref={tooltipRef} 
            className="tooltip absolute hidden bg-slate-800 text-white font-semibold px-3 py-2 rounded-lg"
        ></div>
        </>
    )

}