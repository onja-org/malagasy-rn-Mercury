import {combineReducers} from 'redux';
// import all of constat case name for the swich
// in reducers
import {
  SET_CATEGORIES,
  SET_PHRASES,
  SET_LANGUAGE_NAME,
  SET_CURRENT_CATEGORY,
  SET_THEME,
  SET_LEARNT_PHRASES,
  SET_NEW_PHRASES,
  SET_SEEN_PHRASES,
} from '../constants';

import { LIGHT_THEME } from '../../ThemeColor/ThemeColor';
// categories reducer
function categories(state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}

// categories reducer
function currentCategoryId(state = '', action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}

// phrases reducer
function categoryPhrases(state = [], action) {
  switch (action.type) {
    case SET_PHRASES:
      return action.payload;
    default:
      return state;
  }
}

function nativeLanguage(state = '', action) {
  switch (action.type) {
    case SET_LANGUAGE_NAME:
      return action.payload;
    default:
      return state;
  }
}

const initialState = {
  theme: LIGHT_THEME,
};

function theme(state = initialState, action) {
  switch (action.type) {
    case SET_THEME:
      return action.payload;
    default:
      return state;
  }
}

function newPhrases(state = [], action) {
  switch (action.type) {
    case SET_NEW_PHRASES:
      return action.payload;
    default:
      return state;
  }
}
// seen phrases reducer
function seenPhrases(state = [], action) {
  switch (action.type) {
    case SET_SEEN_PHRASES:
      return action.payload;
    default:
      return state;
  }
}



function learntPhrases(state = [], action) {
  switch (action.type) {
    case SET_LEARNT_PHRASES:
      return action.payload;
    default:
      return state;
  }
}

// combine all of the reducers together
export default combineReducers({
  currentCategoryId,
  categories,
  categoryPhrases,
  nativeLanguage,
  theme,
  newPhrases,
  learntPhrases,
  seenPhrases,
});
