type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export default {
  size: {
    small: 12,
    default: 14,
    middle: 16,
    big: 22,
    large: 28,
  },
  weight: {
    thin: '400' as FontWeight,
    normal: '500' as FontWeight,
    medium: '600' as FontWeight,
    bold: '700' as FontWeight,
  },
};
