import React, { Component, PropTypes } from 'react'

class ArticleIndexPage extends Component {
    static propTypes = {

    };

    static contextTypes = {
        localizer: PropTypes.object
    }

    render() {
        const {localizer: {localize}} = this.context

        return (
            <h1>
                {localize("Choose your article")}
            </h1>
        )
    }
}

export default ArticleIndexPage