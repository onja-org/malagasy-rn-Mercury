import React from 'react';
import ListItem from '../ListItem/ListItem';
import { View, SafeAreaView } from 'react-native';

import { getStyles, LIST_STYLE } from '../../ThemeColor/ThemeColor';

export default function List({
  data,
  text,
  iconName,
  iconType,
  color,
  makeAction,
  lang,
  randomPhraseId,
  disableAllOptions,
  theme
}) {
  return (
    <SafeAreaView>
      <View style={getStyles(LIST_STYLE, theme)}>
        <ListItem
          lang={lang}
          data={data}
          text={text}
          color={color}
          iconType={iconType}
          iconName={iconName}
          makeAction={makeAction}
          randomPhraseId={randomPhraseId}
          disableAllOptions={disableAllOptions}
          theme={theme}
        />
      </View>
    </SafeAreaView>
  );
}