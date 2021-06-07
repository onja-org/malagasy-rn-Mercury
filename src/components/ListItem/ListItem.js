import React from 'react';
import ActionButton from '../ActionButton/ActionButton';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  SectionList,
} from 'react-native';

import {
  getStyles, 
  LIST_ITEM_TEXT_STYLE, 
  LIST_SEPARATOR_STYLE
} from '../../ThemeColor/ThemeColor';

export const Separator = ({theme}) => <View style={getStyles(LIST_SEPARATOR_STYLE, theme)} />;
const RenderDataItem = ({
  item,
  index,
  makeAction,
  text,
  iconName,
  iconType,
  color,
  lang,
  randomPhraseId,
  disableAllOptions,
  theme,
}) => {
  const showAnswerMode = disableAllOptions === true;
  const isCorrectAnswer = item.id === randomPhraseId;
  const isSelected = Boolean(item?.isSelected);
  const showAsCorrect = showAnswerMode && isCorrectAnswer;
  const shouldReveal = isSelected || showAsCorrect;
  const shouldDisplayAnswer = showAnswerMode && shouldReveal;

  const textToDisplay = !shouldDisplayAnswer
    ? text
    : showAsCorrect
    ? 'Correct'
    : 'Wrong';

  const colorToDisplay = !shouldDisplayAnswer
    ? color
    : showAsCorrect
    ? '#06D440'
    : '#D4068E';

  const iconTypeToDisplay = !shouldDisplayAnswer
    ? iconType
    : showAsCorrect
    ? 'octicon'
    : '';

  const IconNameToDisplay = !shouldDisplayAnswer
    ? iconName
    : showAsCorrect
    ? 'check'
    : 'close';

  return (
    <TouchableOpacity
      disabled={disableAllOptions && disableAllOptions}
      style={styles.item}
      onPress={() => makeAction(item, index)}>
      <View>
        <Text 
          numberOfLines={1} 
          ellipsizeMode={'tail'} 
          style={getStyles(LIST_ITEM_TEXT_STYLE, theme)}
        >
          {lang ? item?.name?.[lang] : item.name}
        </Text>
      </View>
      <ActionButton
        text={textToDisplay}
        color={colorToDisplay}
        iconType={iconTypeToDisplay}
        iconName={IconNameToDisplay}
      />
    </TouchableOpacity>
  );
};

export default function ListItem({
  makeAction,
  data,
  text,
  iconName,
  iconType,
  color,
  lang,
  randomPhraseId,
  disableAllOptions,
  theme
}) {
  return (
    <SafeAreaView>
      <SectionList
        sections={[{data: data}]}
        renderItem={({item, index}) => (
          <RenderDataItem
            item={item}
            index={index}
            makeAction={makeAction}
            text={text}
            iconName={iconName}
            iconType={iconType}
            color={color}
            lang={lang}
            randomPhraseId={randomPhraseId}
            disableAllOptions={disableAllOptions}
            theme={theme}
          />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Separator theme={theme} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlignVertical: 'center',
    paddingLeft: 16,
    paddingRight: 20,
    paddingVertical: 17,
  },
});
