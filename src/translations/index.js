import {LANGUAGE_NAMES} from '../data/dataUtils';

export const CATEGORY_HEADING = 'CATEGORY_HEADING';
export const CATEGORY_LIST = 'CATEGORY_LIST';
export const CATEGORY_SEEN_PHRASES_HEADING = 'CATEGORY_SEEN_PHRASES_HEADING';
export const CATEGORY_SEEN_PHRASES = 'CATEGORY_SEEN_PHRASES';
export const CATEGORY_LEARNT_PHRASES_HEADING = 'CATEGORY_LEARNT_PRASES_HEADING';
export const CATEGORY_LEARNT_PHRASES = 'CATEGORY_LEARNT_PHRASES';
export const CATEGORY_SUB_HEADING = 'CATEGORY_SUB_HEADING';
export const CATEGORY_ANSWER_CHOICES = 'CATEGORY_ANSWER_CHOICES';
export const CATEGORY_SUB_HEADING_CHOICES = 'CATEGORY_SUB_HEADING_CHOICES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const ADD_SECTION_HEADING_E_ENGLISH = 'ADD_SECTION_HEADING_ENGLISH';
export const ADD_ENTER_INPUTFIELD = 'ADD_ENTER_INPUTFIELD';
export const ADD_SECTION_HEADING_MALAGASY = 'ADD_SECTION_HEADING_MALAGASY';
export const ADD_BUTTON = 'ADD_BUTTON';

export const LANG_DATA = {
  [CATEGORY_HEADING]: {
    [LANGUAGE_NAMES.EN]: 'Category:',
    [LANGUAGE_NAMES.MG]: 'Sokajy: ',
  },
  [CATEGORY_LIST]: {
    [LANGUAGE_NAMES.EN]: 'Learn',
    [LANGUAGE_NAMES.MG]: 'Mianara ',
  },
  [CATEGORY_SEEN_PHRASES_HEADING]: {
    [LANGUAGE_NAMES.EN]: 'Seen phrases:',
    [LANGUAGE_NAMES.MG]: 'Ireo fehezan-teny efa hita:',
  },
  [CATEGORY_SEEN_PHRASES]: {
    [LANGUAGE_NAMES.EN]: '35 words and phrases',
    [LANGUAGE_NAMES.MG]: 'Fehezan-teny 35',
  },
  [CATEGORY_LEARNT_PHRASES_HEADING]: {
    [LANGUAGE_NAMES.EN]: 'Learnt phrases:',
    [LANGUAGE_NAMES.MG]: 'Ireo fehezan-teny efa hay:',
  },
  [CATEGORY_LEARNT_PHRASES]: {
    [LANGUAGE_NAMES.EN]: '10 words and phrases',
    [LANGUAGE_NAMES.MG]: 'Fehezan-teny 10 ',
  },

  [CATEGORY_SUB_HEADING]: {
    [LANGUAGE_NAMES.EN]: 'The phrase:',
    [LANGUAGE_NAMES.MG]: 'Ny fehezan-teny:',
  },
  [CATEGORY_SUB_HEADING_CHOICES]: {
    [LANGUAGE_NAMES.EN]: 'Pick a solution: ',
    [LANGUAGE_NAMES.MG]: 'Misafidiana valiny:',
  },
  [CATEGORY_ANSWER_CHOICES]: {
    [LANGUAGE_NAMES.EN]: 'Pick',
    [LANGUAGE_NAMES.MG]: 'Misafidiana',
  },
  [SELECT_CATEGORY]: {
    [LANGUAGE_NAMES.EN]: 'Select Category',
    [LANGUAGE_NAMES.MG]: 'Misafidiana sokajy',
  },
  [ADD_SECTION_HEADING_E_ENGLISH]: {
    [LANGUAGE_NAMES.EN]: 'The phrase in English:',
    [LANGUAGE_NAMES.MG]: "Fehezan-teny amin'ny teny English",
  },
  [ADD_SECTION_HEADING_MALAGASY]: {
    [LANGUAGE_NAMES.EN]: 'The phrase in Malagasy:',
    [LANGUAGE_NAMES.MG]: "Fehezan-teny amin'ny teny Malagasy",
  },
  [ADD_ENTER_INPUTFIELD]: {
    [LANGUAGE_NAMES.EN]: 'Enter here',
    [LANGUAGE_NAMES.MG]: 'Soraty eto',
  },

  [ADD_BUTTON]: {
    [LANGUAGE_NAMES.EN]: 'Add',
    [LANGUAGE_NAMES.MG]: 'Ampio',
  },
};
