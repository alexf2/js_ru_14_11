import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import Menu from '../components/Menu'
import MenuItem from '../components/Menu/MenuItem'


class Root extends Component {
    static propTypes = {

    };

    render() {
        //const commentsLink = `/comments/${store.getState().commentsPaginator.pageNumber}`

        return (
            <Provider store={store}>
                <div>
                    <Menu>
                        <MenuItem link = "/articles" name="Articles index"/>
                        <MenuItem link = "/filters" name="Filters"/>
                        <MenuItem link = "/counter" name="Counter"/>
                        <MenuItem link = "/comments" name="Paged Comments"/>
                    </Menu>
                    {this.props.children}
                </div>
            </Provider>
        )
    }
}

export default Root