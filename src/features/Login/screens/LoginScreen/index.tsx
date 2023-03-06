import React from 'react';
import {SafeAreaView} from 'react-native';
import LoginForm from '../../components/LoginForm';
import {styles} from './styles';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LoginForm />
    </SafeAreaView>
  );
};

export default LoginScreen;
