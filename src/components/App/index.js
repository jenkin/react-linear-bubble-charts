import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FacetedSearch from '../FacetedSearch'
import { generateData, generateDataDeferred, generateDataAsync } from '../../utilities/generate-data'

import './index.scss'

export default class App extends Component {

    state = {}

    // Async method
    async componentDidMount() {
        this.setState({
            data: await generateDataDeferred(this.props.n)
        })
    }

    // Sync method using promise
    /*
    componentDidMount() {
        generateDataAsync(this.props.n).then((data) => {
            this.setState({
                data: data
            })
        })
    }
    */

    render() {
        return (
            <FacetedSearch
                data={this.state.data}
                filtering={["firstFilter", "secondFilter", "thirdFilter"]}
                nesting={["firstOrder", "secondOrder"]}
            />
        )
    }
}

App.propTypes = {
    n: PropTypes.number,
}

App.defaultProps = {
    n: 250,
}
