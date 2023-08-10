import React, {useCallback, useMemo} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import CloseButton from '../../../../components/CloseButton';
import TextInputWrapper from '../../../../components/TextInputWrapper';
import TextWrapper from '../../../../components/TextWrapper';
import {IService} from '../../../../models/types';
import styles from './styles';

interface Props {
  limit?: number;
  label?: string;
  style?: StyleProp<ViewStyle>;
  defaultValue?: IService[];
  showUploadButton?: boolean;
  showDeleteButton?: boolean;
  onFilePress?(file: IService): void;
  services: IService[];
  setServices: React.Dispatch<React.SetStateAction<IService[]>>;
}

const ServicesInputs = ({
  limit,
  label,
  style,
  services,
  setServices,
  showUploadButton = true,
  showDeleteButton = true,
  onFilePress,
}: Props) => {
  const onDeletePress = async (item: IService) => {
    if (item.currentStatus === 'new') {
      setServices(services.filter(service => service?.id !== item.id));
    } else {
      const editedServices = services.map<IService>(service =>
        service?.id === item.id
          ? {...service, currentStatus: 'deleted'}
          : service,
      );
      setServices(editedServices);
    }
  };

  const onAddPress = useCallback(async () => {
    const newService: IService = {
      id: services.length ? services[services.length - 1].id + 1 : 1,
      title: '',
      price: '',
      currentStatus: 'new',
    };

    setServices([...services, newService]);
  }, [services, setServices]);

  const renderAddButton = useCallback(() => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.flexCenter} onPress={onAddPress}>
          <View style={styles.addBtn}>
            <TextWrapper style={styles.btnTitle}>+ Add</TextWrapper>
          </View>
        </TouchableOpacity>
      </View>
    );
  }, [onAddPress]);

  const isLimitUnreached = useMemo(
    () => !limit || limit > services?.length,
    [services?.length, limit],
  );

  const filteredServices = services.filter(
    service => service.currentStatus !== 'deleted',
  );

  return (
    <View style={[styles.container, style]}>
      {!!label && <TextWrapper style={styles.label}>{label}</TextWrapper>}
      <View style={styles.list}>
        {filteredServices?.map(item => (
          <TouchableOpacity
            style={[styles.itemContainer, style]}
            onPress={onFilePress?.bind(this, item)}
            activeOpacity={onFilePress ? 0.8 : 1}
            key={item.id}>
            <View style={styles.input}>
              <TextInputWrapper
                containerStyle={styles.serviceTitle}
                value={item.title}
                onChangeText={(text: string) => {
                  setServices(prev =>
                    prev.map(service =>
                      service.id === item.id
                        ? {...service, title: text}
                        : service,
                    ),
                  );
                }}
              />
              <TextInputWrapper
                containerStyle={styles.servicePrice}
                value={item.price}
                onChangeText={(text: string) => {
                  setServices(prev =>
                    prev.map(service => {
                      if (service.id === item.id) {
                        service.price = text;
                      }
                      return service;
                    }),
                  );
                }}
              />
              {showDeleteButton && (
                <CloseButton
                  onPress={() => {
                    onDeletePress(item);
                  }}
                  style={styles.clearButton}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
        {showUploadButton && isLimitUnreached ? renderAddButton() : null}
      </View>
    </View>
  );
};

export default ServicesInputs;
