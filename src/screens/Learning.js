import React, { useState, useEffect, useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import {
  LANG_DATA, CATEGORY_HEADING,
  CATEGORY_SUB_HEADING,
  CATEGORY_ANSWEAR_CHOICES,
  CATEGORY_SUB_HEADING_CHOICES
} from '../translations';

import List from '../components/List/List';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import ToolBar from '../components/ToolBar/ToolBar';
import Textarea from '../components/Textarea/Textarea';
import NextButton from '../components/NextButton/NextButton';
import ToolButton from '../components/ToolButton/ToolButton';
import BackIcon from '../components/ToolButton/assets/back.svg';
import ModeIcon from '../components/ToolButton/assets/mode.svg';
import LanguageSwitcherContainerEnMg from '../containers/LanguageSwitcherContainerEnMg';

import { LANGUAGE_NAMES } from '../data/dataUtils';
import { shuffleArray } from '../utils';



export default ({
  //nav provider
  navigation,

  //state props
  categories,
  learntPhrases,
  addLearntPhrases,
  categoryPhrases,
  currentCategoryName,
  nativeLanguage
}) => {
  const [originalPhrases, setOriginalPhrases] = useState([]);
  const [phrasesLeft, setPhrasesLeft] = useState([]);
  const [currentPhrase, setCurrentPhrase] = useState(null);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [disableAllOptions, setDisableAllOptions] = useState(false);
  const [shouldReshuffle, setshouldReshuffle] = useState(false);

  // Finding the learnt phrases category
  const learntCategory = categories.find(cat =>
    cat.phrasesIds.includes(currentPhrase?.id),
  );

  useEffect(() => {
    setOriginalPhrases(categoryPhrases);
    setNewQuestionPhrase(categoryPhrases, categoryPhrases);

  }, [categoryPhrases]);

  const setAnswerOptionsCallback = (original, current) => {
    const originWithoutCurrent = original.filter(phr => phr.id !== current.id);
    const randomFromAll = shuffleArray(originWithoutCurrent).slice(0, 3);
    const randomWithCorrect = shuffleArray([...randomFromAll, current]);
    setAnswerOptions(randomWithCorrect);
  };

  const selectAnswerCallback = useCallback(
    item => {
      if (
        item.id === currentPhrase.id &&
        learntPhrases?.every(phrase => phrase.id !== currentPhrase.id)
      ) {
        addLearntPhrases(item);
      } else {
        // TODO add to seen
      }

      setDisableAllOptions(true);

      const answerOptionsWithSelected = answerOptions.map(phrase => {
        return { ...phrase, isSelected: phrase.id === item.id };
      });
      setAnswerOptions(answerOptionsWithSelected);
    },
    [currentPhrase, setDisableAllOptions, answerOptions],
  );

  const nextAnswerCallback = useCallback(() => {
    if (!Boolean(phrasesLeft.length)) {
      setshouldReshuffle(true);
      return;
    }
    setDisableAllOptions(false);
    const leftWithResetSelection = phrasesLeft.map(p => ({
      ...p,
      isSelected: false,
    }));

    setNewQuestionPhrase(originalPhrases, leftWithResetSelection);
  }, [phrasesLeft, originalPhrases]);

  const reshuffleCallback = useCallback(() => {
    setshouldReshuffle(false);
    setDisableAllOptions(false);
    setNewQuestionPhrase(originalPhrases, originalPhrases);
  }, [originalPhrases]);

  const setNewQuestionPhrase = (originalAll, leftOriginal) => {
    const phrasesLeftOriginal = shuffleArray(leftOriginal);
    const phrasesLeftCopy = [...phrasesLeftOriginal];
    const newPhrase = phrasesLeftCopy.shift();
    setPhrasesLeft(phrasesLeftCopy);
    setCurrentPhrase(newPhrase);
    setAnswerOptionsCallback(originalAll, newPhrase);
  };


  const categoryHeading = LANG_DATA[CATEGORY_HEADING][nativeLanguage];
  const categorySubHeading = LANG_DATA[CATEGORY_SUB_HEADING][nativeLanguage];
  const categoryListChoices = LANG_DATA[CATEGORY_ANSWEAR_CHOICES][nativeLanguage];
  const categoryHeadingListAnswear = LANG_DATA[CATEGORY_SUB_HEADING_CHOICES][nativeLanguage]


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ paddingHorizontal: 35, paddingVertical: 23 }}>
          <View style={styles.header}>
            <ToolBar
              button={
                <ToolButton
                  onPress={() => {
                    navigation.navigate('Home');
                  }}>
                  <BackIcon width={24} height={24} fill="#FFFFFF" />
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
                  <ModeIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
          </View>
          <View style={styles.heading}>
            <SectionHeading text={categoryHeading} />
            <Text>
              {currentCategoryName
                ? currentCategoryName
                : `Learnt phrases/${learntCategory?.name[LANGUAGE_NAMES.EN]}`}
            </Text>
          </View>
          <View style={styles.heading}>
            <SectionHeading text={categorySubHeading} />
          </View>
          <View style={{ marginBottom: 37 }}>
            <Textarea
              editable={false}
              phrase={
                shouldReshuffle
                  ? 'You have answered all the questions in this category'
                  : nativeLanguage === LANGUAGE_NAMES.MG ? currentPhrase?.name?.[LANGUAGE_NAMES.EN] : currentPhrase?.name?.[LANGUAGE_NAMES.MG]
              }
            />
          </View>
          {!shouldReshuffle && Boolean(answerOptions && answerOptions.length) && (
            <View>
              <View style={styles.heading}>
                <SectionHeading text={categoryHeadingListAnswear} />
              </View>
              <List
                lang={nativeLanguage}
                data={answerOptions}
                text={categoryListChoices}
                color="#06B6D4"
                iconType="material-community"
                iconName="arrow-right"
                makeAction={selectAnswerCallback}
                randomPhraseId={currentPhrase.id}
                disableAllOptions={disableAllOptions}
              />
            </View>
          )}

          {disableAllOptions && !shouldReshuffle && (
            <View style={{ marginTop: 45 }}>
              <NextButton
                isDisabled={false}
                textColor="#FFFFFF"
                text={'Next'}
                onPress={nextAnswerCallback}
              />
            </View>
          )}
          {shouldReshuffle && (
            <View style={{ marginTop: 45 }}>
              <NextButton
                isDisabled={false}
                textColor="#FFFFFF"
                text={'Reshuffle'}
                onPress={reshuffleCallback}
              />
            </View>
          )}
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
    flexDirection: 'row',
  },
  debugList: {
    flexDirection: 'row',
    width: 250,
  },
});
