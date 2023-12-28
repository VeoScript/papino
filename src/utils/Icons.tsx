import React from 'react';
import Octicon from 'react-native-vector-icons/Octicons';
import FeIcon from 'react-native-vector-icons/Feather';

Octicon.loadFont();
FeIcon.loadFont();

export interface IconProps {
  size: number;
  name: string;
  color: string;
}

export const OcticonIcon = ({size, name, color}: IconProps): JSX.Element => (
  <Octicon name={name} size={size} color={color} />
);

export const FeatherIcon = ({size, name, color}: IconProps): JSX.Element => (
  <FeIcon name={name} size={size} color={color} />
);
