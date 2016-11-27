
import React, { Component} from 'react'

class CommentPoster extends Component {
    state = {name: '', comment: ''}

    changeHandler = (ev) => {        
        let val = ev.target.value

        if (ev.target.id === 'Name')
            this.setState(() => ({name: val}))
        else
            this.setState(() => ({comment: val}))        
    }

    render() {
        return (
            <div>
                <div className='commentFormContainer'>
                    <div className='formGroup'>
                        <input onChange={this.changeHandler} name="Name" id="Name" size="50" className="formControl required" placeholder="Your Name*" type="text" data-val="true" data-val-minlength="Your Name should not be shorter than 5 characters" data-val-minlength-min="5" data-val-required="Your Name is missing"  aria-required="true" value={this.state.name} />
                    </div>

                    <div className='formGroup'>
                        <textarea onChange={this.changeHandler} className="formControl required" rows="6" name="Comment" id="Message" placeholder="Your Message*" data-val="true" data-val-minlength="Your Message should not be shorter than 10 characters" data-val-minlength-min="10" data-val-required="The message is empty" aria-required="true" value={this.state.comment}></textarea>
                    </div>

                    <div className='formGroup'>
                        <button type="button" className="btn">Post the comment</button>
                    </div>                
                </div>
                <div className='clear' />
            </div>
        )
    }
}

export default CommentPoster
