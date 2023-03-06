import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {TextStyle, ViewStyle} from 'react-native/types';

const useAnimatedStyleProperty = <T = string>(
  styleProperty: keyof ViewStyle | keyof TextStyle,
  initialValue: T,
) => {
  const animatedValue = useSharedValue(initialValue);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      [`${styleProperty}`]: animatedValue.value,
    };
  });

  return {animatedValue, animatedStyle};
};

export default useAnimatedStyleProperty;
