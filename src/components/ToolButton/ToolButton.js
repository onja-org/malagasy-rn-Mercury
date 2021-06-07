import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight, 
  StyleSheet, 
  View
} from 'react-native';

import {
  getStyles,
  LIGHT_THEME,
  TOOL_BUTTON_CONTAINER_STYLE,
  TOOL_BUTTON_STYLE
} from '../../ThemeColor/ThemeColor';

export default function ToolButton({
  onPress, 
  children,
  theme = LIGHT_THEME,
  disabled
}) {
  return (
    <TouchableHighlight
      style={getStyles(TOOL_BUTTON_CONTAINER_STYLE, theme)}
      underlayColor="#E5E5E5"
      onPress={onPress}
      disabled={disabled}
      >
      <View style={getStyles(TOOL_BUTTON_STYLE, theme)}>{children}</View>
    </TouchableHighlight>
  );
}

ToolButton.defaultProps = {
  children: null,
  onPress: () => {},
};

ToolButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};