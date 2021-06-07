// components/Task.js
import * as React from 'react';
import { SafeAreaView, TextInput } from 'react-native';
import {
  getStyles,
  LIGHT_THEME,
  INPUT_STYLE,
  TEXTAREA_STYLE,
  TEXT_TEXTAREA_CONTAINER_STYLE,
} from '../../ThemeColor/ThemeColor';

export default function Example({
  phrase,
  editable,
  onChange = () => null, 
  placeholder,
  theme
}) {

  const textStyle = editable 
    ? getStyles(INPUT_STYLE, theme)
    : getStyles(TEXTAREA_STYLE, theme);

  const placeholderStyle = theme === LIGHT_THEME ? '#11182780' : '#ffffff';

  return (
    <SafeAreaView style={getStyles(TEXT_TEXTAREA_CONTAINER_STYLE, theme)}>
      <TextInput
        style={theme === LIGHT_THEME ? textStyle : {color: '#ffffff'}}
        value={phrase}
        editable={editable}
        onChangeText={onChange}
        multiline={true}
        placeholder={placeholder}
        placeholderTextColor={placeholderStyle}
      />
    </SafeAreaView>
  );
}
