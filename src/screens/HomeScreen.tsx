import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import tw from '../styles/tailwind';
import {FeatherIcon} from '../utils/Icons';

import DefaultLayout from '../components/layouts/DefaultLayout';
import TextEditor from '../components/ui/TextEditor';

function HomeScreen() {
  return (
    <DefaultLayout>
      <View style={tw`flex-col items-center w-full mt-5 px-5 gap-y-3`}>
        <Text style={tw`font-poppins text-xs text-neutral-600`}>
          Capture a photo with a words or paragraph
        </Text>
        <TouchableOpacity
          style={tw`flex-col items-center justify-center w-full h-[20rem] rounded-3xl border border-accent-2 bg-accent-3`}>
          <FeatherIcon name="camera" size={100} color="#FFB0B0" />
        </TouchableOpacity>
        <Text style={tw`font-poppins text-xs text-neutral-600`}>or</Text>
        <TouchableOpacity
          style={tw`flex-row items-center justify-center w-full p-3 gap-x-2 rounded-xl border border-accent-1 bg-accent-3`}>
          <FeatherIcon name="image" size={14} color="#555" />
          <Text style={tw`font-poppins text-xs text-neutral-600`}>Browser Gallery</Text>
        </TouchableOpacity>
      </View>
      <TextEditor
        initialText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptate assumenda ipsam pariatur deserunt aperiam, qui ducimus iste! Ducimus, laboriosam. Porro quis iste saepe maxime rerum exercitationem accusantium aperiam vitae."
        richTextHandle={() => {
          console.log('clicked text editor handle...');
        }}
      />
    </DefaultLayout>
  );
}

export default HomeScreen;
