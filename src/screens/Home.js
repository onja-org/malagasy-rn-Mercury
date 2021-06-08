import React, { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
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
  CATEGORY_HEADING,
  CATEGORY_LIST,
  CATEGORY_SEEN_PHRASES_HEADING,
  CATEGORY_SEEN_PHRASES,
  CATEGORY_LEARNT_PHRASES_HEADING,
  CATEGORY_LEARNT_PHRASES,
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
  setCategories,
  setCurrentCategory,
  setPhrases,
  setTheme,
  seenPhrases,
  synchronizeStorageToRedux,
}) => {
  useEffect(() => {
    // fetch categories
    synchronizeStorageToRedux();
    const categories = getAllCategories();
    setCategories(categories);

  }, []);

  const openCategoryPhrases = item => {
    const categoryId = item.id;
    setCurrentCategory(categoryId);
    // fetch Phrases for category
    const phrasesForCategory = getPhrasesForCategoryId(categoryId);
    const userPhrasesForCategory = newPhrases.filter(
      phrase => phrase.catId === categoryId,
    );
    const combinedPhrasesForCategory = [
      ...phrasesForCategory,
      ...userPhrasesForCategory,
    ];
    setPhrases(combinedPhrasesForCategory);

    navigation.navigate('Learn');
  };

  const categoryHeading = LANG_DATA[CATEGORY_HEADING][nativeLanguage];
  const categoryList = LANG_DATA[CATEGORY_LIST][nativeLanguage];
  const categorySeenPhrasesHeading =
    LANG_DATA[CATEGORY_SEEN_PHRASES_HEADING][nativeLanguage];
  const categorySeenPhrases = LANG_DATA[CATEGORY_SEEN_PHRASES][nativeLanguage];
  const categoryLearntPhrasesHeading =
    LANG_DATA[CATEGORY_LEARNT_PHRASES_HEADING][nativeLanguage];
  const categoryLearntPhrases =
    LANG_DATA[CATEGORY_LEARNT_PHRASES][nativeLanguage];

  const openAddingScreen = () => {
    navigation.navigate('Add');
  };

  const openLearntPhrases = item => {
    // Using the learntPhrases in the state
    setCurrentCategory(item.id);
    setPhrases(learntPhrases);
    navigation.navigate('Learn');
  };

  // Changing the label of the learnt phrases
  let wordNumberLearntPhrases = '';
  if (learntPhrases?.length > 1) {
    wordNumberLearntPhrases = `${learntPhrases?.length} words and phrases`;
  } else if (learntPhrases?.length === 1) {
    wordNumberLearntPhrases = `${learntPhrases?.length} word and phrase`;
  } else {
    wordNumberLearntPhrases = 'No word and phrase';
  }

  const openSeenPhrase = item => {
    setCurrentCategory(item.id);
    setPhrases(seenPhrases)
    navigation.navigate('Learn');
  }
  let wordNumberSeenPhrases = '';

  if (seenPhrases?.length > 1) {
    wordNumberSeenPhrases = `${seenPhrases?.length} words and phrases`
  } else if (seenPhrases?.length === 1) {
    wordNumberSeenPhrases = `${seenPhrases?.length} word and phrase`
  } else {
    wordNumberSeenPhrases = `No word and phrase`
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
                <ToolButton onPress={action('clicked-add-button')}>
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
            data={[{ id: '###seen-phrases###', name: wordNumberSeenPhrases }]}
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
            data={[{ id: '###learnt-phrases###', name: wordNumberLearntPhrases }]}
            text={categoryList}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            disableAllOptions={learntPhrases === null}
            makeAction={openLearntPhrases}
            theme={theme}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}