import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Linking,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import WebView from 'react-native-webview';
import Constanta from '../../../lib/Constanta';
import {BaseContainer} from '../../../component';

export default props => {
  const {params: paramsData} = props.route;
  const webviewref = useRef(null);
  const [goBack, setGoBack] = useState(false);
  const [goForward, setGoForward] = useState(false);
  const [url, setUrl] = useState(paramsData.url);

  const navigation = useNavigation();

  const Loading = () => (
    <ActivityIndicator
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      color="#135AAC"
      size="large"
    />
  );

  const backAction = () => {
    if (goBack) {
      webviewref.current.goBack();
    } else {
      navigation.goBack();
    }
    return true;
  };

  const forwardAction = () => {
    if (webviewref.current) webviewref.current.goForward();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [goBack]);

  let judul =
    paramsData.title == 'CCTV'
      ? paramsData.title + ' Terintegrasi - Korlantas PolrI'
      : paramsData.title;

  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: judul,
        backIconStyle: true,
        titleStyle: {
          color: 'white',
          ...Constanta({
            font: 'bold',
          }),
          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.goBack('Home');
        },
      }}>
      <View style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ffffff'} />
        <WebView
          ref={webviewref}
          startInLoadingState
          source={{
            // uri: 'http://103.154.174.85/home',
            // uri: paramsData.url,
            uri: url,
          }}
          renderLoading={Loading}
          onNavigationStateChange={navState => {
            setGoBack(navState.canGoBack);
            setGoForward(navState.canGoForward);
            setUrl(navState.url);
          }}
        />
        <View
          style={{
            backgroundColor: '#135AAC',
            padding: 12,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <TouchableOpacity disabled={!goBack} onPress={backAction}>
            <Text
              style={{
                color: 'white',
                ...Constanta({
                  font: 'semibold',
                }),
              }}>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={!goForward} onPress={forwardAction}>
            <Text
              style={{
                color: 'white',
                ...Constanta({
                  font: 'semibold',
                }),
              }}>
              Forward
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseContainer>
  );
};
