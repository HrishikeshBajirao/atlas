import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
import { SearchForm } from '../SearchForm.jsx'

export function InsightsView({countries, setCountries, setRecentSearches, countriesList}){
    const svgRef = useRef()
    const tooltipRef = useRef()    

    useEffect(() => {
        
        const populationData = countries.filter((country) => country.countryInfo !== null)
            .map((country) => {
                return {
                    name: country.countryInfo.name,
                    value: country.countryInfo.population
                }
            })
        console.log(populationData)

        const w = 1000
        const h = 400
        const padding = 50
        const svg = d3
            .select(svgRef.current)
            .attr('width', w)
            .attr('height', h)

        svg.selectAll("*").remove()

        const tooltip = d3.select(tooltipRef.current)

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
            .selectAll('rect')
            .data(populationData)
            .enter()
            .append('rect')
            .attr('x', padding)
            .attr('width', d => xScale(d.value))
            .attr("y", d => yScale(d.name))
            .attr("height", yScale.bandwidth())
            .attr('fill', 'steelblue')
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
            
    }, [countries])

    return (
        <div className="relative">

            <div className="max-w-[800px] mx-auto my-5 flex flex-wrap gap-4 justify-center">
                {countries.map((country, index) => (
                    <SearchForm
                        key={index}
                        index={index}
                        setCountries={setCountries}
                        countryInput={country.countryInput}
                        setRecentSearches={setRecentSearches}
                        countriesList = {countriesList}
                    />
                ))}
            </div>

            <svg 
                ref={svgRef} 
                className="bg-white mx-auto my-10 rounded-lg"
            ></svg>    
            <div 
                ref={tooltipRef} 
                className="absolute hidden bg-red-600 text-white px-3 py-2 rounded-lg"
            ></div>
        </div>
    )
}