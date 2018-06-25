import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from '../Chart'
import Filter from '../Filter'
import * as d3Array from 'd3-array'
import * as d3Collection from 'd3-collection'
import { uniqBy, every, keys, includes, isEmpty, sortBy } from 'lodash'
import './index.scss'

export default class App extends Component {

    firstOrderCategories = ["Morocco", "Venezuela", "Congo", "Italy", "Puerto Rico", "Sri Lanka", "Poland", "Malaysia", "Seychelles", "Réunion", "Ukraine", "Afghanistan", "Libya", "New Zealand", "Mauritius"]
    secondOrderCategories = ["Golf", "Volleyball", "Swimming", "Badminton", "Gynastics", "Rugby", "Ice Hockey", "Rowing", "Fencing", "Surfing"]
    firstFilteredCategories = ["computer", "lamp shade", "drill press", "bananas", "tomato", "ipod"]
    secondFilteredCategories = ["thermostat", "couch", "lotion", "slipper", "key chain", "glass"]

    originalData = this.generateData(100)

    state = this.generateState(this.originalData)

    render() {

        let component = this,
            filteredData = component.filterData(
                component.originalData,
                component.state
            ),
            nestedData = component.nestData(filteredData),
            filters = component.generateState(
                filteredData,
                component.state
            )

        return (
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <div className="row">
                            <div className="col-12">
                                <Filter title="firstFilter" items={filters.firstFilter} onChange={::component.updateState}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Filter title="secondFilter" items={filters.secondFilter} onChange={::component.updateState}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        {nestedData.map((d, index) => (
                            <div className="row" key={'d-' + index}>
                                <h2 className="col-12 text-center">{d.key}</h2>
                                <div className="col-12 text-center">
                                    <Chart circles={d.values} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    nestData(data) {
        return d3Collection.nest()
            .key(d => d.firstOrder)
            .key(d => d.secondOrder)
            .entries(data)
    }

    filterData(data, criteria = {}) {
        return data.filter(d => (
            isEmpty(criteria) || every(
                keys(criteria).map(k => (
                    every(criteria[k], ['checked', false]) || includes(criteria[k].filter(f => f.checked).map(f => f.name), d[k])
                ))
            )
        ))

    }

    generateState(data, criteria = {}) {
        return {
            firstFilter: sortBy(uniqBy(
                data.map(d => ({
                    name: d.firstFilter,
                    checked: false
                })),
                'name'
            ).map(f => ({
                name: f.name,
                checked: criteria.firstFilter ? includes(criteria.firstFilter.filter(f => f.checked).map(f => f.name), f.name) : f.checked
            })), 'name'),
            secondFilter: sortBy(uniqBy(
                data.map(d => ({
                    name: d.secondFilter,
                    checked: false
                })),
                'name'
            ).map(f => ({
                name: f.name,
                checked: criteria.secondFilter ? includes(criteria.secondFilter.filter(f => f.checked).map(f => f.name), f.name) : f.checked
            })), 'name')
        }
    }

    updateState(status) {
        this.setState(
            prevState => ({
                [status.filter]: prevState[status.filter].map(f => ({
                    name: f.name,
                    checked: status.name === f.name ? status.checked : f.checked
                }))
            })
        )
    }

    generateData(n) {
        let component = this
        return d3Array
            .range(n)
            .map(
                (n) => ({
                    "firstOrder": component.firstOrderCategories[Math.floor(Math.random() * component.firstOrderCategories.length)],
                    "secondOrder": component.secondOrderCategories[Math.floor(Math.random() * component.secondOrderCategories.length)],
                    "firstFilter": component.firstFilteredCategories[Math.floor(Math.random() * component.firstFilteredCategories.length)],
                    "secondFilter": component.secondFilteredCategories[Math.floor(Math.random() * component.secondFilteredCategories.length)],
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
