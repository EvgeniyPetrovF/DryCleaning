import {useEffect} from 'react';
import {withTiming} from 'react-native-reanimated';
import useAnimatedStyleProperty from '../../../common/hooks/useAnimatedStyleProperty';

const animationDuration = 300;

type UseAnimatedListType = {
  isLoading: boolean;
};

const useAnimatedList = ({isLoading}: UseAnimatedListType) => {
  const {animatedValue: listOpacity, animatedStyle: animatedOpacityStyle} =
    useAnimatedStyleProperty('opacity', 0);

  useEffect(() => {
    if (!isLoading) {
      listOpacity.value = withTiming(1, {duration: animationDuration});
    } else {
      listOpacity.value = 0;
    }
  }, [listOpacity, isLoading]);
  return {animatedOpacityStyle};
};

export default useAnimatedList;
