import {connect} from 'react-redux';
import Home from '../screens/Home';

import {
  setCategories,
  setCurrentCategory,
  setPhrases,
  setTheme,
  setLearntPhrases,
  addLearntPhrases,
  synchronizeStorageToRedux,
  setLanguageName,
} from '../redux/actions';

import {
  categoriesRoot,
  nativeLanguageRoot,
  newPhrasesRoot,
  themeRoot,
  learntPhrasesRoot,
  seenPhrasesRoot
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
  setCategories,
  setCurrentCategory,
  setPhrases,
  setTheme,
  setLearntPhrases,
  addLearntPhrases,
  setLanguageName,
  synchronizeStorageToRedux,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
