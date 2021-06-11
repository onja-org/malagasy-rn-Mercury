import { connect } from 'react-redux';
import Learning from '../screens/Learning';
import {
  setLearntPhrases,
  addLearntPhrases,
  setSeenPhrases,
  addSeenPhrase,
  setCategories,
  removeCorrectSeenPhrase,
  removeWrongLearntPhrase,
  setCurrentCategory,
  setTheme,
} from '../redux/actions/index';
import {
  categoryPhrasesRoot,
  currentCategoryName,
  themeRoot,
  categoriesRoot,
  learntPhrasesRoot,
  nativeLanguageRoot,
  seenPhrasesRoot,
  currentCategoryIdRoot
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    theme: themeRoot(state),
    learntPhrases: learntPhrasesRoot(state),
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    seenPhrases: seenPhrasesRoot(state),
    currentCategoryId: currentCategoryIdRoot(state),
  };
}

const mapDispatchToProps = {
  setLearntPhrases,
  addLearntPhrases,
  setSeenPhrases,
  addSeenPhrase,
  setTheme,
  setCategories,
  setCurrentCategory,
  removeCorrectSeenPhrase,
  removeWrongLearntPhrase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
