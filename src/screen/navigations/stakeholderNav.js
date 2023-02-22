import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Stakeholder, StakeholderWebview} from '../stakeholder';

const Stack = createStackNavigator();
const StakeholderNavigator = () => {
  return (
    <Stack.Navigator
      key="nav.stakeholder"
      screenOptions={{headerMode: 'none'}}
      initialRouteName="stakeholder.index">
      <Stack.Screen
        name="stakeholder.index"
        component={Stakeholder}
        options={{
          tabBarShowLabel: false,
        }}
      />
      <Stack.Screen name="stakeholder.webview" component={StakeholderWebview} />
    </Stack.Navigator>
  );
};

export default StakeholderNavigator;
