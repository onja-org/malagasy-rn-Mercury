// // import all of the constants from contants folder
import {
  SET_CATEGORIES,
  SET_PHRASES,
  SET_LANGUAGE_NAME,
  SET_CURRENT_CATEGORY,
  SET_THEME,
  SET_NEW_PHRASES,
  SET_LEARNT_PHRASES,
  SET_SEEN_PHRASES,
} from '../constants';
import { getPhrasesForCategoryId, getAllCategories } from '../../data/dataUtils';
import {
  storeData,
  LEARNT_PHRASES_KEY,
  NEW_PHRASES_KEY,
  SEEN_PHRASES_KEY,
  getData,
} from '../../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export function setSeenPhrases(phrase) {
  return {
    type: SET_SEEN_PHRASES,
    payload: phrase,
  };
}

export function setTheme(theme) {
  return {
    type: SET_THEME,
    payload: theme,
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

export function addSeenPhrase(phrase) {
  return async dispatch => {
    const storedSeenPhrase = await getData(SEEN_PHRASES_KEY);
    let dataToStore = null;
    if (!storedSeenPhrase) {
      dataToStore = [phrase];
    } else {
      dataToStore = [...storedSeenPhrase, phrase];
    }
    await storeData(SEEN_PHRASES_KEY, dataToStore);
    dispatch(setSeenPhrases(dataToStore));
    return Promise.resolve();
  };
}

export function removeCorrectSeenPhrase(phrase) {
  return async dispatch => {
    const storedSeenPhrase = await getData(SEEN_PHRASES_KEY);
    let dataToStore = storedSeenPhrase.filter(phr => phr.id !== phrase.id);
    await storeData(SEEN_PHRASES_KEY, dataToStore);

    dispatch(setSeenPhrases(dataToStore));
    return Promise.resolve();
  };
}

export function removeWrongLearntPhrase(phrase) {
  return async dispatch => {
    const storedLearntPhrase = await getData(LEARNT_PHRASES_KEY);
    let dataToStore = storedLearntPhrase.filter(phr => phr.id !== phrase.id);
    await storeData(LEARNT_PHRASES_KEY, dataToStore);

    dispatch(setLearntPhrases(dataToStore));
    return Promise.resolve();
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
    const storedUserPhrases = await getData(NEW_PHRASES_KEY);
    const storedLearntPhrase = await getData(LEARNT_PHRASES_KEY);
    const storedSeenPhrases = await getData(SEEN_PHRASES_KEY);
    if (storedUserPhrases) {
      dispatch(setNewPhrases(storedUserPhrases));
    }
    if (storedLearntPhrase) {
      dispatch(setLearntPhrases(storedLearntPhrase));
    }
    if (storedSeenPhrases) {
      dispatch(setSeenPhrases(storedSeenPhrases));
    }
    return Promise.resolve();
  };
}

export function getCategoriesAndUpdateRedux() {
  return async dispatch => {
    const categories = await getAllCategories();
    dispatch(setCategories(categories));
    return Promise.resolve();
  };
}


export function setCombinedPhrases(
  userPhrasesForCategory,
  categoryId,
  navigateToLearn,
) {

export function getCategoriesAndUpdateRedux() {
  return async dispatch => {
    const categories = await getAllCategories();
    dispatch(setCategories(categories));
    return Promise.resolve();
  }

}
  
export function setCombinedPhrases(userPhrasesForCategory, categoryId, navigateToLearn) {
  return async dispatch => {
    const phrasesForCategory = await getPhrasesForCategoryId(categoryId);
    const combinedPhrasesForCategory = [
      ...phrasesForCategory,
      ...userPhrasesForCategory,
    ];

    dispatch(setPhrases(combinedPhrasesForCategory));
    navigateToLearn();
    return Promise.resolve();
  }

}

