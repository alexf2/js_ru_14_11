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
        //да: ни Object.assign ни спрэд не нужны: они выполняют shallow copy, тоже самое делает и setState
        this.setState( (prevState) => ({openItemId: prevState.openItemId === id ? null:id}) )
    }
}
