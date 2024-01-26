import React from 'react';
import {View, Text, SafeAreaView, StatusBar, Image, ActivityIndicator} from 'react-native';

import tw from '../../styles/tailwind';

function SplashLayout(): JSX.Element {
  return (
    <SafeAreaView style={tw`flex-1 bg-accent-3`}>
      <StatusBar animated={false} backgroundColor="#FFD8D8" barStyle="dark-content" />
      <View style={tw`flex-1 flex-col items-center justify-center gap-y-5`}>
        <View style={tw`flex-col items-center w-full gap-y-2`}>
          <Image
            style={tw`w-[5rem] h-[5rem]`}
            resizeMode="cover"
            source={require('../../assets/images/favicon.png')}
          />
          <Text style={tw`font-dm-display text-2xl text-neutral-800`}>Papino</Text>
          <Text style={tw`font-poppins text-xs text-neutral-600`}>
            Transform images into text effortlessly!
          </Text>
        </View>
        <ActivityIndicator color="#FFB0B0" size={50} />
      </View>
    </SafeAreaView>
  );
}

export default SplashLayout;
