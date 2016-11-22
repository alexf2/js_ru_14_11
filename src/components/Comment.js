import React, { PropTypes } from 'react'


function Comment(props) {
    const { title, text, user } = props.comment
    const header = title && <h4>{title}</h4>
    
    return (
        <div className='comment'>
            {header}
            <p>{text} <b>by {user}</b></p>
        </div>
    )
}

Comment.propTypes = {    
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        user: PropTypes.string.isRequired,
        text: PropTypes.isRequired        
}

export default Comment