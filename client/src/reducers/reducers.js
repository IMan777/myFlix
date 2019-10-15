import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES , SET_SORT ,SET_LOGIN } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}
function userLogin(state = [], action) {
  switch (action.type) {
    case SET_LOGIN:
      return action.value;
    default:
      return state;
  }
}

function sortMovies(state = 'Title', action) {
  switch (action.type) {
    case SET_SORT:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userLogin,
  sortMovies
});

export default moviesApp;