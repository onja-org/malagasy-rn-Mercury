import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import SectionHeading from '../components/SectionHeading/SectionHeading';
import ToolBar from '../components/ToolBar/ToolBar';
import Textarea from '../components/Textarea/Textarea';
import NextButton from '../components/NextButton/NextButton';
import ToolButton from '../components/ToolButton/ToolButton';
import BackIcon from '../components/ToolButton/assets/back.svg';
import ModeIcon from '../components/ToolButton/assets/mode.svg';
import LanguageSwitcherContainerEnMg from '../containers/LanguageSwitcherContainerEnMg';
import List from '../components/List/List';

import DropdownArrow from '../components/ToolButton/assets/triangle-icon.svg';

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
  ADD_SECTION_HAEDING_E_ENGLISH,
  ADD_ENTER_INPUTFIELD,
  ADD_SECTION_HAEDING_MALAGASY,
  ADD_BUTTON,
  SELECTED_CATEGORY_HEADING,
} from '../translations';

export default ({
  navigation,
  categories,
  addNewPhrase,
  nativeLanguage,
  theme,
  setTheme,
}) => {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [addEnglishPhrase, setAddEnglishPhrase] = useState('');
  const [addMalagasyPhrase, setAddMalagasyPhrase] = useState('');
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('');

  const isButtonEnable =
    addEnglishPhrase === '' ||
    addMalagasyPhrase === '' ||
    categoryId === '';

  const selectCategory = itemValue => {
    setSelectedCategory(itemValue);
    setCategoryId(itemValue?.id);
    setIsCategoryListOpen(false); 
  };

  const addPhrasesToSelectedCategory = () => {
    const newPhrase = {
      catId: categoryId,
      id: uuid(),
      name: {
        en: addEnglishPhrase,
        mg: addMalagasyPhrase,
      },
    };
    addNewPhrase(newPhrase);
    setAddEnglishPhrase('');
    setAddMalagasyPhrase('');
    setSelectedCategory({});
    setCategoryId('');
  };

  const categoryHeading = LANG_DATA[CATEGORY_HEADING][nativeLanguage];
  const addHeadingEnglish =
    LANG_DATA[ADD_SECTION_HAEDING_E_ENGLISH][nativeLanguage];
  const inputField = LANG_DATA[ADD_ENTER_INPUTFIELD][nativeLanguage];
  const addHeadingMalagasy =
    LANG_DATA[ADD_SECTION_HAEDING_MALAGASY][nativeLanguage];
  const addButton = LANG_DATA[ADD_BUTTON][nativeLanguage];
  const selectCategoryHeading = LANG_DATA[SELECTED_CATEGORY_HEADING][nativeLanguage];

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
        style={getStyles(CONTAINER_STYLE, theme)}>
        <View style={{paddingHorizontal: 35, paddingVertical: 23}}>
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
            <TouchableOpacity
              style={styles.select}
              onPress={() => setIsCategoryListOpen(!isCategoryListOpen)}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode={"tail"}
                style={styles.labelSelect}
              >
                {
                  !selectedCategory?.name 
                    ? selectCategoryHeading 
                    : selectedCategory?.name[nativeLanguage]
                }
              </Text>
              <View style={styles.dropdownIcon}>
                <DropdownArrow weight={11} height={11} />
              </View>
            </TouchableOpacity>
            {isCategoryListOpen && (
              <View style={styles.dropdownSelect}>
                <List 
                  data={categories}
                  lang={nativeLanguage}
                  makeAction={selectCategory}
                  theme={theme}
                />
              </View>
            )}
          </View>
          <View style={getStyles(HEADING_STYLE, theme)}>
            <SectionHeading text={addHeadingEnglish} theme={theme} />
          </View>
          <View style={{marginBottom: 37}}>
            <Textarea
              editable={false}
              placeholder={inputField}
              multiline={true}
              editable={true}
              phrase={addEnglishPhrase}
              onChange={value => setAddEnglishPhrase(value)}
              theme={theme}
            />
          </View>
          <View style={getStyles(HEADING_STYLE, theme)}>
            <SectionHeading text={addHeadingMalagasy} theme={theme} />
          </View>
          <View style={{marginBottom: 37}}>
            <Textarea
              editable={false}
              placeholder={inputField}
              multiline={true}
              editable={true}
              phrase={addMalagasyPhrase}
              onChange={value => setAddMalagasyPhrase(value)}
              theme={theme}
            />
          </View>
          <View style={{marginTop: 45}}>
            <NextButton
              isDisabled={isButtonEnable}
              textColor={isButtonEnable ? '#06B6D4' : '#ffffff'}
              text={addButton}
              onPress={addPhrasesToSelectedCategory}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  labelSelect: {
    fontWeight: '600',
    fontSize: 18,
    color: '#06B6D4',
    marginTop: -16,
    marginLeft: 16
  },
  dropdownSelect: {
    zIndex: 3,
    position: 'absolute',
    top: 24,
    padding: -32,
    width: '100%',
  },
  dropdownIcon: {
    marginLeft: 16,
    marginTop: -12
  },
});
