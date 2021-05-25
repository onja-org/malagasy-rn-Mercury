import {connect} from 'react-redux';
import Home from '../screens/Home';
import {
  setCategories, 
  setCurrentCategory, 
  setPhrases, 
  synchronizeStorageToRedux
} from '../redux/actions';
import {
  categoriesRoot, 
  nativeLanguageRoot, 
  newPhrasesRoot
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    newPhrases: newPhrasesRoot(state),
  };
}
const mapDispatchToProps = {
  setCategories,
  setCurrentCategory,
  setPhrases,
  synchronizeStorageToRedux,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
