import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as d3Array from 'd3-array'
import './index.scss'

export default class Chart extends Component {

    render() {
        return (
            <svg width={this.props.width} height={this.props.height}>
                <g>
                    {this.props.n.map((r, index) => (
                        <circle cx={50*index+25} cy={this.props.height/2} r={r} key={'c'+index}></circle>
                    ))}
                </g>
            </svg>
        )
    }

}

Chart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    n: PropTypes.array,
    r: PropTypes.number,
}

Chart.defaultProps = {
    width: 300,
    height: 50,
    n: [1,2,3,4,5],
    r: 25,
}
