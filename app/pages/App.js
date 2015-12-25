import React, { Component, NavigatorIOS } from 'react-native';
import { Provider } from '../../node_modules/react-redux/lib/index';
import store from '../store/index';

import Instagram from '../handlers/App';

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Instagram />
            </Provider>
        );
    }
}

module.exports = App;
