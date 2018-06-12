import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class Chart extends Component {

    render() {
        return (
            <svg width={this.props.width} height={this.props.height}>
                <g>
                    {Array(this.props.n).fill().map((item, index) => (
                        <circle cx={this.props.r*2*index+this.props.r} cy={this.props.height/2} r={this.props.r} key={'c'+index}></circle>
                    ))}
                </g>
            </svg>
        )
    }

}

Chart.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    n: PropTypes.number,
    r: PropTypes.number,
}

Chart.defaultProps = {
    width: 300,
    height: 50,
    n: 7,
    r: 25,
}
