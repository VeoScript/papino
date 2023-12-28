import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';

import tw from '../styles/tailwind';
import {FeatherIcon} from '../utils/Icons';

import TextRecognition from '@react-native-ml-kit/text-recognition';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import DefaultLayout from '../components/layouts/DefaultLayout';
import Loading from '../components/ui/Loading';
import TextEditor from '../components/ui/TextEditor';

function HomeScreen(): JSX.Element {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [recognizedTexts, setRecognizedTexts] = useState<any>(null);

  const richTextHandle = (descriptionText: string): void => {
    if (descriptionText) {
      setRecognizedTexts(descriptionText);
    } else {
      setRecognizedTexts('');
    }
  };

  const handleCapturePhoto = useCallback((): void => {
    let options: any = {
      saveToPhotos: false,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra: true,
    };

    launchCamera(options, async response => {
      setIsGenerating(true);

      if (response.didCancel) {
        return;
      }
      if (response) {
        const image: any = response?.assets;
        const result = await TextRecognition.recognize(image[0].uri);
        setCapturedImage(image[0].uri);
        setRecognizedTexts(result);
        setIsGenerating(false);
      }
    });
  }, []);

  const handleChoosePostPhoto = useCallback((): void => {
    let options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, async response => {
      setIsGenerating(true);

      if (response.didCancel) {
        return;
      }
      if (response) {
        const image: any = response?.assets;
        const result = await TextRecognition.recognize(image[0].uri);
        setCapturedImage(image[0].uri);
        setRecognizedTexts(result);
        setIsGenerating(false);
      }
    });
  }, []);

  return (
    <>
      {isGenerating ? (
        <Loading />
      ) : (
        <DefaultLayout>
          <View style={tw`flex-col items-center w-full mt-5 px-5 gap-y-3`}>
            {capturedImage ? (
              <>
                {recognizedTexts?.text === '' && (
                  <Text style={tw`font-poppins text-xs text-red-500`}>
                    There's no words/paragraph detected in this image.
                  </Text>
                )}
                <ImageBackground
                  style={tw`relative w-full overflow-hidden rounded-xl`}
                  resizeMode="cover"
                  source={{
                    uri: capturedImage,
                  }}>
                  <View style={tw`absolute w-full h-full bg-black opacity-90`} />
                  <Image
                    style={tw`w-full h-[30rem]`}
                    resizeMode="contain"
                    source={{
                      uri: capturedImage,
                    }}
                  />
                  <TouchableOpacity
                    style={tw`absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-70`}
                    onPress={() => {
                      setCapturedImage('');
                      setRecognizedTexts(null);
                    }}>
                    <FeatherIcon name="x" size={20} color="#222" />
                  </TouchableOpacity>
                </ImageBackground>
              </>
            ) : (
              <>
                <Text style={tw`font-poppins text-xs text-neutral-600`}>
                  Capture a photo with a words or paragraph
                </Text>
                <TouchableOpacity
                  style={tw`flex-col items-center justify-center w-full h-[20rem] rounded-3xl border border-accent-2 bg-accent-3`}
                  onPress={handleCapturePhoto}>
                  <FeatherIcon name="camera" size={100} color="#FFB0B0" />
                </TouchableOpacity>
                <Text style={tw`font-poppins text-xs text-neutral-600`}>or</Text>
                <TouchableOpacity
                  style={tw`flex-row items-center justify-center w-full p-3 gap-x-2 rounded-xl border border-accent-1 bg-accent-3`}
                  onPress={handleChoosePostPhoto}>
                  <FeatherIcon name="image" size={14} color="#555" />
                  <Text style={tw`font-poppins text-xs text-neutral-600`}>Browser Gallery</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          {/* <Text>{recognizedTexts?.text}</Text> */}
          <TextEditor initialText={recognizedTexts?.text} richTextHandle={richTextHandle} />
        </DefaultLayout>
      )}
    </>
  );
}

export default HomeScreen;
