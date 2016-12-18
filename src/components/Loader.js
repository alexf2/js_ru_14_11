import React, { PropTypes } from 'react'

class Loader extends React.Component {

    static contextTypes = {
        localizer: PropTypes.object
    }

    render()  {
        const {localizer: {localize}} = this.context

        return <h2>{localize("Loading...")}</h2>
    }
}

Loader.propTypes = {
}

export default Loader