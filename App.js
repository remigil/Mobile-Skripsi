import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import rootStore from './src/redux/store';
import 'react-native-gesture-handler';
import moment from 'moment';
require('moment/locale/id');
import {AppNavigation} from './src/screen/navigations';
import {Alert, BackHandler, Linking, LogBox} from 'react-native';
import VersionCheck from 'react-native-version-check';
// import React, { Fragment } from 'react';
// import LoginController from './LoginController';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
  'Warning: Each child in a list should have a unique "key" prop.',
  `Parse Error. Your app's play store page doesn't seem to have latest app version info.`,
  `undefined is not an object (evaluating '_yield$providers$opti.version')`,
  `null is not an object (evaluating 'RNVersionCheck.country')`,
  'No info about this app.'
]);
// const App = () => {return (<LoginController/>);};

export default App = () => {
  useEffect(() => {
    moment.locale('id');
  }, []);
  const {store, persistor} = rootStore();

  useEffect(() => {
    checkUpdateNeeded();
  }, []);

  const checkUpdateNeeded = async () => {
    let updateNeeded = await VersionCheck.needUpdate();
    if (updateNeeded?.isNeeded) {
      //Alert the user and direct to the app url
      Alert.alert(
        'Please Update',
        'You will have to update your app to the latest version to continue using.',
        [
          {
            text: 'Update',
            onPress: () => {
              BackHandler.exitApp();
              Linking.openURL(updateNeeded.storeUrl);
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};
