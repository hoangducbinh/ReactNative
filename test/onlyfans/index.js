// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


/**
 * @format
 */
import * as React from 'react';
import {AppRegistry,LogBox} from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store from './app/Redux/Store'



const provider = () =>{
   
    return(
        <Provider store={store} >
            <App />
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => provider);