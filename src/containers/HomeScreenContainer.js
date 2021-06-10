import { connect } from 'react-redux';
import Home from '../screens/Home';

import {
  setCurrentCategory,
  setPhrases,
  setTheme,
  setCategories,
  setLearntPhrases,
  addLearntPhrases,
  synchronizeStorageToRedux,
  setLanguageName,
  getCategoriesAndUpdateRedux,
<<<<<<< HEAD
  setCombinedPhrases,
=======
  setCombinedPhrases
>>>>>>> feat(Redux action): refactoring into asynchronous (#19)
} from '../redux/actions';

import {
  categoriesRoot,
  nativeLanguageRoot,
  newPhrasesRoot,
  themeRoot,
  learntPhrasesRoot,
  seenPhrasesRoot,
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    theme: themeRoot(state),
    newPhrases: newPhrasesRoot(state),
    learntPhrases: learntPhrasesRoot(state),
    seenPhrases: seenPhrasesRoot(state),
  };
}
const mapDispatchToProps = {
  setCurrentCategory,
  setPhrases,
  setTheme,
  setCategories,
  setLearntPhrases,
  addLearntPhrases,
  setLanguageName,
  synchronizeStorageToRedux,
  getCategoriesAndUpdateRedux,
  setCombinedPhrases,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
