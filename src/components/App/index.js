import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from '../Chart'
import Filter from '../Filter'
import * as d3Array from 'd3-array'
import * as d3Collection from 'd3-collection'
import { uniq } from 'lodash'
import './index.scss'

export default class App extends Component {

    firstOrderCategories = ["Morocco", "Venezuela", "Congo", "Italy", "Puerto Rico", "Sri Lanka", "Poland", "Malaysia", "Seychelles", "Réunion", "Ukraine", "Afghanistan", "Libya", "New Zealand", "Mauritius"]
    secondOrderCategories = ["Golf", "Volleyball", "Swimming", "Badminton", "Gynastics", "Rugby", "Ice Hockey", "Rowing", "Fencing", "Surfing"]
    firstFilteredCategories = ["computer", "lamp shade", "drill press", "bananas", "tomato", "ipod"]
    secondFilteredCategories = ["thermostat", "couch", "lotion", "slipper", "key chain", "glass"]

    data = this.generateData(100)
    state = this.getState()

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <div className="row">
                            <div className="col-12">
                                <Filter title="firstFilter" items={this.state.firstFilter}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Filter title="secondFilter" items={this.state.secondFilter}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        {this.state.countries.map((country, index) => (
                            <div className="row" key={'d' + index}>
                                <h2 className="col-12 text-center">{country.key}</h2>
                                <div className="col-12 text-center">
                                    <Chart circles={country.values} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    nestData(n) {
        return d3Collection.nest()
            .key(d => d.firstOrderCategory)
            .key(d => d.secondOrderCategory)
            .entries(this.sliceData(n))
    }

    sliceData(n) {
        return this.data.slice(0, n || this.data.length)
    }

    getState(n) {
        let slicedData = this.sliceData(n),
            nestedData = this.nestData(n)
        return {
            countries: nestedData,
            firstFilter: uniq(slicedData.map(d => d.firstFilteredCategory)),
            secondFilter: uniq(slicedData.map(d => d.secondFilteredCategory))
        }
    }

    updateState(e) {
        this.setState(this.getState(e.target.value))
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
                    "name": "c" + n,
                    "value": component.getRandomIntInclusive(5, 25)
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
