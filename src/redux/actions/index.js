// // import all of the constants from contants folder
import {
  SET_CATEGORIES,
  SET_PHRASES,
  SET_LANGUAGE_NAME,
  SET_CURRENT_CATEGORY,
  SET_NEW_PHRASES,
  SET_LEARNT_PHRASES,
} from '../constants';

import {
  storeData,
  LEARNT_PHRASES_KEY,
  NEW_PHRASES_KEY,
  getData,
} from '../../utils/storage';

// categories actions
export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
}

export function setCurrentCategory(categoryId) {
  return {
    type: SET_CURRENT_CATEGORY,
    payload: categoryId,
  };
}

export function setPhrases(phrases) {
  return {
    type: SET_PHRASES,
    payload: phrases,
  };
}

export function setLanguageName(language) {
  return {
    type: SET_LANGUAGE_NAME,
    payload: language,
  };
}

export function setNewPhrases(phrases) {
  return {
    type: SET_NEW_PHRASES,
    payload: phrases,
  };
}

export function setLearntPhrases(learntPhrases) {
  return {
    type: SET_LEARNT_PHRASES,
    payload: learntPhrases,
  };
}

export function addNewPhrase(phrase) {
  return async dispatch => {
    const storedPhrases = await getData(NEW_PHRASES_KEY);
    // handle initial state
    let dataToStore = null;
    if (!storedPhrases) {
      dataToStore = [phrase];
    } else {
      dataToStore = [...storedPhrases, phrase];
    }
    await storeData(NEW_PHRASES_KEY, dataToStore);
    dispatch(setNewPhrases(dataToStore));
  };
}

export function addLearntPhrases(phrase) {
  return async dispatch => {
    const storedLearntPhrases = await getData(LEARNT_PHRASES_KEY);
    let dataToStore = null;
    if (!storedLearntPhrases) {
      dataToStore = [phrase];
    } else {
      dataToStore = [...storedLearntPhrases, phrase];
    }
    await storeData(LEARNT_PHRASES_KEY, dataToStore);
    dispatch(setLearntPhrases(dataToStore));
    return Promise.resolve();
  };
}

export function synchronizeStorageToRedux() {
  return async dispatch => {
    const storedPhrases = await getData(NEW_PHRASES_KEY);
    const storedLearntPhrase = await getData(LEARNT_PHRASES_KEY);
    if (!storedPhrases && !storedLearntPhrase) {
      return Promise.resolve();
    }
    dispatch(setNewPhrases(storedPhrases));
    dispatch(setLearntPhrases(storedLearntPhrase));
    return Promise.resolve();
  };
}
