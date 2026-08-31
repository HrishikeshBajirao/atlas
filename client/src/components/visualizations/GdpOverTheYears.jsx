import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getHistoricalGdp } from '../../data/getHistoricalGdp.js'

export function GdpOverTheYears({countries}){
    const svgRef = useRef();
    const [historicalGDP, setHistoricalGDP] = useState([]);
    //get tht historical gdp from OWID just once
    useEffect(() => {
        getHistoricalGdp().then(setHistoricalGDP);
        console.log('ff')
    }, []);

    useEffect(() => {

        async function plotGdp(){
            const data = historicalGDP;

            const gdpData = data.filter((item) => (
                countries.find((country) => country.countryInfo?.alpha3Code === item.Code)
            ))

            // console.log(gdpData)

            const parent = svgRef.current.parentElement;
            const w = parent.clientWidth * 0.9;
            const h = 500
            const leftPadding = 120
            const padding = 50

            const svg = d3.select(svgRef.current)
            svg.selectAll('*').remove();

            svg
                .attr("width", w)
                .attr("height", h)
                .attr("viewBox", [0, 0, w, h])

            //Scales and Axes
            const xScale = d3.scaleLinear()
                .domain(d3.extent(gdpData, d=> +d.Year))    // the +d.Year converts the string format of d.Year to number
                .range([leftPadding, w-padding])

            const yScale = d3.scaleLinear()
                .domain(d3.extent(gdpData, d => +d.GDP))
                .range([h-padding, padding])

            const xAxis = d3
                .axisBottom(xScale)
                .tickFormat(d3.format("d"));   
            const yAxis = d3.axisLeft(yScale);

            svg.append("g")
                .attr("transform", `translate(0,${h - padding})`)
                .call(xAxis.ticks(w / 80).tickSizeOuter(0));

            svg.append("g")
                .attr("transform", `translate(${leftPadding},0)`)
                .call(yAxis)

            //rendering data

            const points = gdpData.map((d) => [xScale(+d.Year), yScale(+d.GDP), d.Entity, +d.GDP])
            const groups = d3.rollup(points, v => Object.assign(v, {z: v[0][2]}), d => d[2])

            const line = d3.line();
            const path = svg.append("g")
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .selectAll("path")
                .data(groups.values())
                .join("path")
                .style("mix-blend-mode", "multiply")
                .attr("d", line);

            //tooltip circle
            const dot = svg.append("g")
                .attr("display", "none");
          
            dot.append("circle")
                .attr("r", 2.5);
          
            dot.append("text")
                .attr("text-anchor", "middle")
                .attr("y", -8);
          
            svg
                .on("pointerenter", pointerentered)
                .on("pointermove", pointermoved)
                .on("pointerleave", pointerleft)
                .on("touchstart", event => event.preventDefault());
            
            return svg.node();

            function pointermoved(event) {
                const [xm, ym] = d3.pointer(event);
                const i = d3.leastIndex(points, ([x, y]) => Math.hypot(x - xm, y - ym));
                const [x, y, country, gdp] = points[i];
                path.style("stroke", ({z}) => z === country ? null : "#ddd").filter(({z}) => z === country).raise();
                dot.attr("transform", `translate(${x},${y})`);
                dot.select("text").text(`${country}: $${d3.format(",.0f")(gdp)}`);
                svg.property("value", gdpData[i]).dispatch("input", {bubbles: true});
            }
            
            function pointerentered() {
                path.style("mix-blend-mode", null).style("stroke", "#ddd");
                dot.attr("display", null);
            }
            
            function pointerleft() {
                path.style("mix-blend-mode", "multiply").style("stroke", null);
                dot.attr("display", "none");
                svg.node().value = null;
                svg.dispatch("input", {bubbles: true});
            }
        }

        plotGdp();

    }, [countries, historicalGDP])

    return (
        <>
        <svg ref={svgRef}></svg>
        </>
    )
}