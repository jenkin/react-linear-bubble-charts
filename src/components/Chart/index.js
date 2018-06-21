import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { VictoryContainer, Circle, Rect, Path } from 'victory-core'
import * as d3Shape from 'd3-shape'
import * as d3Scale from 'd3-scale'
import * as d3Array from 'd3-array'
import './index.scss'

export default class Chart extends Component {

    

    render() {

        let component = this

        let scaleX = d3Scale.scalePoint()
            .domain(d3Array.range(component.props.ns.length))
            .rangeRound([0,component.props.width])
            .padding(0.5)

        let scaleY = (y) => Math.floor(y)

        let scaleRadius = d3Scale.scaleSqrt()
            .domain(d3Array.extent(component.props.ns))
            .range(
                [
                    2,
                    Math.floor(
                        Math.min(
                            component.props.height/2,
                            component.props.width/component.props.ns.length/2
                        )
                    )
                ]
            )

        let scaleHeight = d3Scale.scaleLinear()
            .domain(d3Array.extent(component.props.ns))
            .range(
                [
                    0,
                    Math.floor(component.props.height/2)
                ]
            )

        let line = d3Shape.line()
            .x((d,i) => scaleX(i))
            .y(d => scaleY(component.props.height/2)-scaleHeight(d))

        return (
            <VictoryContainer width={component.props.width} height={component.props.height}>
                <g>
                    {component.props.ns.map((r, index) => (
                        <Circle cx={scaleX(index)} cy={scaleY(component.props.height/2)} r={scaleRadius(r)} key={'c'+index}/>
                    ))}
                </g>
                <g>
                    {component.props.ns.map((h, index) => (
                        <Rect x={scaleX(index)-2} y={scaleY(component.props.height/2)-scaleHeight(h)} width={4} height={scaleHeight(h)} key={'r'+index} style={{fill:"grey"}}/>
                    ))}
                </g>
                <g>
                    <Path d={line(component.props.ns)} style={{fill:"none",stroke:"steelblue",strokeWidth:"2px"}}/>
                </g>
            </VictoryContainer>
        )
    }

}

Chart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    ns: PropTypes.array,
    r: PropTypes.number,
}

Chart.defaultProps = {
    width: 300,
    height: 50,
    ns: [1,2,3,4,5],
    r: 25,
}
