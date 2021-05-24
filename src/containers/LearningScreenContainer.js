import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {
  setLearntPhrases,
  addLearntPhrase,
  setLearntPhrasesCategory,
} from '../redux/actions/index';
import {categoryPhrasesRoot, currentCategoryName} from '../redux/selectors';

function mapStateToProps(state) {
  console.log(state);
  return {
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    learntPhrases: state.learntPhrases,
    categories: state.categories,
    learntPhrasesCategory: state.learntPhrasesCategory,
  };
}
const mapDispatchToProps = {
  setLearntPhrases,
  addLearntPhrase,
  setLearntPhrasesCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
