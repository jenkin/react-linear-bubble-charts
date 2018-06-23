import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Filter extends Component {

    render() {

        return (
            <div>
                <h2>{this.props.title}</h2>
                {this.props.items.map((f, index) => (
                    <p key={'f-' + index}>
                        <input id={'f-' + index} type="checkbox" />&nbsp;<label htmlFor={'f-' + index}>{f}</label>
                    </p>
                ))}
            </div>
        )

    }
}

Filter.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
}

Filter.defaultProps = {
    title: "Filter",
    items: [],
}
