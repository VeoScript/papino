import React from 'react';

import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';

import HomeScreen from '../screens/HomeScreen';

type RootStackParams = {
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

function AppStacks() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar animated={false} backgroundColor="#FFD8D8" barStyle="dark-content" />
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'none'}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStacks;
