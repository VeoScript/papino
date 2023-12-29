import React, {memo} from 'react';
import {View, Text} from 'react-native';

import tw from '../../styles/tailwind';

function Header(): JSX.Element {
  return (
    <View
      style={tw`flex-col items-center justify-center w-full p-3 gap-y-1 shadow-xl shadow-red-600 border-b border-accent-2 bg-accent-3`}>
      <Text style={tw`font-dm-display text-2xl text-neutral-700`}>Papino</Text>
      <Text style={tw`font-poppins-light text-xs text-neutral-500`}>
        Transform images into text effortlessly!
      </Text>
    </View>
  );
}

export default memo(Header);
