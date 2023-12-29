import React, {ReactNode, memo} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import tw from '../../styles/tailwind';

import Header from '../ui/Header';
import Footer from '../ui/Footer';

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({children}: DefaultLayoutProps): JSX.Element {
  return (
    <SafeAreaView style={tw`flex-1 bg-accent-5`}>
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-col`}>
        {children}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(DefaultLayout);
