import {TextInputProps, TextStyle} from 'react-native';

export enum variantEnum {
  outlined = 'outlined',
  standard = 'standard',
}

interface AnimationTextInputMethods {
  focus: () => void;
  blur: () => void;
  isFocused: Boolean;
  clear: () => void;
}

interface AnimationTextInputProps extends TextInputProps {
  placeholder?: string;
  fontSize?: number;
  fontColor?: string;
  fontFamily?: string;
  paddingVertical?: number;
  paddingHorizontal?: number;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  trailingIcon?: JSX.Element;
  characterCount?: number;
  characterCountFontSize?: number;
  characterCountColor?: string;
  assistiveText?: string;
  assistiveTextFontSize?: number;
  assistiveTextColor?: string;
  assistiveFontFamily?: string;
  errorFontSize?: number;
  errorFontFamily?: string;
  error?: string;
  errorColor?: string;
  assistiveTextStyle?: TextStyle;
  errorStyle?: TextStyle;
  counterTextStyle?: TextStyle;
  variant?: 'outlined' | 'standard';
}

export type {AnimationTextInputProps, AnimationTextInputMethods};
