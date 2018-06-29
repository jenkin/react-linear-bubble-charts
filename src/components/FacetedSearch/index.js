import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { values, assign, sortBy, isEmpty } from 'lodash-es'

import Chart from '../Chart'
import Filter from '../Filter'

import filterData from '../../utilities/filter-data'
import nestData from '../../utilities/nest-data'
import generateAppState from '../../utilities/generate-app-state'

import './index.scss'

export default class FacetedSearch extends Component {

    state = generateAppState(
        this.props.data,
        this.props.filtering
    )

    render() {

        let component = this,
            filteredData = filterData(
                component.props.data,
                component.state
            ),
            nestedData = nestData(
                filteredData,
                component.props.nesting
            ),
            filters = generateAppState(
                filteredData,
                component.props.filtering,
                component.state
            )

        if(isEmpty(this.props.data)) {
            return (
                <div className="container">
                    <div className="row justify-content-center">
                        <p>Loading...</p>
                    </div>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        {component.props.filtering.map((filterName, index) => (
                            <div className="row" key={'f-'+index}>
                                <div className="col-12">
                                    <Filter
                                        title={filterName}
                                        items={
                                            sortBy(
                                                values(filters[filterName]).map(f => assign(f, { count: filteredData.filter(d => d[filterName] === f.name).length })),
                                                'name'
                                            )
                                        }
                                        onChange={::component.updateState}
                                    />
                                </div>
                            </div>
                        ))}
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

}

FacetedSearch.propTypes = {
    data: PropTypes.array,
    filtering: PropTypes.array,
    nesting: PropTypes.array,
}

FacetedSearch.defaultProps = {
    data: [],
    filtering: [],
    nesting: [],
}
