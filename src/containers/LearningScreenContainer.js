import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {addLearntPhrases} from '../redux/actions/index';
import {
  categoriesRoot,
  categoryPhrasesRoot,
  currentCategoryName,
  learntPhrasesRoot,
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    learntPhrases: learntPhrasesRoot(state),
    categories: categoriesRoot(state),
  };
}
const mapDispatchToProps = {
  addLearntPhrases,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
