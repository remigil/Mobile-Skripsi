import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import VersionCheck from 'react-native-version-check';
import Constanta from '../../lib/Constanta';

export default props => {
  // const checkversion = VersionCheck.getLatestVersion().then(latestVersion => {
  //   console.log(latestVersion); // 0.1.2
  // });

  const [latestVersion, setLatestVersion] = useState([]);
  const [loading, setLoading] = useState(true);

  VersionCheck?.getLatestVersion().then(latestVersion => {
    setLoading(false);
    setLatestVersion(latestVersion);
    // console.log(latestVersion); // 0.1.2
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <StatusBar animated={true} backgroundColor="#01796F" hidden={false} />
      <View>
        <Image
          source={require('../../assets/Bogor_ngawas.png')}
          style={{
            width: widthPercentageToDP('50%'),
            height: widthPercentageToDP('50%'),
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            // fontWeight: '700',
            color: '#01796F',
            fontSize: widthPercentageToDP('5%'),
            marginTop: widthPercentageToDP('5%'),
            ...Constanta({
              font: 'bold',
            }),
          }}>
          Wilujeung Sumping
        </Text>
      </View>

      <View>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: heightPercentageToDP('2%'),
            ...Constanta({
              font: 'regular',
            }),
            color: '#9C9D9E',
          }}>
          Geus Boga Akun?
        </Text>
        <Pressable
          style={{
            backgroundColor: '#01796F',
            width: widthPercentageToDP('80%'),
            paddingVertical: widthPercentageToDP('4%'),
            borderRadius: widthPercentageToDP('2%'),
          }}
          onPress={() => props.navigation.navigate('auth.login')}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              ...Constanta({
                font: 'regular',
              }),
            }}>
            Masuk
          </Text>
        </Pressable>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: heightPercentageToDP('2%'),
            ...Constanta({
              font: 'regular',
            }),
            color: '#01796F',
          }}>
          Atau
        </Text>
        <Pressable
          onPress={() => props.navigation.navigate('auth.daftar')}
          style={{
            backgroundColor: 'white',
            width: widthPercentageToDP('80%'),
            paddingVertical: widthPercentageToDP('4%'),
            borderRadius: widthPercentageToDP('2%'),
            borderColor: '#01796F',
            borderWidth: 1,
          }}>
          <Text
            style={{
              color: '#01796F',
              textAlign: 'center',
              ...Constanta({
                font: 'regular',
              }),
            }}>
            Daftar
          </Text>
        </Pressable>
        {loading ? (
          <ActivityIndicator color="#01796F" />
        ) : (
          <>
            {latestVersion == undefined || null ? (
              <Text
                style={{
                  ...Constanta({
                    font: 'semibold',
                  }),
                  textAlign: 'center',
                  color: '#01796F',
                  marginTop: 3,
                }}>
                {' '}
                versi 1.0
              </Text>
            ) : (
              <Text
                style={{
                  ...Constanta({
                    font: 'semibold',
                  }),
                  textAlign: 'center',
                  color: '#003A91',
                  marginTop: 3,
                }}>
                versi {latestVersion}
              </Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};
