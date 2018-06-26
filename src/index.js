import React from 'react'
import { render } from 'react-dom'

import App from './components/App'

import generateData from './utilities/generate-data'

render(
    <App
        data={generateData(250)}
        filtering={["firstFilter","secondFilter","thirdFilter"]}
        nesting={["firstOrder","secondOrder"]}
    />,
    document.getElementById('react-root')
)
