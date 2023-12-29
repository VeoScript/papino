import React from 'react';
import {View, Text} from 'react-native';

import tw from '../../styles/tailwind';

import Config from 'react-native-config';

function Footer(): JSX.Element {
  return (
    <View style={tw`flex-col items-center w-full p-3 border-t border-accent-2`}>
      <Text style={tw`font-poppins text-[9px] text-neutral-500`}>
        &copy; 2023 Papino, All rights reserved.
      </Text>
      <Text style={tw`font-poppins text-[9px] text-neutral-500`}>
        Developed by <Text style={tw`font-poppins-bold text-neutral-500`}>VEOSCRIPT</Text>.
      </Text>
      <Text style={tw`font-poppins text-[9px] text-neutral-500`}>version {Config.APP_VERSION}</Text>
    </View>
  );
}

export default Footer;
