import React, {ReactNode} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import tw from '../../styles/tailwind';

import Header from '../ui/Header';

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({children}: DefaultLayoutProps) {
  return (
    <SafeAreaView style={tw`flex-1 bg-accent-5`}>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-col gap-y-5`}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DefaultLayout;
