import React, {FC} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';
import styles from './styles';

export interface DefaultModalProps extends Partial<ModalProps> {
  closeModal?: () => void;
}

const DefaultModal: FC<DefaultModalProps> = ({
  isVisible,
  children,
  closeModal,
  ...props
}) => {
  return (
    <Modal
      {...props}
      isVisible={isVisible}
      propagateSwipe
      avoidKeyboard
      onBackdropPress={closeModal}
      style={styles.container}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.modalView}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default DefaultModal;
