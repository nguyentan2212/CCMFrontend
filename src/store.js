import { createStore } from 'redux'
import { getToken } from './js/localStorageToken';

const initialState = {
  sidebarShow: 'responsive',
  user: getToken(),
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store