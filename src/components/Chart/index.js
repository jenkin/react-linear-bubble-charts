import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { VictoryContainer, Circle, Rect, Path } from 'victory-core'
import * as d3Shape from 'd3-shape'
import './index.scss'

export default class Chart extends Component {

    render() {
        return (
            <VictoryContainer width={this.props.width} height={this.props.height} responsive={true}>
                <g>
                    {this.props.ns.map((r, index) => (
                        <Circle cx={50*index+25} cy={this.props.height/2} r={r} key={'c'+index}/>
                    ))}
                </g>
                <g>
                    {this.props.ns.map((r, index) => (
                        <Rect x={50*index+25-2} y={this.props.height/2-r} width={4} height={r} key={'r'+index} style={{fill:"grey"}}/>
                    ))}
                </g>
                <g>
                    <Path d={d3Shape.line().x((d,i) => 50*i+25).y(d => this.props.height/2-d)(this.props.ns)} style={{fill:"none",stroke:"steelblue",strokeWidth:"2px"}}/>
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
