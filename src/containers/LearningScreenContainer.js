import { connect } from 'react-redux';
import Learning from '../screens/Learning';
import { setLearntPhrases, addLearntPhrases } from '../redux/actions/index';
import {
  categoriesRoot,
  categoryPhrasesRoot,
  currentCategoryName,
  learntPhrasesRoot,
  nativeLanguageRoot
} from '../redux/selectors';


function mapStateToProps(state) {
  return {
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    learntPhrases: learntPhrasesRoot(state),
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
  };
}
const mapDispatchToProps = {
  setLearntPhrases,
  addLearntPhrases,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
