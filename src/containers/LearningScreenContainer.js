import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {
  setLearntPhrases,
  addLearntPhrases,
  setSeenPhrases,
  addSeenPhrase,
  setCategories,
  removeCorrectSeenPhrase,
  removeWrongLearntPhrase,
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
  };
}

const mapDispatchToProps = {
  setLearntPhrases,
  addLearntPhrases,
  setSeenPhrases,
  addSeenPhrase,
  setTheme,
  setCategories,
  removeCorrectSeenPhrase,
  removeWrongLearntPhrase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
