import React from 'react';
import {View, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDrawerStatus} from '@react-navigation/drawer';
import {FocusAwareStatusBar} from './statusBarUseFocused';
export default ({backgroundColor, statusBarProps}) => {
  const StatusBarHeight = StatusBar.currentHeight;
  const isOpenDrawer = useDrawerStatus();
  return <StatusBar barStyle="light-content" backgroundColor={'#01796F'} />;
  // if (isOpenDrawer == 'closed') {
  //   return (
  //     <View style={{height: StatusBarHeight, width: '100%'}}>
  //       <LinearGradient
  //         start={{x: 1.0, y: 1.0}}
  //         end={{x: 0.0, y: 0.4}}
  //         locations={[0, 0.7]}
  //         colors={['#01796F', '#082A5B']}
  //         style={{flex: 1}}>
  //         <StatusBar
  //           barStyle="light-content"
  //           translucent={true}
  //           backgroundColor={
  //             isOpenDrawer == 'closed' ? 'transparent' : '#01796F'
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
  //         colors={['#01796F', '#082A5B']}
  //         style={{flex: 1}}>
  //         <StatusBar
  //           barStyle="light-content"
  //           translucent={true}
  //           backgroundColor={
  //             isOpenDrawer == 'closed' ? 'transparent' : '#01796F'
  //           }
  //         />
  //       </LinearGradient>
  //     </View>
  //   );
  // }
};
