import { connect } from 'react-redux';
import { setLanguageName } from '../redux/actions/index'
import { nativeLanguageRoot } from '../redux/selectors';
import LanguageSwitcherEnMg from '../components/LanguageSwitcherEnMg/LanguageSwitcherEnMg'

function mapStateToProps(state) {
    return {
        nativeLanguage: nativeLanguageRoot(state),
    };
}
const mapDispatchToProps = { setLanguageName };

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcherEnMg);