import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from '../Chart'
import Filter from '../Filter'
import * as d3Array from 'd3-array'
import * as d3Collection from 'd3-collection'
import { uniqBy } from 'lodash'
import './index.scss'

export default class App extends Component {

    firstOrderCategories = ["Morocco", "Venezuela", "Congo", "Italy", "Puerto Rico", "Sri Lanka", "Poland", "Malaysia", "Seychelles", "Réunion", "Ukraine", "Afghanistan", "Libya", "New Zealand", "Mauritius"]
    secondOrderCategories = ["Golf", "Volleyball", "Swimming", "Badminton", "Gynastics", "Rugby", "Ice Hockey", "Rowing", "Fencing", "Surfing"]
    firstFilteredCategories = ["computer", "lamp shade", "drill press", "bananas", "tomato", "ipod"]
    secondFilteredCategories = ["thermostat", "couch", "lotion", "slipper", "key chain", "glass"]

    originalData = this.generateData(100)
    filteredData = this.filterData()
    nestedData = this.nestData()

    state = this.generateState()

    render() {

        let component = this

        return (
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <div className="row">
                            <div className="col-12">
                                <Filter title="firstFilter" items={component.state.firstFilter} onChange={::component.updateState}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Filter title="secondFilter" items={component.state.secondFilter} onChange={::component.updateState}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        {component.nestedData.map((country, index) => (
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

    nestData() {
        return d3Collection.nest()
            .key(d => d.firstOrderCategory)
            .key(d => d.secondOrderCategory)
            .entries(this.filteredData)
    }

    filterData(n) {
        return this.originalData.slice(0, n || this.originalData.length)
    }

    generateState() {
        return {
            firstFilter: uniqBy(this.filteredData.map(d => ({ name: d.firstFilteredCategory, checked: false })), 'name'),
            secondFilter: uniqBy(this.filteredData.map(d => ({ name: d.secondFilteredCategory, checked: false })), 'name')
        }
    }

    updateState(status) {
        this.setState((prevState, props) => ({
            [status.filter]: prevState[status.filter].map(d => ({ name: d.name, checked: status.name === d.name ? status.checked : d.checked }))
        }))
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
