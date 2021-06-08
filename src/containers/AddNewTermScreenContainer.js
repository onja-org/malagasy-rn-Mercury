import { connect } from 'react-redux';
import Adding from '../screens/AddNewTerm';
import {
  categoriesRoot,
  nativeLanguageRoot,
  themeRoot,
} from '../redux/selectors';
import { addNewPhrase, setTheme } from '../redux/actions';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    theme: themeRoot(state),
  };
}
const mapDispatchToProps = {
  addNewPhrase,
  setTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(Adding);
