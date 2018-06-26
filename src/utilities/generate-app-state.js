import { uniqBy, values, includes, keyBy, assign, fromPairs } from 'lodash-es'

export default function generateState(data, filtering = [], defaultState = {}) {
    return fromPairs(filtering.map(filterName => ([
        filterName,
        assign(defaultState[filterName], keyBy(uniqBy(
            data.map(d => ({
                filter: filterName,
                name: d[filterName],
                checked: false
            })),
            'name'
        ).map(f => ({
            filter: f.filter,
            name: f.name,
            checked: defaultState[filterName] ? includes(values(defaultState[filterName]).filter(f => f.checked).map(f => f.name), f.name) : f.checked
        })), 'name'))
    ])))
}

