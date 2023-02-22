import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';

// import {ActionBarProps} from './ActionBarContainer';
// import {AppColor} from '../../../assets/css';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import StatusBarContainer from './statusBarContainer';
// import StatusBarTemplate from './StatusBarTemplate';
// import ModalLoading from '../modal/modalLoading';
import DialogContainer, {BasicAlertProps} from './dialogContainer';
import ActionBarContainer, {ActionBarProps} from './actionBarContainer';
import {FocusAwareStatusBar} from './statusBarUseFocused';
// import StatusBarContainer from './statusBarContainer';
import {useDrawerStatus} from '@react-navigation/drawer';
export default ({
  withBasicAlert = false,
  withActionBar = false,
  actionBarProps = ActionBarProps,
  basicAlertProps = BasicAlertProps,
  statusBarProps = {
    backgroundColor: null,
    barStyle: 'dark-content',
  },
  fixedHeightToWindow = true,
  loading = true,
  // isHome=false,
  ...props
}) => {
  const isOpen = useDrawerStatus();

  return (
    <View style={{}}>
      <StatusBarContainer backgroundColor={'#003A91'} statusBarProps={'#fff'} />
      <SafeAreaView>
        <View
          style={{
            height: fixedHeightToWindow ? heightPercentageToDP('100%') : 'auto',
            backgroundColor: 'white',
          }}>
          {withActionBar && (
            <ActionBarContainer {...actionBarProps} {...props} />
          )}
          {props?.children}
          {withBasicAlert && <DialogContainer {...basicAlertProps} />}
          {/* {loading && <ModalLoading />} */}
        </View>
      </SafeAreaView>
    </View>
  );
};
