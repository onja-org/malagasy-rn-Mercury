import React, { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import {
  getPhrasesForCategoryId,
  getAllCategories,
} from '../data/dataUtils';

import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';


import {
  LANG_DATA,
  CATEGORY_HEADING,
  CATEGORY_LIST,
  CATEGORY_SEEN_PHRASES_HEADING,
  CATEGORY_SEEN_PHRASES,
  CATEGORY_LEARNT_PHRASES_HEADING,
  CATEGORY_LEARNT_PHRASES
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

  //actions
  setCategories,
  setCurrentCategory,
  setPhrases,
  newPhrases,
  synchronizeStorageToRedux,
}) => {

  useEffect(() => {
    // fetch categories
    const categories = getAllCategories();
    setCategories(categories);
    synchronizeStorageToRedux();
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
  const categorySeenPhrasesHeading = LANG_DATA[CATEGORY_SEEN_PHRASES_HEADING][nativeLanguage];
  const categorySeenPhrases = LANG_DATA[CATEGORY_SEEN_PHRASES][nativeLanguage];
  const categoryLearntPhrasesHeading = LANG_DATA[CATEGORY_LEARNT_PHRASES_HEADING][nativeLanguage];
  const categoryLearntPhrases = LANG_DATA[CATEGORY_LEARNT_PHRASES][nativeLanguage];

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
    wordAndPhrase = `${learntPhrases?.length} words and phrases`;
  } else if (learntPhrases?.length === 1) {
    wordAndPhrase = `${learntPhrases?.length} word and phrase`;
  } else {
    wordAndPhrase = 'No word and phrase';
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ paddingHorizontal: 35, paddingVertical: 23 }}>
          <View style={styles.header}>
            <ToolBar
              button={
                <ToolButton onPress={openAddingScreen}>
                  <AddIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <LanguageSwitcherContainerEnMg
                />
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={action('clicked-add-button')}>
                  <CheckIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <ToolButton
                  onPress={openLearntPhrases}
                  disabled={learntPhrases?.length === 0}>
                  <CheckAllIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={action('clicked-add-button')}>
                  <ModeIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
          </View>
          <View style={styles.heading}>
            <SectionHeading text={categoryHeading} />
          </View>
          <List
            lang={nativeLanguage}
            data={categories}
            text={categoryList}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openCategoryPhrases}
          />
          <View style={styles.heading}>
            <SectionHeading text={categorySeenPhrasesHeading} />
          </View>
          <List
            data={[{ id: 1, name: categorySeenPhrases }]}
            text={categoryList}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={() => { }}
          />
          <View style={styles.heading}>
            <SectionHeading text={categoryLearntPhrasesHeading} />
          </View>
          <List
            data={[{ id: '###learnt-phrases###', name: wordAndPhrase }]}
            text={categoryList}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            disableAllOptions={learntPhrases?.length === 0}
            makeAction={openLearntPhrases}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingBottom: 56,
  },
  heading: {
    paddingBottom: 15,
  },
});
