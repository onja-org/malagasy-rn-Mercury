import React from 'react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import { LANGUAGE_NAMES } from '../../data/dataUtils'

export default function LanguageSwitcherEnMg({
    nativeLanguage,
    setLanguageName,

}) {

    const switchLanguage = () => {
        const newLanguage = nativeLanguage === LANGUAGE_NAMES.EN ? LANGUAGE_NAMES.MG : LANGUAGE_NAMES.EN
        setLanguageName(newLanguage)

    }

    return (
        <LanguageSwitcher
            firstLanguage={nativeLanguage ? nativeLanguage : nativeLanguage = LANGUAGE_NAMES.MG}
            LeftText={nativeLanguage === LANGUAGE_NAMES.EN ? "EN" : 'MA'}
            RightText={nativeLanguage === LANGUAGE_NAMES.EN ? "MA" : 'EN'}
            color="#FFFFFF"
            iconType=""
            iconName="swap-horiz"
            onPress={switchLanguage}
            iconSize={24}
        />
    );
}




