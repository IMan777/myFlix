import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';

import './index.scss'; //Imports SCSS File

class MyFlixApplication extends React.Component{ //Will Be Displayed In HTML Page
    render(){
        return <MainView/>;
      }
 }

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);