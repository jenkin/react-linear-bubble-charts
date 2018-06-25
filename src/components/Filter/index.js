import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Filter extends Component {

    prefix = Math.random().toString().replace('.','')

    onChange(f,n,c) {
        this.props.onChange({
            filter: f,
            name: n,
            checked: c
        })
    }

    render() {

        let component = this

        return (
            <div>
                <h2>{component.props.title}</h2>
                {component.props.items.map((f, index) => (
                    <p key={`p-${component.prefix}-${index}`}>
                        <input
                            id={`f-${component.prefix}-${index}`}
                            type="checkbox"
                            defaultChecked={f.checked}
                            onChange={e => ::component.onChange(component.props.title, f.name, e.target.checked)}
                        />&nbsp;<label htmlFor={`f-${component.prefix}-${index}`}>{f.name}</label>
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
