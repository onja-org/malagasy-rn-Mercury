import React, {useState} from 'react';
import {action} from '@storybook/addon-actions';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';

import SectionHeading from '../components/SectionHeading/SectionHeading';
import ToolBar from '../components/ToolBar/ToolBar';
import Textarea from '../components/Textarea/Textarea';
import NextButton from '../components/NextButton/NextButton';
import ToolButton from '../components/ToolButton/ToolButton';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import BackIcon from '../components/ToolButton/assets/back.svg';
import ModeIcon from '../components/ToolButton/assets/mode.svg';
import LanguageSwitcherContainerEnMg from '../containers/LanguageSwitcherContainerEnMg';

import {LANGUAGE_NAMES} from '../data/dataUtils';

import {
  LANG_DATA,
  CATEGORY_HEADING,
  SELECT_CATEGORY,
  ADD_SECTION_HAEDING_E_ENGLISH,
  ADD_ENTER_INPUTFIELD,
  ADD_SECTION_HAEDING_MALAGASY,
  ADD_BUTTON,
} from '../translations';

export default ({navigation, categories, addNewPhrase, nativeLanguage}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addEnglishPhrase, setAddEnglishPhrase] = useState('');
  const [addMalagasyPhrase, setAddMalagasyPhrase] = useState('');

  const isButtonEnable =
    addEnglishPhrase === '' ||
    addMalagasyPhrase === '' ||
    selectedCategory === '';

  const onChangeValue = itemValue => {
    setSelectedCategory(itemValue);
  };

  const addPhrasesToSelectedCategory = () => {
    const newPhrase = {
      catId: selectedCategory,
      id: uuid(),
      name: {
        en: addEnglishPhrase,
        mg: addMalagasyPhrase,
      },
    };
    addNewPhrase(newPhrase);
    setAddEnglishPhrase('');
    setAddMalagasyPhrase('');
  };

  const categoryHeading = LANG_DATA[CATEGORY_HEADING][nativeLanguage];
  const selectGategory = LANG_DATA[SELECT_CATEGORY][nativeLanguage];
  const addHeadingEnglish =
    LANG_DATA[ADD_SECTION_HAEDING_E_ENGLISH][nativeLanguage];
  const inputField = LANG_DATA[ADD_ENTER_INPUTFIELD][nativeLanguage];
  const addHeadingMalagasy =
    LANG_DATA[ADD_SECTION_HAEDING_MALAGASY][nativeLanguage];
  const addButton = LANG_DATA[ADD_BUTTON][nativeLanguage];

  return (
    <SafeAreaView>
      <View style={{paddingHorizontal: 35, paddingVertical: 23}}>
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
          <ToolBar button={<LanguageSwitcherContainerEnMg />} />
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
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              style={styles.pickerContent}
              onValueChange={onChangeValue}
              dropdownIconColor="#06B6D4">
              <Picker.Item
                label={selectGategory}
                value=""
                style={{color: '#06B6D4'}}
              />
              {categories.map((cat, index) => (
                <Picker.Item
                  label={
                    nativeLanguage === LANGUAGE_NAMES.EN
                      ? cat.name[LANGUAGE_NAMES.EN]
                      : cat.name[LANGUAGE_NAMES.MG]
                  }
                  value={cat.id}
                  key={index}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.heading}>
          <SectionHeading text={addHeadingEnglish} />
        </View>
        <View style={{marginBottom: 37}}>
          <Textarea
            editable={false}
            placeholder={inputField}
            multiline={true}
            editable={true}
            phrase={addEnglishPhrase}
            onChange={value => setAddEnglishPhrase(value)}
          />
        </View>
        <View style={styles.heading}>
          <SectionHeading text={addHeadingMalagasy} />
        </View>
        <View style={{marginBottom: 37}}>
          <Textarea
            editable={false}
            placeholder={inputField}
            multiline={true}
            editable={true}
            phrase={addMalagasyPhrase}
            onChange={value => setAddMalagasyPhrase(value)}
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
  pickerContainer: {
    marginTop: -16,
    height: 50,
    width: 200,
  },
  pickerContent: {
    color: '#06B6D4',
  },
});
