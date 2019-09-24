import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss'; //Imports SCSS File

class MyFlixApplication extends React.Component{ //Will Be Displayed In HTML Page
    render(){
        return (
        <div className="my-flix">
            <div>Good Morning!</div>
        </div>
        );
    }
 

}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);