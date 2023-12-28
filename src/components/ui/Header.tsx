import React, {memo} from 'react';
import {View, Text} from 'react-native';

import tw from '../../styles/tailwind';

function Header(): JSX.Element {
  return (
    <View
      style={tw`flex-row items-center justify-center w-full p-3 border-b border-accent-5 bg-accent-3`}>
      <Text style={tw`font-dm-display text-2xl text-neutral-700`}>Papino</Text>
    </View>
  );
}

export default memo(Header);
