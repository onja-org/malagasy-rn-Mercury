import {connect} from 'react-redux';
import Adding from '../screens/Adding';
import {categoryPhrasesRoot, currentCategoryName} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
  };
}
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Adding);
