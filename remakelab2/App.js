import React from 'react';


import DrawerNavigator from './contact-list/4/routes';
import { Provider } from 'react-redux';
import store from './contact-list/4/store';

function App () {
    return (
        <Provider store={store}>
            <DrawerNavigator />
        </Provider>

    );
}

export default App;
