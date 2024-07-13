export const getStyles = (type: string) => {
  switch (type) {
    case 'lg':
      return {
        fontSize: 24,
      };
    case 'md':
      return {
        fontSize: 18,
      };
    default:
      return {
        fontSize: 12,
      };
  }
};
