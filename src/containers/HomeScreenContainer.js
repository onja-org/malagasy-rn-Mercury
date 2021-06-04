import { connect } from 'react-redux';
import Home from '../screens/Home';

import {
  setCategories,
  setCurrentCategory,
  setPhrases,
  synchronizeStorageToRedux,
  setLearntPhrases,
  addLearntPhrase,
  setLanguageName,
} from '../redux/actions';

import {
  nativeLanguageRoot,
  newPhrasesRoot,
  categoriesRoot,
  learntPhrasesRoot,
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    newPhrases: newPhrasesRoot(state),
    learntPhrases: learntPhrasesRoot(state),
  };
}
const mapDispatchToProps = {
  setCategories,
  setCurrentCategory,
  setPhrases,
  setLearntPhrases,
  addLearntPhrase,
  setLanguageName,
  synchronizeStorageToRedux,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
