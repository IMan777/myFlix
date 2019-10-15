import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import  MainView  from './components/main-view/main-view';
import moviesApp from './reducers/reducers';


import './index.scss'; //Imports SCSS File

const store = createStore(moviesApp);

class MyFlixApplication extends React.Component{ //Will Be Displayed In HTML Page
    render(){
        return (
        <Provider store ={store}>
          <MainView/>
       </Provider>  
       );  
    }
 }

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);


