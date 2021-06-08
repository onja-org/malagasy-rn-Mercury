import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import {
  toggleTheme,
  getStyles,
  getFillColor,
  CONTAINER_STYLE,
  HEADER_STYLE,
  HEADING_STYLE,
  SECTION_HEADING_TEXT_STYLE,
} from '../ThemeColor/ThemeColor';

import {
  LANG_DATA,
  CATEGORY_HEADING,
  CATEGORY_SUB_HEADING,
  CATEGORY_ANSWEAR_CHOICES,
  CATEGORY_SUB_HEADING_CHOICES,
  NEXT_BUTTON,
  RESHUFELE_BUTTON,
  ANSWER_VALIDATION,
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
  removeCorrectSeenPhrase,
  addLearntPhrases,
  categoryPhrases,
  seenPhrases,
  addSeenPhrase,
  currentCategoryName,
  theme,
  setTheme,
  nativeLanguage,
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

  function seenPhraseCategory() {
    const findCurrentCategory = categories.find(id => id.phrasesIds.includes(currentPhrase?.id))
    const curentSeenPhraseCategory = findCurrentCategory?.name.en;
    return curentSeenPhraseCategory
  }

  const selectAnswerCallback = useCallback(
    item => {
      const isCorrect = item.id === currentPhrase.id;

      const isAlredyinLearnPhrases = learntPhrases.every(
        phrase => phrase.id !== currentPhrase.id,
      );
      if (isCorrect && isAlredyinLearnPhrases) {
        addLearntPhrases(item);
        removeCorrectSeenPhrase(item)
      } else {
        const phraseAlreadyInSeen = seenPhrases?.some(phrase => phrase.id === currentPhrase.id)
        if (!phraseAlreadyInSeen && !isCorrect) {
          addSeenPhrase(item)
        }
      }
      setDisableAllOptions(true);
      const answerOptionsWithSelected = answerOptions.map(phrase => {
        return { ...phrase, isSelected: phrase.id === item.id };
      });
      setAnswerOptions(answerOptionsWithSelected);
    },
    [currentPhrase, setDisableAllOptions, answerOptions, seenPhrases, learntPhrases],
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
  const categoryListChoices =
    LANG_DATA[CATEGORY_ANSWEAR_CHOICES][nativeLanguage];
  const categoryHeadingListAnswear =
    LANG_DATA[CATEGORY_SUB_HEADING_CHOICES][nativeLanguage];
  const nextButton = LANG_DATA[NEXT_BUTTON][nativeLanguage];
  const reshuffleButton = LANG_DATA[RESHUFELE_BUTTON][nativeLanguage];
  const answerValidation = LANG_DATA[ANSWER_VALIDATION][nativeLanguage];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        style={getStyles(CONTAINER_STYLE, theme)}>
        <View style={{ paddingHorizontal: 35, paddingVertical: 23 }}>
          <View style={getStyles(HEADER_STYLE, theme)}>
            <ToolBar
              button={
                <ToolButton
                  onPress={() => {
                    navigation.navigate('Home');
                  }}>
                  <BackIcon width={24} height={24} fill={getFillColor(theme)} />
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
                <ToolButton onPress={() => toggleTheme(setTheme, theme)}>
                  <ModeIcon width={24} height={24} fill={getFillColor(theme)} />
                </ToolButton>
              }
            />
          </View>
          <View style={getStyles(HEADING_STYLE, theme)}>
            <SectionHeading text={categoryHeading} theme={theme} />
            <Text style={getStyles(SECTION_HEADING_TEXT_STYLE, theme)}>
              {currentCategoryName
                ? currentCategoryName
                : `Learnt phrases/${learntCategory?.name[LANGUAGE_NAMES.EN]}` || `Seen phrases - ${seenPhraseCategory()}`}
            </Text>
          </View>
          <View style={getStyles(HEADING_STYLE, theme)}>
            <SectionHeading text={categorySubHeading} theme={theme} />
          </View>
          <View style={{ marginBottom: 37 }}>
            <Textarea
              theme={theme}
              editable={false}
              phrase={
                shouldReshuffle
                  ? answerValidation
                  : nativeLanguage === LANGUAGE_NAMES.MG
                    ? currentPhrase?.name?.[LANGUAGE_NAMES.EN]
                    : currentPhrase?.name?.[LANGUAGE_NAMES.MG]
              }
            />
          </View>
          {!shouldReshuffle && Boolean(answerOptions && answerOptions.length) && (
            <View>
              <View style={getStyles(HEADING_STYLE, theme)}>
                <SectionHeading
                  text={categoryHeadingListAnswear}
                  theme={theme}
                />
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
                theme={theme}
              />
            </View>
          )}
          {disableAllOptions && !shouldReshuffle && (
            <View style={{ marginTop: 45 }}>
              <NextButton
                isDisabled={false}
                textColor={getFillColor(theme)}
                text={nextButton}
                onPress={nextAnswerCallback}
              />
            </View>
          )}
          {shouldReshuffle && (
            <View style={{ marginTop: 45 }}>
              <NextButton
                isDisabled={false}
                textColor={getFillColor(theme)}
                text={reshuffleButton}
                onPress={reshuffleCallback}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  debugList: {
    flexDirection: 'row',
    width: 250,
  },
});
