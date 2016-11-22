import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../decorators/toggleOpen'

const commentList = (props) => {
    
    const getButton = () => {
        const { comments, isOpen, toggleOpenCallback } = props
        
        return ( 
            (!comments || !comments.length) ? 
                <span>No comments yet</span>:
                <a href="#" onClick = {toggleOpenCallback}>{isOpen ? 'hide' : 'show'} comments</a>
        )
    }

    const getList = () => {
        const { comments, isOpen } = props

        if (!isOpen || !comments || !comments.length) 
            return null

        const commentItems = comments.map(comment => <li key = {comment.id}><Comment comment = {comment} /></li>)
        return (
            <ul>{commentItems}</ul>
        )
    }

    
    return (
        <div>
            {getButton()}
            {getList()}
        </div>
    )
}

commentList.propTypes = {
    comments: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,

                title: PropTypes.string,
                user: PropTypes.string.isRequired,
                text: PropTypes.isRequired
            })
        ),

    isOpen: PropTypes.bool.isRequired,
    toggleOpenCallback: PropTypes.func.isRequired    
}

export default toggleOpen(commentList)