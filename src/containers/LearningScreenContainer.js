import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {setLearntPhrases} from '../redux/actions/index';
import {categoryPhrasesRoot, currentCategoryName} from '../redux/selectors';

function mapStateToProps(state) {
  console.log(state);
  return {
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    learntPhrases: state.learntPhrases,
  };
}
const mapDispatchToProps = {setLearntPhrases};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
