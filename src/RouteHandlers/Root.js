import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import Menu from '../components/Menu'
import MenuItem from '../components/Menu/MenuItem'
import LangSelector from '../components/LangSelector'
import { changeLanguage } from '../AC/global'
import {LocalizeHelper} from '../utils'


class Root extends Component {
    static propTypes = {

    };

    state = {
        username: '',
        localizer: new LocalizeHelper(store.getState().localization.langTranslations, store.getState().localization.languageCode)
    }

    static childContextTypes = {
        username: PropTypes.string,
        localizer: PropTypes.object
    }

    getChildContext() {
        return {
            username: this.state.username,
            localizer: this.state.localizer
        }
    }    

    langChanged = (langCode, stringMap) => {
        this.setState({localizer: new LocalizeHelper(stringMap, langCode)})
    }

    componentDidMount () {
        store.dispatch(changeLanguage(store.getState().localization.languageCode))
    }

    static langs = [
            {code: 'en', displayName: 'English'},
            {code: 'ru', displayName: 'Русский'},
            {code: 'sk', displayName: 'Slovenčina'},
            {code: 'uk', displayName: 'Українська'}
        ]

    render() {

        const {localizer: {localize}} = this.state
        
        return (
            <Provider store={store}>
                <div>
                    {localize("username:")} <input value = {this.state.username} onChange={this.handleUserChange}/>&nbsp;&nbsp;
                    <LangSelector languages = {Root.langs} changed = {this.langChanged} />
                    <Menu>
                        <MenuItem link = "/articles" name={localize("Articles index")}/>
                        <MenuItem link = "/filters" name={localize("Filters")}/>
                        <MenuItem link = "/counter" name={localize("Counter")}/>
                        <MenuItem link = "/comments/1" name={localize("Comments")}/>
                    </Menu>
                    {this.props.children}
                </div>
            </Provider>
        )
    }

    handleUserChange = (ev) => {
        this.setState({
            username: ev.target.value
        })
    }
}

export default Root