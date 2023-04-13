import React, {useState} from 'react';
import {
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {BaseContainer} from '../../component';


import {BasicAlertProps} from '../../component/container/dialogContainer';
import {useSelector} from 'react-redux';

import Constanta from '../../lib/Constanta';


export default props => {
  const {auth} = useSelector(state => state);

 
  const [basicAlertProps] = useState(BasicAlertProps);

  return (
    <BaseContainer
      {...props}
      withActionBar={true}
      withBasicAlert={true}
      basicAlertProps={basicAlertProps}
      actionBarProps={{
        containerStyle: {
          paddingVertical: heightPercentageToDP('1%'),
        },
        title: 'BOGOR NGAWAS',
        titleStyle: {
          color: '#fff',
          backgrounColor: '#00000040',
          textAlign: 'center',
          ...Constanta({
            font: 'bold',
          }),
        },
        onBackPressed: () => {
          props.navigation.openDrawer();
        },
      }}>


    </BaseContainer>
  );
};