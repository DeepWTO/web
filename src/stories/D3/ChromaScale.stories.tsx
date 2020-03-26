import React, { useRef, useState, useEffect } from 'react'
import { select, Selection } from 'd3-selection'
import { axisLeft, axisBottom } from 'd3-axis'
import { scaleLinear, scaleBand } from 'd3-scale'
import { event, interpolateViridis } from 'd3'

import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { STATE } from "../../redux/actionTypes"

import API, { graphqlOperation } from '@aws-amplify/api';
import awsconfig from '../../aws-exports';
import { getInvokabilities } from '../../graphqlQueries'

import './Tooltip.css';

API.configure(awsconfig);

export default {
    title: 'D3/ChromaticScales',
}

type ChromaScaleType = { data: number[], text: string[] }

export const ChromaScale = ({ data = [0.2056794, 0.0007233462, 0.5, 1, 0.7, 0.4, 0.3, 0.6, 0.9, 1, 0.5, 0.6, 0.34, 0.17, 1, 0.5, 0.7, 0.2056794, 0.0007233462, 0.5, 1, 0.7, 0.4, 0.3, 0.6, 0.9, 1, 0.5, 0.6, 0.34, 0.17, 1, 0.5, 0.7], text = ["In", "Feb", "We", "were", "able", "fix", "the", "car", "well", "since", "we", "loved", "charming", "around", "the", "corner", "dev", "In", "Feb", "We", "were", "able", "fix", "the", "car", "well", "since", "we", "loved", "charming", "around", "the", "corner", "dev"] }: ChromaScaleType) => {
    const unit = 20
    const marginTop = unit * 1
    const marginLeft = unit * 2
    const rectWidth = 90
    const widthNumRects = 15
    const vertMarginBtwRects = unit * 1.5

    const dimensions = {
        svgWidth: 1600 + marginLeft,
        svgHeight: 500,
        barWidth: 20,
    }

    const svgRef = useRef<null | SVGSVGElement>(null)
    const [selection, setSelection] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null)

    useEffect(() => {
        console.log("dataEffect", data)
        if (!selection) {
            setSelection(select(svgRef.current))
        } else {
            selection
                .selectAll("g > *").remove()

            const rects = selection
                .selectAll("rects")
                .data(data)
                .enter()

            const rects_color = rects
                .append("rect")
                .attr("x", function (d, i) {
                    return marginLeft + (i % widthNumRects) * rectWidth
                })
                .attr("y", function (d, i) {
                    return marginTop + Math.floor(i / widthNumRects) * (rectWidth + vertMarginBtwRects);
                })
                .attr("width", rectWidth)
                .attr("height", rectWidth)
                .attr("fill", function (d, i) {
                    return interpolateViridis(d)
                        ;
                })

            const rects_line = rects
                .append("line")
                .style("stroke", "#111111")
                .style("stroke-width", 1)
                .attr("x1", function (d, i) {
                    return marginLeft + (i % widthNumRects) * rectWidth + rectWidth * 0.5
                })
                .attr("y1", function (d, i) {
                    return marginTop + rectWidth + Math.floor(i / widthNumRects) * (rectWidth + vertMarginBtwRects);
                })
                .attr("x2", function (d, i) {
                    return marginLeft + (i % widthNumRects) * rectWidth + rectWidth * 0.5
                })
                .attr("y2", function (d, i) {
                    return marginTop + rectWidth + Math.floor(i / widthNumRects) * (rectWidth + vertMarginBtwRects) + 5;
                })

            const rects_text = selection
                .selectAll("rects")
                .data(text)
                .enter()
                .append("text")
                .attr('text-anchor', 'middle')
                .text(function (d, i) {
                    return d
                })
                .attr("x", function (d, i) {
                    return marginLeft + (i % widthNumRects) * rectWidth + rectWidth * 0.5
                })
                .attr("y", function (d, i) {
                    return marginTop + rectWidth + Math.floor(i / widthNumRects) * (rectWidth + vertMarginBtwRects) + 20;
                })
        }
    }, [selection, data])

    return (
        <svg ref={svgRef} width={dimensions.svgWidth} height={dimensions.svgHeight} />
    )
}
