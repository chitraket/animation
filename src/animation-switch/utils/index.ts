export const getStyles = (type: string) => {
  switch (type) {
    case 'wrapper':
      return {
        width: 50,
        height: 28,
        padding: 2,
      };
    default:
      return {
        width: 45,
        height: 15,
        padding: 0,
      };
  }
};
