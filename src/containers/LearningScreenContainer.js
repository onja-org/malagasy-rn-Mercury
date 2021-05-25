import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {
  setLearntPhrases,
  addLearntPhrase,
  setLearntPhrasesCategory,
} from '../redux/actions/index';
import {
  categoriesRoot,
  categoryPhrasesRoot,
  currentCategoryName,
  learntPhrasesRoot,
  learntPhrasesCategoryRoot,
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    learntPhrases: learntPhrasesRoot(state),
    categories: categoriesRoot(state),
    learntPhrasesCategory: learntPhrasesCategoryRoot(state),
  };
}
const mapDispatchToProps = {
  setLearntPhrases,
  addLearntPhrase,
  setLearntPhrasesCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
