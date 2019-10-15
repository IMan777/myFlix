export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_LOGIN = 'SET_LOGIN';
export const SET_SORT = 'SET_SORT';

export function setMovies (value){
    return { type: SET_MOVIES, value};
}

export function setFilter(value){
    return { type: SET_FILTER,value};
}

export function setLogin(value){
    return { type: SET_LOGIN,value};
}

export function setSort(value){
    return { type: SET_SORT,value};
}