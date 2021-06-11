import {StyleSheet} from 'react-native';

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

export const getStyles = (key, theme) => {
    const styles = StyleSheet.create({
        [CONTAINER_STYLE]: {
            backgroundColor: theme === LIGHT_THEME ? '#E5E5E5' : '#1F232C',
            height: '100%',
        },
        [HEADER_STYLE]: {
            flexDirection: 'row',
            paddingBottom: 56,
        },
        [HEADING_STYLE]: {
            flexDirection: 'row',
        },
        [LIST_STYLE]: {
          backgroundColor: getFillColor(theme),
          borderWidth: 1,
          borderColor: theme === LIGHT_THEME ? '#FFFF' : '#111827',
          maxHeight: 370,
          marginBottom: 15,
        },
        [TOOL_BUTTON_CONTAINER_STYLE]: {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: 16,
          color: getFillColor(theme),
          width: 'auto',
          alignSelf: 'center',
          borderRadius: 100,
          backgroundColor: '#06B6D4',
          alignItems: 'center',
        },
        [TOOL_BUTTON_STYLE]: {
          margin: 13,
        },
        [SECTION_HEADING_TEXT_STYLE]: {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: 18,
          lineHeight: 22,
          color: theme === LIGHT_THEME ? '#111827' : '#FFFF',
          paddingBottom: 15,
        },
        [LIST_ITEM_TEXT_STYLE]: {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 16,
          lineHeight: 19,
          color: getTextColor(theme),
          maxWidth: 320,
        },
        [LIST_SEPARATOR_STYLE]: {
          flex: 1,
          height: 1,
          backgroundColor: theme === LIGHT_THEME ? '#E5E5E5' : '#1F232C',
        },
        [TEXTAREA_STYLE]: {
          fontFamily: 'Inter',
          color: theme === LIGHT_THEME ? '#111827' : '#FFFF',
          maxWidth: 360,
          marginHorizontal: 'auto',
          fontSize: 20,
          lineHeight: 24.3,
        },
        [INPUT_STYLE]: {
          color: '#111827',
          lineHeight: 24.3,
        },
        [TEXT_TEXTAREA_CONTAINER_STYLE]: {
          height: 100,
          marginVertical: 0,
          marginHorizontal: 'auto',
          backgroundColor: theme === LIGHT_THEME ? '#FFF' : '#111827',
          justifyContent: 'center',
          alignItems: 'center',
          borderStyle: 'solid',
          borderColor: '#E5E5E5',
        },
    });
    return styles[key];
}

export const getFillColor = theme =>
  theme === LIGHT_THEME ? '#FFFF' : '#111827';

export const getTextColor = theme =>
  theme === LIGHT_THEME ? '#111827' : '#FFFF';

export const getFillLearningColor = theme =>
  theme === LIGHT_THEME ? '#FFFF' : '#111827';

export const CONTAINER_STYLE = 'container';
export const HEADER_STYLE = 'header';
export const HEADING_STYLE = 'heading';
export const LIST_STYLE = 'list';
export const TOOL_BUTTON_CONTAINER_STYLE = 'toolButtonContainer';
export const TOOL_BUTTON_STYLE = 'toolButton';
export const SECTION_HEADING_TEXT_STYLE = 'sectionHeadingText';
export const LIST_ITEM_TEXT_STYLE = 'listItemText';
export const LIST_SEPARATOR_STYLE = 'listSeparator';
export const TEXTAREA_STYLE = 'textarea';
export const INPUT_STYLE = 'input';
export const TEXT_TEXTAREA_CONTAINER_STYLE = 'textTextareaContainer';

export const toggleTheme = (setTheme, theme) => {
    const newThemeMode = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setTheme(newThemeMode);
}