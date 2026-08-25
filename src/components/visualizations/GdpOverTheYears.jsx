import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function GdpOverTheYears(){
    const svgRef = useRef();

    useEffect(() => {

        const parent = svgRef.current.parentElement;
        const w = parent.clientWidth * 0.9;
        const h = 500
        const padding = 20

        const svg = d3.select(svgRef.current)
        svg.selectAll('*').remove();

    }, [])

    return (
        <>
        <svg ref={svgRef}></svg>
        </>
    )
}