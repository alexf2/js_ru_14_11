import React, { Component, PropTypes } from 'react'
import CommentsPaginator from '../components/CommentsPaginator'

class CommentRoot extends Component {
    static propTypes = {

    };

    static contextTypes = {
        localizer: PropTypes.object
    }

    render() {
        const {localizer: {localize}} = this.context

        return (
            <div>
                <h1>{localize("Comments pagination")}</h1>
                {this.props.children}
                <CommentsPaginator />
            </div>
        )
    }
}

export default CommentRoot