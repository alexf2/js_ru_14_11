import React, { Component, PropTypes } from 'react'

const isEmpty = str => {
    return !str || str.length === 0
} 

class NewCommentForm extends Component {
    state = {
        text: '',
        user: ''
    }

    handleChange = field => ev => {
        //if (ev.target.value.length > 5) return
        this.setState({
            [field]: ev.target.value
        })
    }

    handleSubmit = ev => {
        ev.preventDefault()
        console.log('---', 'adding comment')

        const {user, text} = this.state
        
        this.setState({noUserError: isEmpty(user)})
        this.setState({noCommentError: isEmpty(text)})        

        if (this.props.submitHandler && !isEmpty(user) && !isEmpty(text))
            this.props.submitHandler(this.state.user, this.state.text)

        this.setState({text: '', user: ''})
    }

    render() {
        const {noUserError, noCommentError} = this.state
        const errStyle = {color: 'red'}

        return (
            <form onSubmit = {this.handleSubmit}>
                comment: <input type="text" value={this.state.text} onChange = {this.handleChange('text')}/>
                user: <input type="text" value={this.state.user} onChange = {this.handleChange('user')}/>
                <input type = "submit"/>
                {noCommentError && <div style={errStyle}>Specify a comment</div>}
                {noUserError && <div style={errStyle}>Specify a user name</div>}
            </form>
        )
    }
}

export default NewCommentForm