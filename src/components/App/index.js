import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from '../Chart'
import Filter from '../Filter'
import * as d3Array from 'd3-array'
import * as d3Collection from 'd3-collection'
import { uniqBy, every, keys, values, includes, isEmpty, keyBy, assign, sortBy } from 'lodash'
import './index.scss'

export default class App extends Component {

    firstOrderCategories = ["Morocco", "Venezuela", "Congo", "Italy", "Puerto Rico", "Sri Lanka", "Poland", "Malaysia", "Seychelles", "Réunion", "Ukraine", "Afghanistan", "Libya", "New Zealand", "Mauritius"]
    secondOrderCategories = ["Golf", "Volleyball", "Swimming", "Badminton", "Gynastics", "Rugby", "Ice Hockey", "Rowing", "Fencing", "Surfing"]
    firstFilteredCategories = ["computer", "lamp shade", "drill press", "bananas", "tomato", "ipod"]
    secondFilteredCategories = ["thermostat", "couch", "lotion", "slipper", "key chain", "glass"]

    originalData = this.generateData(this.props.n)

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
                                <Filter
                                    title="firstFilter"
                                    items={
                                        sortBy(
                                            values(filters.firstFilter).map(f => assign(f, { count: filteredData.filter(d => d.firstFilter === f.name).length })),
                                            'name'
                                        )
                                    }
                                    onChange={::component.updateState}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Filter
                                    title="secondFilter"
                                    items={
                                        sortBy(
                                            values(filters.secondFilter).map(f => assign(f, { count: filteredData.filter(d => d.secondFilter === f.name).length })),
                                            'name'
                                        )
                                    }
                                    onChange={::component.updateState}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        {sortBy(nestedData,'key').map((d, index) => (
                            <div className="row" key={'d-' + index}>
                                <h2 className="col-12 text-center">{d.key}</h2>
                                <div className="col-12 text-center">
                                    <Chart circles={sortBy(d.values,'key')} />
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
                    every(values(criteria[k]), ['checked',false]) || includes(values(criteria[k]).filter(f => f.checked).map(f => f.name), d[k])
                ))
            )
        ))

    }

    generateState(data, defaultState = {}) {
        return {
            firstFilter: assign(defaultState.firstFilter, keyBy(uniqBy(
                data.map(d => ({
                    name: d.firstFilter,
                    checked: false
                })),
                'name'
            ).map(f => ({
                name: f.name,
                checked: defaultState.firstFilter ? includes(values(defaultState.firstFilter).filter(f => f.checked).map(f => f.name), f.name) : f.checked
            })), 'name')),
            secondFilter: assign(defaultState.secondFilter, keyBy(uniqBy(
                data.map(d => ({
                    name: d.secondFilter,
                    checked: false
                })),
                'name'
            ).map(f => ({
                name: f.name,
                checked: defaultState.secondFilter ? includes(values(defaultState.secondFilter).filter(f => f.checked).map(f => f.name), f.name) : f.checked
            })), 'name'))
        }
    }

    updateState(status) {
        this.setState(
            prevState => ({
                [status.filter]: assign(
                    prevState[status.filter],
                    {
                        [status.name]: {
                            name: status.name,
                            checked: status.checked
                        }
                    }
                )
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
    n: 100,
}
