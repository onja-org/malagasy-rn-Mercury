import {connect} from 'react-redux';
import Adding from '../screens/AddNewTerm';
import {categoriesRoot, nativeLanguageRoot} from '../redux/selectors';
import {addNewPhrase} from '../redux/actions';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
  };
}
const mapDispatchToProps = {
  addNewPhrase
};

export default connect(mapStateToProps, mapDispatchToProps)(Adding);
