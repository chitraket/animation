import {animation} from '../public';

export const getStyles = (type: string) => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: '#def1d7',
        titleColor: '#1f8722',
        descriptionColor: '#1f8722',
        animationSource: animation.success,
      };
    case 'warning':
      return {
        backgroundColor: '#fef7ec',
        titleColor: '#f08135',
        descriptionColor: '#f08135',
        animationSource: animation.warning,
      };
    case 'error':
      return {
        backgroundColor: '#fae1db',
        titleColor: '#d9100a',
        descriptionColor: '#d9100a',
        animationSource: animation.error,
      };
    default:
      return {
        backgroundColor: 'white',
        titleColor: 'black',
        descriptionColor: 'gray',
        animationSource: animation.success,
      };
  }
};
