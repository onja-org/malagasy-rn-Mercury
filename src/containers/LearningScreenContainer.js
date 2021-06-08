import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {
  categoryPhrasesRoot,
  currentCategoryName,
  themeRoot,
  categoriesRoot,
  learntPhrasesRoot,
  nativeLanguageRoot,
} from '../redux/selectors';

import {setTheme, addLearntPhrases} from '../redux/actions';

function mapStateToProps(state) {
  return {
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    theme: themeRoot(state),
    learntPhrases: learntPhrasesRoot(state),
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
  };
}

const mapDispatchToProps = {
  setTheme,
  addLearntPhrases,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
