import * as d3 from 'd3'
import { useRef, useEffect } from 'react'

export function PopulationBarChart(){
    const svgRef = useRef()

    useEffect(() => {

        const svg = d3
            .select(svgRef.current)
            .attr('width', 800)
            .attr('height', 500)
            .attr('fill', 'white')


    }, [])

    return (
        <svg ref={svgRef}></svg>
    )
}