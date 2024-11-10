import {View, ViewProps} from 'react-native';
import React from 'react';
import BlurBackground from './blurBackground';

type Props = ViewProps & {
  children?: React.ReactNode;
};

const BlurCard = ({...props}: React.PropsWithChildren<Props>): JSX.Element => {
  return (
    <View style={[props.style]}>
      {props.children}
      <BlurBackground numCircles={15} />
    </View>
  );
};

export default BlurCard;
