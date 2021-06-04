import React, {useEffect, useState} from 'react';
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

import {LANGUAGE_NAMES} from '../data/dataUtils';

export default ({navigation, categories, addNewPhrase}) => {
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
          <ToolBar
            button={
              <LanguageSwitcher
                firstLanguage={LANGUAGE_NAMES.EN}
                LeftText="EN"
                RightText="MA"
                color="#FFFFFF"
                iconType=""
                iconName="swap-horiz"
                onPress={() => null}
                iconSize={24}
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
          <SectionHeading text="Category: " />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              style={styles.pickerContent}
              onValueChange={onChangeValue}
              dropdownIconColor="#06B6D4">
              <Picker.Item
                label="Select Category"
                value=""
                style={{color: '#06B6D4'}}
              />
              {categories.map((cat, index) => (
                <Picker.Item
                  label={cat.name[LANGUAGE_NAMES.EN]}
                  value={cat.id}
                  key={index}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.heading}>
          <SectionHeading text="The phrase in English: " />
        </View>
        <View style={{marginBottom: 37}}>
          <Textarea
            editable={false}
            placeholder={'Enter here'}
            multiline={true}
            editable={true}
            phrase={addEnglishPhrase}
            onChange={value => setAddEnglishPhrase(value)}
          />
        </View>
        <View style={styles.heading}>
          <SectionHeading text="The phrase in Malagasy: " />
        </View>
        <View style={{marginBottom: 37}}>
          <Textarea
            editable={false}
            placeholder={'Enter here'}
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
            text="Add"
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
