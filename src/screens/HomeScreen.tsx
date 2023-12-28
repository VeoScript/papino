import React from 'react';
import {Text, View} from 'react-native';

import tw from '../styles/tailwind';
import DefaultLayout from '../components/layouts/DefaultLayout';

function HomeScreen() {
  return (
    <DefaultLayout>
      <View style={tw`flex-col w-full`}>
        <Text style={tw`font-poppins`}>Homescreen</Text>
      </View>
    </DefaultLayout>
  );
}

export default HomeScreen;
