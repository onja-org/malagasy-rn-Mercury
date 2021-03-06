const categoriesData = require('./categories.json');
const phrasesData = require('./phrases.json');

export const LANGUAGE_NAMES = {
  MG: 'mg',
  EN: 'en',
};

/// API exposed - we are using async to be ready for external source of data

export const getAllCategories = async () => {
  return Promise.resolve(categoriesData.categories);
};

export const getPhrasesForCategoryId = async catId => {
  const phrasesIds = getPhraseIdsForCategory(catId);

  const allPhrases = getAllPhrases();
  const selectedPhrases = allPhrases.filter(phrase =>
    phrasesIds.includes(phrase.id),
  );
  return Promise.resolve(selectedPhrases);
};

///// helper functions - do not use directly from the app
export const getAllCategoriesNames = lang => {
  return categoriesData.categories.map(cat => cat.name[lang]);
};

export const getAllCategoriesIds = () => {
  return categoriesData.categories.map(cat => cat.id);
};

export const getPhraseIdsForCategory = catId => {
  const category = categoriesData.categories.find(cat => cat.id === catId);
  return (category && category.phrasesIds) || null;
};

export const getAllPhrases = () => {
  return phrasesData.phrases;
};

export const findPhraseCategories = phraseId => {
  return phrasesData.phrases;
};

export function findCategoryById(id) {
  throw 'not implemented!';
  // TODO implement
}
export function findPhraseById(id) {
  throw 'not implemented!';
  // TODO implement
}
