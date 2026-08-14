import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

export function PopulationHorizontalBarChart({countries, }){

    const svgRef = useRef()
    const tooltipRef = useRef()    

    useEffect(() => {
    
    //Consolidating Data    
        const populationData = countries.filter((country) => country.countryInfo)
            .map((country) => {
                return {
                    name: country.countryInfo.name,
                    value: country.countryInfo.population / 1000000
                }
            })
    
    //Initialization
        const parent = svgRef.current.parentElement;
        const w = parent.clientWidth * 0.9;
        const h = 400
        const padding = 100
        const svg = d3
            .select(svgRef.current)
            .attr('width', w)
            .attr('height', h)

        //remove old redering
        svg.selectAll("*").remove()

        const tooltip = d3.select(tooltipRef.current)

    //Scales and Axes
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(populationData, d => d.value)])
            .range([0, w - 2*padding])

        const xAxis = d3.axisBottom(xScale)

        const yScale = d3
            .scaleBand()
            .domain(populationData.map(d => d.name))
            .range([padding, h-padding])
            .padding(0.2)

        const yAxis = d3.axisLeft(yScale)

        svg
            .append('g')
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr('transform', 'translate(' + padding + ', ' + (h - padding) + ')')

        svg
            .append('g')
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr('transform', 'translate(' + padding + ', 0)')

        svg
            .append('text')
            .attr('x', w/2 - 100)
            .attr('y', h-padding/2)
            .style('font-size', '14px')
            .text("Population (in millions)")

    //Rendering Data
        svg
            .selectAll('rect')
            .data(populationData)
            .enter()
            .append('rect')
            .attr('x', padding)
            .attr("y", d => yScale(d.name))
            .attr("width", 0)
            .attr("height", yScale.bandwidth())
            .attr('fill', 'steelblue')
            .attr('class', 'rect')
            .on("mouseenter", (e, d) => {
                const [x, y] = d3.pointer(e, svgRef.current)

                const svgRect = svgRef.current.getBoundingClientRect()
                const containerRect = svgRef.current.parentElement.getBoundingClientRect()

                tooltip
                    .classed("hidden", false)
                    .style("left", `${x + svgRect.left - containerRect.left}px`)
                    .style("top", `${y + svgRect.top - containerRect.top}px`)
                    .text(`${d.name}: ${d.value.toLocaleString()}`)

            })
            .on("mouseleave" , () => {
                tooltip.classed("hidden", true)
            })
            .transition()
            .duration(750)
            .ease(d3.easeCubicOut)
            .attr('x', padding)
            .attr('width', d => xScale(d.value))
            
    }, [countries])

    return (
        <>
        <svg 
            ref={svgRef} 
            className="bg-white mx-auto my-10 rounded-lg"
        ></svg>    
        <div 
            ref={tooltipRef} 
            className="absolute hidden bg-red-600 text-white px-3 py-2 rounded-lg"
        ></div>
        </>
    )

}