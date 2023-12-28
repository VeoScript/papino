/**
 * @format
 */

import {AppRegistry, FlatList, ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

if (Text.defaultProps == null) {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
  TextInput.defaultProps.autoComplete = 'off';
}

if (TouchableOpacity.defaultProps == null) {
  TouchableOpacity.defaultProps = TouchableOpacity.defaultProps || {};
  TouchableOpacity.defaultProps.activeOpacity = 0.5;
}

if (ScrollView.defaultProps == null) {
  ScrollView.defaultProps = ScrollView.defaultProps || {};
  ScrollView.defaultProps.showsVerticalScrollIndicator = false;
}

if (FlatList.defaultProps == null) {
  FlatList.defaultProps = FlatList.defaultProps || {};
  FlatList.defaultProps.showsVerticalScrollIndicator = false;
}

AppRegistry.registerComponent(appName, () => App);
