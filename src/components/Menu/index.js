import React, { Component, PropTypes } from 'react'

class Menu extends Component {
    static propTypes = {

    }

    static contextTypes = {
        localizer: PropTypes.object
    }

    render() {
        const {localizer: {localize}} = this.context

        return (
            <div>
                <h3>{localize('Choose menu item:')}</h3>
                <section>
                    {this.props.children}
                </section>
            </div>
        )
    }
}

export default Menu