import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ImageBackground, Alert} from 'react-native';

import tw from '../styles/tailwind';
import {FeatherIcon} from '../utils/Icons';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import DefaultLayout from '../components/layouts/DefaultLayout';
import Loading from '../components/ui/Loading';
import TextEditor from '../components/ui/TextEditor';
import SavePDFModal from '../components/ui/Modals/SavePDFModal';

function HomeScreen(): JSX.Element {
  // for global states...
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [recognizedTexts, setRecognizedTexts] = useState<any>(null);
  const [finalTextValue, setFinalTextValue] = useState<string>('');

  // for save pdf modal states...
  const [isSavingPDF, setIsSavingPDF] = useState<boolean>(false);
  const [isVisibleSaveModal, setIsVisibleSaveModal] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    setFinalTextValue(recognizedTexts?.text);
  }, [recognizedTexts?.text]);

  const handleResetAll = useCallback(() => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to clear all of generated results? This cannot be undone.',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'default',
          onPress: () => {
            setCapturedImage('');
            setRecognizedTexts(null);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  }, []);

  const richTextHandle = useCallback((descriptionText: string): void => {
    if (descriptionText) {
      setFinalTextValue(descriptionText);
    } else {
      setFinalTextValue('');
    }
  }, []);

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
        setIsGenerating(false);
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

  const handleChoosePhoto = useCallback((): void => {
    let options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, async response => {
      setIsGenerating(true);

      if (response.didCancel) {
        setIsGenerating(false);
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

  const handleSave = useCallback(async (): Promise<void> => {
    if (fileName !== '') {
      setIsSavingPDF(true);
      try {
        const options = {
          html: finalTextValue,
          fileName: fileName,
          directory: 'PapinoFiles',
        };
        const file = await RNHTMLtoPDF.convert(options);
        Alert.alert('Success', `PDF saved to ${file.filePath}`);
        setIsSavingPDF(false);
        setFileName('');
        setIsVisibleSaveModal(false);
      } catch (error: any) {
        setIsSavingPDF(false);
        Alert.alert('Error', error.message);
      }
    } else {
      Alert.alert('Warning', 'File name is required.');
    }
  }, [fileName, finalTextValue]);

  return (
    <>
      {isGenerating ? (
        <Loading />
      ) : (
        <>
          <DefaultLayout>
            <View style={tw`flex-col items-center w-full my-5 px-5 gap-y-3`}>
              {capturedImage ? (
                <>
                  {recognizedTexts?.text === '' ? (
                    <Text style={tw`px-3 font-poppins text-xs text-center text-red-600`}>
                      There's no words/paragraph detected in this image! Try again.
                    </Text>
                  ) : (
                    <Text style={tw`px-3 font-poppins text-xs text-center text-green-600`}>
                      Generated Successfully
                    </Text>
                  )}
                  <ImageBackground
                    style={tw`relative w-full overflow-hidden rounded-xl shadow-md shadow-red-600`}
                    resizeMode="cover"
                    source={{
                      uri: capturedImage,
                    }}>
                    <View style={tw`absolute w-full h-full bg-black opacity-90`} />
                    <Image
                      style={tw`w-full h-[26.7rem]`}
                      resizeMode="contain"
                      source={{
                        uri: capturedImage,
                      }}
                    />
                    <TouchableOpacity
                      style={tw`absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-70`}
                      onPress={handleResetAll}>
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
                    style={tw`flex-col items-center justify-center w-full h-[20rem] rounded-3xl shadow-md shadow-red-600 border border-accent-2 bg-accent-3`}
                    onPress={handleCapturePhoto}>
                    <FeatherIcon name="camera" size={100} color="#FFB0B0" />
                  </TouchableOpacity>
                  <Text style={tw`font-poppins text-xs text-neutral-600`}>or</Text>
                  <TouchableOpacity
                    style={tw`flex-row items-center justify-center w-full p-3 gap-x-2 rounded-xl shadow-md shadow-red-600 border border-accent-1 bg-accent-3`}
                    onPress={handleChoosePhoto}>
                    <FeatherIcon name="image" size={14} color="#555" />
                    <Text style={tw`font-poppins text-xs text-neutral-600`}>Browse Gallery</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <TextEditor
              initialText={recognizedTexts?.text}
              richTextHandle={richTextHandle}
              handleClear={handleResetAll}
              handleSave={() => setIsVisibleSaveModal(true)}
            />
          </DefaultLayout>
          <SavePDFModal
            isSaving={isSavingPDF}
            fileName={fileName}
            setFileName={setFileName}
            isVisible={isVisibleSaveModal}
            setIsVisible={setIsVisibleSaveModal}
            onSave={handleSave}
          />
        </>
      )}
    </>
  );
}

export default HomeScreen;
