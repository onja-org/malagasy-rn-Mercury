import React from 'react';
import {Text, SafeAreaView} from 'react-native';

import {getStyles, SECTION_HEADING_TEXT_STYLE} from '../../ThemeColor/ThemeColor'

export default function SectionHeading({text, theme}) {
  return (
    <SafeAreaView>
      <Text h2 style={getStyles(SECTION_HEADING_TEXT_STYLE, theme)}>
        {text}
      </Text>
    </SafeAreaView>
  );
}
