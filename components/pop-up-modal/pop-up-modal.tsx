import {
  View,
  Modal,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  ModalProps,
} from 'react-native';
import React, {FC} from 'react';
import {styles} from './pop-up-modal-style';
import {Button, Icon, Text} from '../../components';
import {IconTypes} from '../../assets/icons';
import {ColorType} from '../../theme';
import {PresetsName} from '../icon/icon.props';

interface IProps extends ModalProps {
  isModalVisible: boolean;
  onCloseModal: () => void;
  customContainerStyle?: ViewStyle;
  onBottonBtnPressed: () => void;
  titleText: string;
  desText?: string;
  bottomBtnText: string;
  centerIcon: IconTypes;
  btnColor: string;
  isDotViewVisible?: boolean;
  iconColor?: ColorType;
  isTxDisable?: boolean;
  backgroundModalStyle?: ViewStyle;
  onCancelBtnPressed?: () => void;
  bottomCancelBtnText?: string;
  leftBtnStyle?: ViewStyle;
  rightBtnStyle?: ViewStyle;
  leftBtnTextStyle?: TextStyle;
  centerIconPreset?: PresetsName;
}

export const PopUpModal: FC<IProps> = ({
  isModalVisible,
  onCloseModal,
  customContainerStyle,
  onBottonBtnPressed,
  titleText,
  desText,
  bottomBtnText,
  centerIcon,
  btnColor,
  isDotViewVisible,
  iconColor = 'black',
  isTxDisable,
  backgroundModalStyle,
  onCancelBtnPressed,
  bottomCancelBtnText,
  leftBtnStyle = {},
  rightBtnStyle = {},
  leftBtnTextStyle = {},
  centerIconPreset = 'large',
  ...rest
}) => {
  return (
    <View style={[styles.containerStyle, customContainerStyle]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={onCloseModal}
        {...rest}>
        <View style={[styles.modalContainerView, backgroundModalStyle]}>
          <View style={styles.centerViewStyle}>
            <TouchableOpacity
              style={styles.crossBtnStyle}
              onPress={onCloseModal}>
              <Icon
                icon="CloseIcon"
                preset="small"
                style={styles.closeIcon}
                iconColor="black"
              />
            </TouchableOpacity>
            <Icon
              icon={centerIcon}
              iconColor={iconColor}
              preset={centerIconPreset}
              style={styles.centerIconStyle}
            />
            {isDotViewVisible && <View style={styles.dotViewStyle} />}
            {isTxDisable ? (
              <Text
                preset="header"
                style={styles.txtTitleStyle}
                text={titleText}
              />
            ) : (
              <Text
                preset="header"
                style={styles.txtTitleStyle}
                tx={titleText}
              />
            )}
            {desText &&
              (isTxDisable ? (
                <Text
                  preset="header"
                  style={styles.txtDesStyle}
                  text={desText}
                />
              ) : (
                <Text preset="header" style={styles.txtDesStyle} tx={desText} />
              ))}
            <View style={styles.containerViewStyle}>
              {onCancelBtnPressed && (
                <Button
                  style={[
                    styles.btnBottomStyle,
                    {backgroundColor: btnColor},
                    leftBtnStyle,
                  ]}
                  onPress={onCancelBtnPressed}
                  bottom={false}
                  preset="secondary"
                  customTextStyle={leftBtnTextStyle}
                  tx={bottomCancelBtnText}
                />
              )}
              <Button
                style={[
                  styles.btnBottomStyle,
                  {backgroundColor: btnColor},
                  rightBtnStyle,
                ]}
                testID={'PUM-done-button'}
                onPress={onBottonBtnPressed}
                bottom={false}
                preset="secondary"
                tx={bottomBtnText}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export type PopUpModalProps = IProps;
