// // import all of the constants from contants folder
import {
  SET_CATEGORIES,
  SET_PHRASES,
  SET_LANGUAGE_NAME,
  SET_CURRENT_CATEGORY,
  SET_LEARNT_PHRASES,
  SET_LEARNT_PHRASES_CATEGORY,
} from '../constants';

import {storeData, LEARNT_PHRASES_KEY, getData} from '../../utils/localStorage';

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

export function setLearntPhrases(learntPhrases) {
  return {
    type: SET_LEARNT_PHRASES,
    payload: learntPhrases,
  };
}

export function setLearntPhrasesCategory(category) {
  return {
    type: SET_LEARNT_PHRASES_CATEGORY,
    payload: category,
  };
}

export function addLearntPhrase(phrase) {
  return async dispatch => {
    const storedLearntPhrases = await getData(LEARNT_PHRASES_KEY);
    let dataToStore = null;
    if (!storedLearntPhrases) {
      dataToStore = [phrase];
    } else {
      const filterEmptyArray = [...storedLearntPhrases, phrase].filter(
        item => item.id,
      );
      dataToStore = filterEmptyArray;
    }
    await storeData(LEARNT_PHRASES_KEY, dataToStore);
    dispatch(setLearntPhrases(dataToStore));
    return Promise.resolve();
  };
}

export const synchronizeStorageToRedux = () => {
  return async dispatch => {
    const storedLearntPhrase = await getData(LEARNT_PHRASES_KEY);
    if (!storedLearntPhrase) {
      return Promise.resolve();
    }
    dispatch(setLearntPhrases(storedLearntPhrase));
    return Promise.resolve();
  };
};
