import React, {memo, useCallback, useMemo, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import tw from '../../styles/tailwind';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

import FontFamilyStylesheet from '../../styles/globals';

interface TextEditorProps {
  initialText: string;
  richTextHandle: (value: string) => void;
  handleClear: () => void;
  handleSave: () => void;
}

function TextEditorButtons({richText}: any) {
  const handleHead1 = () => <Text style={tw`text-black text-base`}>H1</Text>;
  const handleHead2 = () => <Text style={tw`text-black text-base`}>H2</Text>;
  const handleHead3 = () => <Text style={tw`text-black text-base`}>H3</Text>;
  return (
    <RichToolbar
      style={tw`flex-col items-center w-full bg-accent-4 border-t border-b border-accent-1`}
      editor={richText}
      selectedIconTint="#FFB0B0"
      iconTint="#000"
      iconSize={15}
      iconMap={{
        [actions.heading1]: handleHead1,
        [actions.heading2]: handleHead2,
        [actions.heading3]: handleHead3,
      }}
      actions={[
        actions.heading1,
        actions.heading2,
        actions.heading3,
        actions.setBold,
        actions.setItalic,
        actions.insertBulletsList,
        actions.insertOrderedList,
        actions.insertLink,
        actions.setStrikethrough,
        actions.setUnderline,
        actions.alignLeft,
        actions.alignCenter,
        actions.alignRight,
        actions.undo,
        actions.redo,
      ]}
    />
  );
}

function TextEditor({
  initialText,
  richTextHandle,
  handleClear,
  handleSave,
}: TextEditorProps): JSX.Element {
  const richText = useRef<any>();

  const changeHTML = useCallback(
    () => richText.current?.setContentHTML(initialText ?? ''),
    [initialText],
  );

  useMemo(() => {
    changeHTML();
  }, [changeHTML]);

  const fontFamily = 'Poppins';
  const initialCSSText = {
    initialCSSText: `${FontFamilyStylesheet}`,
    contentCSSText: `font-family: ${fontFamily}`,
  };

  return (
    <View style={tw`flex-col w-full`}>
      <TextEditorButtons richText={richText} />
      <View style={tw`bg-white`}>
        {initialText && (
          <Text style={tw`p-5 font-poppins text-center text-sm text-accent-1`}>
            "Start editing your paragraph"
          </Text>
        )}
        <RichEditor
          ref={richText}
          initialContentHTML={initialText}
          onChange={richTextHandle}
          placeholder="Capture some image with words or paragraph..."
          editorStyle={initialCSSText}
          initialHeight={310}
        />
      </View>
      <TextEditorButtons richText={richText} />
      <View style={tw`flex-row items-center w-full p-3 gap-x-1 border-t border-accent-2`}>
        <TouchableOpacity
          disabled={!initialText}
          style={tw.style(
            !initialText && 'opacity-50',
            'flex-1 flex-row items-center justify-center w-full p-3 rounded-xl bg-accent-3',
          )}
          onPress={handleClear}>
          <Text style={tw`font-poppins text-xs text-neutral-700`}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!initialText}
          style={tw.style(
            !initialText && 'opacity-50',
            'flex-1 flex-row items-center justify-center w-full p-3 rounded-xl bg-accent-1',
          )}
          onPress={handleSave}>
          <Text style={tw`font-poppins text-xs text-neutral-700`}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default memo(TextEditor);
