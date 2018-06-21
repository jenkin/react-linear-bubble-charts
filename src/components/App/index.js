import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from '../Chart'
import * as d3Array from 'd3-array'
import * as d3Collection from 'd3-collection'
import './index.scss'

export default class App extends Component {

    constructor(props) {
        super(props)
        let component = this

        component.firstOrderCategories = ["Morocco","Venezuela","Congo","Italy","Puerto Rico","Sri Lanka","Poland","Malaysia","Seychelles","Réunion","Ukraine","Afghanistan","Libya","New Zealand","Mauritius"]
        component.secondOrderCategories = ["Golf","Volleyball","Swimming","Badminton","Gynastics","Rugby","Ice Hockey","Rowing","Fencing","Surfing"]
        component.firstFilteredCategories = ["computer","lamp shade","drill press","bananas","tomato","ipod"]
        component.secondFilteredCategories = ["thermostat","couch","lotion","slipper","key chain","glass"]

        component.data = component.generateData(100)
        component.state = {
            countries: component.sliceData(100)
        }

    }

    render() {

        return (
            <div className="container">
                {this.state.countries.map((country, index) => (
                    <div className="row" key={'d' + index}>
                        <h2 className="col-12 text-center">{country.key}</h2>
                        <div className="col-12 text-center">
                            <Chart circles={country.values} />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    sliceData(n) {
        return d3Collection.nest()
            .key(d => d.firstOrderCategory)
            .key(d => d.secondOrderCategory)
            .entries(this.data.slice(0,n))
    }

    updateState(e) {
        this.setState({
            countries: this.sliceData(e.target.value)
        })
    }

    generateData(n) {
        let component = this
        return d3Array
            .range(n)
            .map(
                (n) => ({
                    "firstOrderCategory": component.firstOrderCategories[Math.floor(Math.random() * component.firstOrderCategories.length)],
                    "secondOrderCategory": component.secondOrderCategories[Math.floor(Math.random() * component.secondOrderCategories.length)],
                    "firstFilteredCategory": component.firstFilteredCategories[Math.floor(Math.random() * component.firstFilteredCategories.length)],
                    "secondFilteredCategory": component.secondFilteredCategories[Math.floor(Math.random() * component.secondFilteredCategories.length)],
                    "name": "c"+n,
                    "value": component.getRandomIntInclusive(5,25)
                })
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
