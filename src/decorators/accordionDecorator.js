import React from 'react'

export default (Component) => class AccordionDecorator extends React.Component {

    constructor() {
        super()
        this.state = {openItemId: null}
    }

    render() {
        return <Component {...this.props} {...this.state} openItemCallback = {this.openItem} />
    }

    openItem = id => ev => {
        //это лишнее: я говорил на первом уроке, что setState мерджит сам
        this.setState( (prevState) => 
            ({...prevState, 
                openItemId: prevState.openItemId === id ? null:id}) 
        )
    }
}
