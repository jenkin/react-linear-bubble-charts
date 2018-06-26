import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Filter extends Component {

    prefix = Math.random().toString().replace('.','')

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
                            defaultChecked={!!f.checked}
                            //disabled={!f.count}
                            onChange={
                                e => component.props.onChange({
                                    filter: component.props.title,
                                    name: f.name,
                                    checked: e.target.checked
                                })
                            }
                        />&nbsp;<label htmlFor={`f-${component.prefix}-${index}`}>{`${f.name} (${f.count||0})`}</label>
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
