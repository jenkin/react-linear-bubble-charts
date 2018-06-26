import { every, keys, values, includes, isEmpty } from 'lodash-es'

export default function filterData(data, criteria = {}) {
    return data.filter(d => (
        isEmpty(criteria) || every(
            keys(criteria).map(k => (
                every(values(criteria[k]), ['checked', false]) || includes(values(criteria[k]).filter(f => f.checked).map(f => f.name), d[k])
            ))
        )
    ))

}

