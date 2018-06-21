import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { VictoryContainer, Circle, Rect, Path, Text } from 'victory-core'
import * as d3Shape from 'd3-shape'
import * as d3Scale from 'd3-scale'
import * as d3Array from 'd3-array'
import './index.scss'

export default class Chart extends Component {

    render() {

        let component = this

        let values = d3Array.extent(component.props.circles.map(c => c.values.map(v => v.value).reduce((m,n) => m+n,0)))

        let scaleX = d3Scale.scalePoint()
            .domain(d3Array.range(component.props.circles.length))
            .rangeRound([0,component.props.width])
            .padding(0.5)

        let scaleY = (y) => Math.floor(y)

        let scaleRadius = d3Scale.scaleSqrt()
            .domain(d3Array.extent(values))
            .range(
                [
                    2,
                    Math.floor(
                        Math.min(
                            component.props.height/3,
                            component.props.width/component.props.circles.length/2
                        )
                    )
                ]
            )

        let scaleHeight = d3Scale.scaleLinear()
            .domain(d3Array.extent(values))
            .range(
                [
                    2,
                    Math.floor(component.props.height/3)
                ]
            )

        let line = d3Shape.line()
            .x((d,i) => scaleX(i))
            .y(d => scaleY(component.props.height/2)-scaleHeight(d.values.map(v => v.value).reduce((m,n) => m+n,0)))

        return (
            <VictoryContainer
                width = {component.props.width}
                height = {component.props.height}
                className = "chart"
            >
                <g>
                    {component.props.circles.map((c, index) => {
                        let r = c.values.map(v => v.value).reduce((m,n) => m+n,0)
                        return (
                            <Circle
                                cx = {scaleX(index)}
                                cy = {scaleY(component.props.height/2)}
                                r = {scaleRadius(r)}
                                key = {'c'+index}
                                className = "bubble"
                            />
                        )
                    })}
                </g>
                <g>
                    {component.props.circles.map((c, index) => {
                        let h = c.values.map(v => v.value).reduce((m,n) => m+n,0)
                        return (
                            <Rect
                                x = {scaleX(index)-2}
                                y = {scaleY(component.props.height/2)-scaleHeight(h)}
                                width = {4}
                                height = {scaleHeight(h)}
                                key = {'r'+index}
                                className = "bar"
                            />
                        )
                    })}
                </g>
                <g>
                    {component.props.circles.map((c, index) => {
                        let r = c.values.map(v => v.value).reduce((m,n) => m+n,0)
                        return (
                            <Text
                                x = {scaleX(index)}
                                y = {scaleY(component.props.height/2) + scaleRadius(r)}
                                dy = {8}
                                key = {'tt'+index}
                                className = "label"
                            >
                                {c.key}
                            </Text>
                        )
                    })}
                </g>
                <g>
                    {component.props.circles.map((c, index) => {
                        let n = c.values.map(v => v.value).reduce((m,n) => m+n,0)
                        return (
                            <Text
                                x = {scaleX(index)}
                                y = {scaleY(component.props.height/2)-scaleHeight(n)}
                                dy = {-4}
                                key = {'nt'+index}
                                className = "label"
                            >
                                {n}
                            </Text>
                        )
                    })}
                </g>
                <g>
                    <Path
                        d = {line(component.props.circles)}
                        className = "line"
                    />
                </g>
            </VictoryContainer>
        )
    }

}

Chart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    circles: PropTypes.array,
}

Chart.defaultProps = {
    width: 300,
    height: 50,
    circles: [1,2,3,4,5],
}
