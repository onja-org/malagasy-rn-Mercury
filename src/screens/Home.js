import React, { useEffect } from 'react';
// import { action } from '@storybook/addon-actions';
import { getPhrasesForCategoryId, getAllCategories } from '../data/dataUtils';
import { View, SafeAreaView, KeyboardAvoidingView } from 'react-native';

import {
  toggleTheme,
  getStyles,
  getFillColor,
  CONTAINER_STYLE,
  HEADER_STYLE,
  HEADING_STYLE,
} from '../ThemeColor/ThemeColor';

import {
  LANG_DATA,
  NO_PHRASE_TEXT,
  CATEGORY_HEADING,
  CATEGORY_LIST,
  CATEGORY_SEEN_PHRASES_HEADING,
  CATEGORY_LEARNT_PHRASES_HEADING,
  CATEGORY_LEARNT_AND_SEEN_PHRASES,
  CATEGORY_LEARNT_PHRASES,
  SEEN_PHRASES_TRANSLATION,
  SEEN_PHRASE_TRANSLATION,
  CATEGORY_SEEN_PHRASES
} from '../translations';

import List from '../components/List/List';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import ToolBar from '../components/ToolBar/ToolBar';
import ToolButton from '../components/ToolButton/ToolButton';
import AddIcon from '../components/ToolButton/assets/add.svg';
import CheckIcon from '../components/ToolButton/assets/check.svg';
import CheckAllIcon from '../components/ToolButton/assets/check-all.svg';
import ModeIcon from '../components/ToolButton/assets/mode.svg';
import LanguageSwitcherContainerEnMg from '../containers/LanguageSwitcherContainerEnMg';
import { LEARNT_PHRASE_ID, SEEN_PHRASE_ID } from '../redux/constants';

export default ({
  //nav provider
  navigation,
  //state props
  categories,
  learntPhrases,
  nativeLanguage,
  newPhrases,
  theme,
  //actions
  setCurrentCategory,
  setPhrases,
  setTheme,
  seenPhrases,
  setCategories,
  synchronizeStorageToRedux,
  getCategoriesAndUpdateRedux,
  setCombinedPhrases
}) => {
  useEffect(() => {
    // fetch categories
    synchronizeStorageToRedux();
    const categories = getAllCategories();
    setCategories(categories);
    getCategoriesAndUpdateRedux();
  }, []);

  const openCategoryPhrases = async item => {
    const categoryId = item.id;
    setCurrentCategory(categoryId);
    const userPhrasesForCategory = newPhrases.filter(
      phrase => phrase.catId === categoryId,
    );
    setCombinedPhrases(userPhrasesForCategory, categoryId, navigateToLearn)
  };

  const navigateToLearn = () => navigation.navigate('Learn');

  const categoryHeading = LANG_DATA[CATEGORY_HEADING][nativeLanguage];
  const categoryList = LANG_DATA[CATEGORY_LIST][nativeLanguage];
  const noWordAndPhraseText = LANG_DATA[NO_PHRASE_TEXT][nativeLanguage];
  const categorySeenPhrasesHeading = LANG_DATA[CATEGORY_SEEN_PHRASES_HEADING][nativeLanguage];
  const categorySeenPhrases = LANG_DATA[CATEGORY_SEEN_PHRASES][nativeLanguage];
  const categoryLearntPhrasesHeading = LANG_DATA[CATEGORY_LEARNT_PHRASES_HEADING][nativeLanguage];
  const categoryLearntPhrases = LANG_DATA[CATEGORY_LEARNT_PHRASES][nativeLanguage];
  const seenPhrasesTranslation = LANG_DATA[SEEN_PHRASES_TRANSLATION][nativeLanguage]
  const seenPhraseTranslation = LANG_DATA[SEEN_PHRASE_TRANSLATION][nativeLanguage]

  const openAddingScreen = () => {
    navigation.navigate('Add');
  };

  const openLearntPhrases = item => {
    // Using the learntPhrases in the state
    setCurrentCategory(item);
    setPhrases(learntPhrases);
    navigation.navigate('Learn');
  };

  // Changing the label of the learnt phrases
  let wordAndPhrase = '';
  if (learntPhrases?.length > 1) {
    wordAndPhrase =
      nativeLanguage === 'en'
        ? `${learntPhrases?.length} ${categoryLearntAndSeenPhrases}`
        : `${categoryLearntAndSeenPhrases} ${learntPhrases?.length}`;
  } else if (learntPhrases?.length === 1) {
    wordAndPhrase =
      nativeLanguage === 'en'
        ? `${learntPhrases?.length} word and phrase`
        : `${categoryLearntAndSeenPhrases} ${learntPhrases?.length}`;
  } else {
    wordAndPhrase = noWordAndPhraseText;
  }

  const openSeenPhrase = (item) => {
    setCurrentCategory(item.id);
    setPhrases(seenPhrases);
    navigation.navigate('Learn');
  };
  let wordNumberSeenPhrases = '';

  if (seenPhrases?.length > 1) {
    wordNumberSeenPhrases = `${seenPhrases?.length} ${categorySeenPhrases}`
  } else if (seenPhrases?.length === 1) {
    wordNumberSeenPhrases = `${seenPhrases?.length} ${seenPhraseTranslation}`
  } else {
    wordNumberSeenPhrases = `${seenPhrasesTranslation}`
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        style={getStyles(CONTAINER_STYLE, theme)}>
        <View style={{ paddingHorizontal: 35, paddingVertical: 23 }}>
          <View style={getStyles(HEADER_STYLE, theme)}>
            <ToolBar
              button={
                <ToolButton onPress={openAddingScreen}>
                  <AddIcon width={24} height={24} fill={getFillColor(theme)} />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <LanguageSwitcherContainerEnMg color={getFillColor(theme)} />
              }
            />
            <ToolBar
              button={
                <ToolButton
                  onPress={() => openSeenPhrase({ id: SEEN_PHRASE_ID })}
                  disabled={seenPhrases?.length === 0}>
                  <CheckIcon
                    width={24}
                    height={24}
                    fill={getFillColor(theme)}
                  />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <ToolButton
                  onPress={openLearntPhrases}
                  disabled={learntPhrases?.length === 0}>
                  <CheckAllIcon
                    width={24}
                    height={24}
                    fill={getFillColor(theme)}
                  />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={() => toggleTheme(setTheme, theme)}>
                  <ModeIcon width={24} height={24} fill={getFillColor(theme)} />
                </ToolButton>
              }
            />
          </View>
          <View style={getStyles(HEADING_STYLE, theme)}>
            <SectionHeading text={categoryHeading} theme={theme} />
          </View>
          <List
            lang={nativeLanguage}
            data={categories}
            text={categoryList}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openCategoryPhrases}
            theme={theme}
          />
          <View style={getStyles(HEADING_STYLE, theme)}>
            <SectionHeading text={categorySeenPhrasesHeading} theme={theme} />
          </View>
          <List
            data={[{ id: SEEN_PHRASE_ID, name: wordNumberSeenPhrases }]}
            text={'Learn'}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openSeenPhrase}
            disableAllOptions={seenPhrases?.length === 0}
            theme={theme}
          />
          <View style={getStyles(HEADING_STYLE, theme)}>
            <SectionHeading text={categoryLearntPhrasesHeading} theme={theme} />
          </View>
          <List
            data={[{ id: LEARNT_PHRASE_ID, name: wordAndPhrase }]}
            text={categoryList}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            disableAllOptions={learntPhrases === 0}
            makeAction={openLearntPhrases}
            theme={theme}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
