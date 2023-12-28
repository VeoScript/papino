import React from 'react';
import {View, Text} from 'react-native';

import tw from '../../styles/tailwind';

function Header() {
  return (
    <View style={tw`flex-row items-center justify-center w-full p-3 bg-accent-3`}>
      <Text style={tw`font-dm-display-italic text-2xl text-black`}>Papino</Text>
    </View>
  );
}

export default Header;
