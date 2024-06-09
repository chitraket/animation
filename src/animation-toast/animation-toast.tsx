import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import {Toast} from './components';

const AnimationToast = () => {
  const toastRef = useRef<any>({});
  return (
    <>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() =>
          toastRef.current.show({
            title: 'Successfully Toasted',
            description: 'Success Toast',
            type: 'success',
          })
        }>
        <Text>Success</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() =>
          toastRef.current.show({
            type: 'warning',
            title: 'Warning Toast',
            description: 'Could not Save.',
          })
        }>
        <Text>Warning</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() =>
          toastRef.current.show({
            type: 'error',
            title: 'Error Toast !',
            description: `This didn't work.`,
          })
        }>
        <Text>Error</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() =>
          toastRef.current.show({
            title: 'Success Toast',
            description: 'Hello Toast!',
          })
        }>
        <Text>Default</Text>
      </TouchableOpacity>
      <Toast ref={toastRef} />
    </>
  );
};

export default AnimationToast;

const styles = StyleSheet.create({
  buttonStyle: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
  },
});
