import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

import tw from '../../styles/tailwind';

function Loading(): JSX.Element {
  return (
    <View style={tw`flex-1 flex-col items-center justify-center p-5 gap-y-5 bg-accent-3`}>
      <Text style={tw`font-dm-display text-3xl text-neutral-700`}>Papino</Text>
      <ActivityIndicator color="#FFB0B0" size={50} />
      <View style={tw`flex-col items-center w-full gap-y-1`}>
        <Text style={tw`font-poppins text-sm text-center text-neutral-600`}>
          Just wait for a moment! {'\n'} Generating some results...
        </Text>
      </View>
    </View>
  );
}

export default Loading;
