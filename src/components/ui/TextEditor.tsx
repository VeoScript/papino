import React, {memo, useMemo, useRef} from 'react';
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

function TextEditor({
  initialText,
  richTextHandle,
  handleClear,
  handleSave,
}: TextEditorProps): JSX.Element {
  const richText = useRef<any>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeHTML = () => richText.current?.setContentHTML(initialText ?? '');

  useMemo(() => {
    changeHTML();
  }, [changeHTML]);

  const fontFamily = 'Poppins';
  const initialCSSText = {
    initialCSSText: `${FontFamilyStylesheet}`,
    contentCSSText: `font-family: ${fontFamily}`,
  };

  const handleHead1 = () => <Text style={tw`text-black text-base`}>H1</Text>;
  const handleHead2 = () => <Text style={tw`text-black text-base`}>H2</Text>;
  const handleHead3 = () => <Text style={tw`text-black text-base`}>H3</Text>;

  return (
    <View style={tw`flex-col w-full`}>
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
      <RichEditor
        ref={richText}
        initialContentHTML={initialText}
        onInput={() => richTextHandle}
        placeholder="Capture some image with words or paragraph..."
        editorStyle={initialCSSText}
        initialHeight={300}
      />
      <View style={tw`flex-row items-center w-full p-3 gap-x-1 border-t border-accent-2`}>
        <TouchableOpacity
          style={tw`flex-1 flex-row items-center justify-center w-full p-3 rounded-xl bg-accent-3`}
          onPress={handleClear}>
          <Text style={tw`font-poppins text-xs text-neutral-700`}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-1 flex-row items-center justify-center w-full p-3 rounded-xl bg-accent-1`}
          onPress={handleSave}>
          <Text style={tw`font-poppins text-xs text-neutral-700`}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default memo(TextEditor);
