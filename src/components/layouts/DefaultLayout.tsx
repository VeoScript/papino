import React, {ReactNode} from 'react';
import {ScrollView} from 'react-native';

import tw from '../../styles/tailwind';

import Header from '../ui/Header';

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({children}: DefaultLayoutProps) {
  return (
    <ScrollView style={tw`flex-1 bg-accent-5`}>
      <Header />
      {children}
    </ScrollView>
  );
}

export default DefaultLayout;
