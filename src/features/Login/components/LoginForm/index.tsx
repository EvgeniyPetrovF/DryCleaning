import React from 'react';
import {View} from 'react-native';
import CustomButton from '../../../../components/CustomButton';
import TextInputWrapper from '../../../../components/TextInputWrapper';
import useLoginForm from '../../hooks/useLogin';
import {styles} from './styles';

const LoginForm = () => {
  const {isLoading, loginHandler, nickName, onChangeText, error} =
    useLoginForm();

  return (
    <View style={styles.formContainer}>
      <TextInputWrapper
        autoCapitalize="none"
        label="Your nickname"
        value={nickName}
        onChangeText={onChangeText}
        placeholder="Nickname"
        error={error}
        containerStyle={styles.bottomOffset}
      />
      <CustomButton
        label="Login"
        onPress={loginHandler}
        disabled={isLoading}
        pending={isLoading}
      />
    </View>
  );
};
export default LoginForm;
