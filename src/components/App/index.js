import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Chart from '../Chart'
import './index.scss'

export default class App extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    {Array(this.props.n).fill().map((item, index) => (
                        <div className="col-6 text-center" key={'d'+index}>
                            <Chart n={3}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

App.propTypes = {
    n: PropTypes.number,
}

App.defaultProps = {
    n: 1,
}
