import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
} from 'react-native-reanimated';
import {textScale} from './utils';
import {colors} from './theme';
import {
  AnimationTextInputMethods,
  AnimationTextInputProps,
  variantEnum,
} from './types';

const AnimationTextInput = forwardRef<
  AnimationTextInputMethods,
  AnimationTextInputProps
>((props, ref) => {
  const {
    inactiveColor = colors.grey,
    activeColor = colors.primary,
    errorColor = colors.red,
    backgroundColor = colors.transparent,
    fontSize = textScale(14),
    fontColor = colors.black,
    fontFamily,
    error,
    errorFontSize = textScale(10),
    errorStyle,
    assistiveText,
    assistiveTextFontSize = textScale(10),
    assistiveTextColor = inactiveColor,
    assistiveTextStyle,
    characterCount,
    characterCountColor = inactiveColor,
    characterCountFontSize = textScale(10),
    counterTextStyle,
    paddingHorizontal = 12,
    paddingVertical = 12,
    style,
    placeholder = 'Input',
    trailingIcon,
    value: providedValue = '',
    variant = variantEnum.outlined,
    onChangeText,
    ...inputProps
  } = props;
  const [value, setValue] = useState(providedValue);

  const inputRef = useRef<TextInput>(null);
  const placeholderAnimated = useSharedValue(providedValue ? 1 : 0);
  const placeholderSize = useSharedValue(0);
  const colorAnimated = useSharedValue(0);

  const focus = () => inputRef.current?.focus();
  const blur = () => inputRef.current?.blur();
  const isFocused = () => Boolean(inputRef.current?.isFocused());
  const clear = () => {
    Boolean(inputRef.current?.clear());
    setValue('');
  };

  const errorState = useCallback(
    () => error !== null && error !== undefined,
    [error],
  );

  const handleFocus = () => {
    placeholderAnimated.value = withTiming(1);
    if (!errorState()) colorAnimated.value = withTiming(1);
    focus();
  };

  const handleBlur = () => {
    if (!value) placeholderAnimated.value = withTiming(0);
    if (!errorState()) colorAnimated.value = withTiming(0);
    blur();
  };

  const handleChangeText = (text: string) => {
    onChangeText && onChangeText(text);
    setValue(text);
  };

  const handlePlaceholderLayout = useCallback(
    ({nativeEvent}: {nativeEvent: {layout: {width: number}}}) => {
      const {width} = nativeEvent.layout;
      placeholderSize.value = width;
    },
    [placeholderSize],
  );

  const renderTrailingIcon = () => {
    if (trailingIcon) return trailingIcon;
    return <React.Fragment></React.Fragment>;
  };

  useEffect(() => {
    if (providedValue.length) placeholderAnimated.value = withTiming(1);
    setValue(providedValue);
  }, [providedValue, placeholderAnimated]);

  useEffect(() => {
    if (errorState()) {
      colorAnimated.value = 2;
    } else {
      colorAnimated.value = isFocused() ? 1 : 0;
    }
  }, [error, colorAnimated, errorState]);

  const animatedPlaceholderStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          placeholderAnimated.value,
          [0, 1],
          [0, -(paddingVertical + fontSize * 0.7)],
        ),
      },
      {
        scale: interpolate(placeholderAnimated.value, [0, 1], [1, 0.7]),
      },
      {
        translateX: interpolate(
          placeholderAnimated.value,
          [0, 1],
          [0, -placeholderSize.value * 0.2],
        ),
      },
    ],
  }));

  const animatedPlaceholderTextStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      colorAnimated.value,
      [0, 1, 2],
      [inactiveColor, activeColor, errorColor],
    ),
  }));

  const animatedPlaceholderSpacerStyles = useAnimatedStyle(() => ({
    width: interpolate(
      placeholderAnimated.value,
      [0, 1],
      [0, placeholderSize.value * 0.7 + 7],
      Extrapolate.CLAMP,
    ),
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderColor:
      placeholderSize.value > 0
        ? interpolateColor(
            colorAnimated.value,
            [0, 1, 2],
            [inactiveColor, activeColor, errorColor],
          )
        : inactiveColor,
  }));

  useImperativeHandle(ref, () => ({
    focus: handleFocus,
    blur: handleBlur,
    isFocused: isFocused(),
    clear: clear,
  }));

  const styles = StyleSheet.create({
    container: {
      ...(variant === variantEnum.standard
        ? {borderBottomWidth: 1}
        : {borderWidth: 1, borderRadius: 5}),
      alignSelf: 'stretch',
      flexDirection: 'row',
      backgroundColor,
    },
    inputContainer: {
      flex: 1,
      ...(variant === variantEnum.standard
        ? {paddingRight: paddingHorizontal}
        : {paddingHorizontal}),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical:
        Platform.OS !== 'android' ? paddingVertical : paddingVertical - 8,
    },
    input: {
      flex: 1,
      fontSize: textScale(fontSize),
      fontFamily,
      color: fontColor,
    },
    placeholder: {
      position: 'absolute',
      top: paddingVertical,
      ...(variant === variantEnum.standard
        ? {left: 0}
        : {left: paddingHorizontal}),
    },
    placeholderText: {
      fontSize: textScale(fontSize),
      fontFamily,
    },
    placeholderSpacer: {
      position: 'absolute',
      top: -1,
      left: paddingHorizontal - 3,
      backgroundColor: colors.white,
      height: 1,
    },
    errorText: {
      position: 'absolute',
      color: errorColor,
      fontSize: textScale(errorFontSize),
      bottom: -textScale(errorFontSize) - 7,
      ...(variant === variantEnum.standard
        ? {left: 0}
        : {left: paddingHorizontal}),
    },
    trailingIcon: {
      position: 'absolute',
      right: paddingHorizontal,
      alignSelf: 'center',
    },
    counterText: {
      position: 'absolute',
      color: errorState() ? errorColor : characterCountColor,
      fontSize: textScale(characterCountFontSize),
      bottom: -textScale(characterCountFontSize) - 7,
      right: paddingHorizontal,
    },
    assistiveText: {
      position: 'absolute',
      color: assistiveTextColor,
      fontSize: textScale(assistiveTextFontSize),
      bottom: -textScale(assistiveTextFontSize) - 7,
      left: paddingHorizontal,
    },
  });

  const placeholderStyle = useMemo(() => {
    return [styles.placeholder, animatedPlaceholderStyles];
  }, [styles.placeholder, animatedPlaceholderStyles]);

  return (
    <Animated.View style={[styles.container, animatedContainerStyle, style]}>
      <TouchableWithoutFeedback onPress={handleFocus}>
        <View style={styles.inputContainer}>
          <TextInput
            {...inputProps}
            ref={inputRef}
            style={styles.input}
            pointerEvents={isFocused() ? 'auto' : 'none'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            maxLength={characterCount ? characterCount : undefined}
            selectionColor={errorState() ? errorColor : activeColor}
            placeholder=""
            value={value}
          />
        </View>
      </TouchableWithoutFeedback>
      {trailingIcon && (
        <View style={styles.trailingIcon}>{renderTrailingIcon()}</View>
      )}
      <Animated.View
        style={[styles.placeholderSpacer, animatedPlaceholderSpacerStyles]}
      />
      <Animated.View
        style={placeholderStyle}
        onLayout={handlePlaceholderLayout}
        pointerEvents="none">
        <Animated.Text
          style={[styles.placeholderText, animatedPlaceholderTextStyles]}>
          {placeholder}
        </Animated.Text>
      </Animated.View>
      {characterCount && (
        <Text
          style={[
            styles.counterText,
            counterTextStyle,
          ]}>{`${value.length} / ${characterCount}`}</Text>
      )}
      {errorState() ? (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      ) : (
        assistiveText && (
          <Text style={[styles.assistiveText, assistiveTextStyle]}>
            {assistiveText}
          </Text>
        )
      )}
    </Animated.View>
  );
});

export default AnimationTextInput;
AnimationTextInput.displayName = 'AnimationTextInput';
