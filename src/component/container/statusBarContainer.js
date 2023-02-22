import React from 'react';
import {View, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDrawerStatus} from '@react-navigation/drawer';
import {FocusAwareStatusBar} from './statusBarUseFocused';
export default ({backgroundColor, statusBarProps}) => {
  const StatusBarHeight = StatusBar.currentHeight;
  const isOpenDrawer = useDrawerStatus();
  return <StatusBar barStyle="light-content" backgroundColor={'#003A91'} />;
  // if (isOpenDrawer == 'closed') {
  //   return (
  //     <View style={{height: StatusBarHeight, width: '100%'}}>
  //       <LinearGradient
  //         start={{x: 1.0, y: 1.0}}
  //         end={{x: 0.0, y: 0.4}}
  //         locations={[0, 0.7]}
  //         colors={['#003A91', '#082A5B']}
  //         style={{flex: 1}}>
  //         <StatusBar
  //           barStyle="light-content"
  //           translucent={true}
  //           backgroundColor={
  //             isOpenDrawer == 'closed' ? 'transparent' : '#003A91'
  //           }
  //         />
  //       </LinearGradient>
  //     </View>
  //   );
  // } else {
  //   return (
  //     <View style={{height: StatusBarHeight, width: '100%'}}>
  //       <LinearGradient
  //         start={{x: 1.0, y: 1.0}}
  //         end={{x: 0.0, y: 0.4}}
  //         locations={[0, 0.7]}
  //         colors={['#003A91', '#082A5B']}
  //         style={{flex: 1}}>
  //         <StatusBar
  //           barStyle="light-content"
  //           translucent={true}
  //           backgroundColor={
  //             isOpenDrawer == 'closed' ? 'transparent' : '#003A91'
  //           }
  //         />
  //       </LinearGradient>
  //     </View>
  //   );
  // }
};
