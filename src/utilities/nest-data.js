import { nest } from 'd3-collection'

export default function nestData(data, nesting = []) {
    let nestedData = nest()
    nesting.forEach(n => nestedData.key(d => d[n]))
    return nestedData.entries(data)
}

