import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { changeLanguage } from '../AC/global'

class LangSelector extends Component {

    static propTypes = {
        langCode: PropTypes.string,
        languages: React.PropTypes.arrayOf(PropTypes.shape({code: PropTypes.string, displayName: PropTypes.string})),
        maxWidth: PropTypes.string
    }

    static defaultProps = {
        langCode: 'en',
        languages: [{code: 'en', displayName: 'English'}],
        maxWidth: '200px'
    }

    handleChange = selectItem => {        
        this.props.changeLanguage(selectItem.value)
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.changed && nextProps.loadStatus === 2 && this.props.loadStatus !== 2)
            this.props.changed(nextProps.langCode, nextProps.stringMap)
    }

    localize = str => {
        const {langCode, stringMap} = this.props
        if (langCode === 'en')
            return str
        
        return stringMap[ str ] || str
    }

    render() {
        const {langCode, languages, maxWidth} = this.props

        const options = languages.map( item => ({label: item.displayName, value: item.code}) )

        return (
            <div style={{display: 'inline-block', maxWidth}}>
                <label htmlFor = "langSelector">Select a language:</label>
                <Select id = 'langSelector'
                    options = {options}
                    value = {langCode}
                    multi = {false}
                    onChange = {this.handleChange}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        langCode: state.localization.languageCode,
        stringMap: state.localization.langTranslations,
        loadStatus: state.localization.loadStatus
    }), 
    {changeLanguage},
    null,
    {pure: true}) (LangSelector)
