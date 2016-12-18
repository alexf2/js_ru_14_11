import React, { Component, PropTypes } from 'react'

class NewCommentForm extends Component {
    state = {
        text: '',
        user: ''
    }

    static contextTypes = {
        localizer: PropTypes.object
    }

    handleChange = field => ev => {
        if (ev.target.value.length > 5) return
        this.setState({
            [field]: ev.target.value
        })
    }

    handleSubmit = ev => {
        ev.preventDefault()
        this.props.addComment(this.state, this.props.articleId)
        this.setState({
            user: '',
            text: ''
        })
    }

    render() {
        const {localizer: {localize}} = this.context

        return (
            <form onSubmit = {this.handleSubmit}>
                {localize("comment")}: <input type="text" value={this.state.text} onChange = {this.handleChange('text')}/>
                {localize("user")}: <input type="text" value={this.state.user} onChange = {this.handleChange('user')}/>
                <input type = "submit" value={localize("Submit")} />
            </form>
        )
    }
}

export default NewCommentForm