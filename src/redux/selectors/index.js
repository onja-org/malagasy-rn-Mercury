import { createSelector } from 'reselect';

export const categoriesRoot = state => state.categories;
export const nativeLanguageRoot = state => state.nativeLanguage;
export const themeRoot = state => state.theme;
export const newPhrasesRoot = state => state.newPhrases;
export const categoryPhrasesRoot = state => {
  return state.categoryPhrases;
};
export const seenPhrasesRoot = state => state.seenPhrases;
export const randomPhrase = state => state.randomPhrase;
export const currentCategoryIdRoot = state => state.currentCategoryId;

export const currentCategory = createSelector(
  [currentCategoryIdRoot, categoriesRoot],
  (selectedCategoryId, allCategories) => {
    const selectedCategory = allCategories.find(
      cat => cat.id === selectedCategoryId,
    );
    return selectedCategory;
  },
);
export const currentCategoryPhrasesIds = createSelector(
  [currentCategory],
  selectedCategory => {
    return selectedCategory.phrasesIds;
  },
);
export const currentCategoryName = createSelector(
  [currentCategory, nativeLanguageRoot],
  (selectedCategory, language) => {
    const name = selectedCategory?.name?.[language];
    return name;
  },
);
export const learntPhrasesRoot = state => state.learntPhrases;
export const learntPhrasesCategoryRoot = state => state.learntPhrasesCategory;
