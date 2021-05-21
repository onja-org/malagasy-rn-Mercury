import {connect} from 'react-redux';
import Home from '../screens/Home';
import {
  setCategories,
  setCurrentCategory,
  setPhrases,
  setLearntPhrases,
  addLearntPhrase,
} from '../redux/actions';
import {categoriesRoot, nativeLanguageRoot} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    learntPhrases: state.learntPhrases,
  };
}
const mapDispatchToProps = {
  setCategories,
  setCurrentCategory,
  setPhrases,
  setLearntPhrases,
  addLearntPhrase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
