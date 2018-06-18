import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from '../Chart'
import * as d3Array from 'd3-array'
import './index.scss'

export default class App extends Component {

    constructor(props) {
        super(props)
        let component = this
        component.state = {
            circles: component.genCircles(10)
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <input type="range" min="5" max="25" step="1" defaultValue="10" onChange={this.updateState.bind(this)} />
                    </div>
                </div>
                <div className="row">
                    {this.state.circles.map((ns, index) => (
                        <div className="col-6 text-center" key={'d' + index}>
                            <Chart ns={ns} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    updateState(e) {
        this.setState({circles:this.genCircles(e.target.value)})
    }

    genCircles(n) {
        let component = this
        return d3Array
            .range(n)
            .map(
                n => d3Array
                    .range(component.getRandomIntInclusive(1, 10))
                    .map(n => component.getRandomIntInclusive(5,25)
                )
            )
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso 
    }

}

App.propTypes = {
    n: PropTypes.number,
}

App.defaultProps = {
    n: 1,
}
