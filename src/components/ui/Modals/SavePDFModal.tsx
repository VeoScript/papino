import React, {memo, useCallback} from 'react';
import Modal from 'react-native-modal';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import tw from '../../../styles/tailwind';

import {useCheckKeyboard} from '../../../hooks/useCheckKeyboard';

interface SavePDFModalProps {
  isSaving?: boolean;
  fileName: string;
  setFileName: (value: string) => void;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  onSave: () => void;
}

function SavePDFModal({
  isSaving,
  fileName,
  setFileName,
  isVisible,
  setIsVisible,
  onSave,
}: SavePDFModalProps): JSX.Element {
  const onClose = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const isKeyboardVisible = useCheckKeyboard();

  return (
    <Modal
      statusBarTranslucent
      avoidKeyboard
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeMove={onClose}
      swipeDirection="down"
      backdropOpacity={0}
      style={tw`m-0`}>
      <View
        style={tw.style(
          isKeyboardVisible ? 'h-[30rem]' : 'h-[15rem]',
          'absolute bottom-0 flex-col items-center w-full gap-y-3 rounded-t-3xl border-2 border-accent-3 bg-accent-4',
        )}>
        <View style={tw`w-[5rem] h-2 mt-2 rounded-full bg-accent-1`} />
        <View style={tw`flex-col items-center w-full p-3 gap-y-3`}>
          <Text style={tw`font-poppins-bold text-base text-neutral-700`}>Save as PDF</Text>
          <View style={tw`flex-col w-full gap-y-1`}>
            <Text style={tw`ml-1 font-poppins text-xs text-neutral-700`}>File name</Text>
            <TextInput
              style={tw`w-full p-3 font-poppins text-xs rounded-xl text-neutral-700 bg-white`}
              value={fileName}
              onChangeText={(value: string) => setFileName(value)}
            />
          </View>
          <TouchableOpacity
            disabled={isSaving}
            style={tw.style(
              isSaving && 'opacity-50',
              'flex-row items-center justify-center w-full p-3.5 gap-x-2 rounded-xl shadow-md shadow-red-600 bg-accent-1',
            )}
            onPress={onSave}>
            <Text style={tw`font-poppins text-sm text-neutral-700`}>
              {isSaving ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default memo(SavePDFModal);
