import React, {ReactNode, memo} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import tw from '../../styles/tailwind';

import Header from '../ui/Header';
import Footer from '../ui/Footer';
import {useCheckKeyboard} from '../../hooks/useCheckKeyboard';

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({children}: DefaultLayoutProps): JSX.Element {
  const isKeyboardDisplay = useCheckKeyboard();

  return (
    <SafeAreaView style={tw`flex-1 bg-accent-5`}>
      <Header />
      <ScrollView
        // stickyHeaderIndices={[1]}
        keyboardShouldPersistTaps="handled"
        style={tw`flex-1`}
        contentContainerStyle={tw`flex-col`}>
        {children}
        {!isKeyboardDisplay && <Footer />}
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(DefaultLayout);
