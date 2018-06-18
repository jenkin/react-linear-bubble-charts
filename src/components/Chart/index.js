import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Circle } from 'victory-core'
import './index.scss'

export default class Chart extends Component {

    render() {
        return (
            <svg width={this.props.width} height={this.props.height}>
                <g>
                    {this.props.ns.map((r, index) => (
                        <Circle cx={50*index+25} cy={this.props.height/2} r={r} key={'c'+index}/>
                    ))}
                </g>
            </svg>
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
