import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  useWindowDimensions,
  Image,
  ScrollView,
  Pressable,
  Text,
  Dimensions,
} from 'react-native';
import {ActivityIndicator, Divider} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {BaseContainer} from '../../../component';
import Constanta from '../../../lib/Constanta';
import {GetTripOn, GetTripOnHistory} from '../../../repositories/tripon';

const FirstRoute = ({...props}) => {
  const scrWidth = Dimensions.get('screen').width;
  const scrHeight = Dimensions.get('screen').height;
  let lebarGambar,
    tinggiGambar = {};

  if (scrWidth > 411 || scrHeight <= 731) {
    lebarGambar = {width: widthPercentageToDP('41.5%')};
    tinggiGambar = {height: heightPercentageToDP('30%')};
  } else {
    lebarGambar = {width: widthPercentageToDP('52%')};
    tinggiGambar = {height: heightPercentageToDP('32%')};
  }

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    GetTripOn()
      .then(response => {
        console.log({responsesss: response.data.data});

        setDataSchedule(response.data.data);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [dataTripon, setDataTripon] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);
  // console.log('ini data tripon yang lu mau', dataTripon);
  console.log('ini data schedule', dataSchedule);

  const navigation = useNavigation();

  let schedule = [];

  return (
    <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{
            marginTop: heightPercentageToDP('2%'),
            // alignItems: 'center',
          }}>
          {dataSchedule[0] == null ? (
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/tripon/icon-tidak-ada-data.png')}
                resizeMode="contain"
                style={{
                  ...lebarGambar,
                  ...tinggiGambar,
                }}
              />
              <Text
                style={{
                  color: '#4E4E4E',
                  fontSize: widthPercentageToDP('6%'),
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                Belum ada data Trip On
              </Text>
            </View>
          ) : (
            <>
              {dataSchedule.map(item => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('CardHistory', item);
                  }}
                  key={item.id}
                  style={{
                    height: responsiveHeight(10),
                    padding: 15,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          width: responsiveWidth(10),
                          height: responsiveHeight(10),
                        }}
                        source={require('../../../assets/icon_bottom/TripOn_ON.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: responsiveWidth(5),
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          marginBottom: 10,
                          ...Constanta({
                            font: 'semibold',
                          }),
                        }}>
                        {item.district_start} - {item.district_end}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          ...Constanta({
                            font: 'regular',
                          }),
                          fontSize: responsiveFontSize(1.6),
                        }}>
                        {moment(item.created_at).format('DD MMMM YYYY')}
                      </Text>
                    </View>
                  </View>
                  <Divider style={{marginTop: 10, height: 1.5}} />
                </Pressable>
              ))}
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const SecondRoute = ({...props}) => {
  const scrWidth = Dimensions.get('screen').width;
  const scrHeight = Dimensions.get('screen').height;
  let lebarGambar,
    tinggiGambar = {};

  if (scrWidth > 411 || scrHeight <= 731) {
    lebarGambar = {width: widthPercentageToDP('41.5%')};
    tinggiGambar = {height: heightPercentageToDP('30%')};
  } else {
    lebarGambar = {width: widthPercentageToDP('52%')};
    tinggiGambar = {height: heightPercentageToDP('32%')};
  }

  const layout = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    GetTripOnHistory()
      .then(response => {
        console.log({response: response.data.data});

        setDataHistory(response.data.data);
      })
      .catch(err => {
        console.log({err});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // const [dataTripon, setDataTripon] = useState([]);
  // console.log('ini data tripon yang lu mau', dataTripon);
  const [dataHistory, setDataHistory] = useState({});

  // console.log('ini validity period', asd.)
  console.log('ini waktu', moment().format('YYYY-MM-DD H:mm:ss'));

  const navigation = useNavigation();
  return (
    <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{
            marginTop: heightPercentageToDP('2%'),
            // alignItems: 'center',
          }}>
          {dataHistory[0] == null ? (
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/tripon/icon-tidak-ada-data.png')}
                resizeMode="contain"
                style={{
                  ...lebarGambar,
                  ...tinggiGambar,
                }}
              />
              <Text
                style={{
                  color: '#4E4E4E',
                  fontSize: widthPercentageToDP('6%'),
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                Belum ada data Trip On
              </Text>
            </View>
          ) : (
            <>
              {dataHistory.map(item => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('CardHistory', item);
                  }}
                  key={item.id}
                  style={{
                    height: responsiveHeight(10),
                    padding: 15,
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          width: responsiveWidth(10),
                          height: responsiveHeight(10),
                        }}
                        source={require('../../../assets/icon_bottom/TripOn_ON.png')}
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      style={{
                        marginLeft: responsiveWidth(5),
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          marginBottom: 10,
                          ...Constanta({
                            font: 'semibold',
                          }),
                        }}>
                        {item.district_start} - {item.district_end}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          ...Constanta({
                            font: 'regular',
                          }),
                          fontSize: responsiveFontSize(1.6),
                        }}>
                        {moment(item.created_at).format('DD MMMM YYYY')}
                      </Text>
                    </View>
                  </View>
                  <Divider style={{marginTop: 10, height: 1.5}} />
                </Pressable>
              ))}
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample({props}) {
  const scrWidth = Dimensions.get('screen').width;
  const scrHeight = Dimensions.get('screen').height;
  let lebarGambar,
    tinggiGambar = {};

  if (scrWidth > 411 || scrHeight <= 731) {
    lebarGambar = {width: widthPercentageToDP('41.5%')};
    tinggiGambar = {height: heightPercentageToDP('30%')};
  } else {
    lebarGambar = {width: widthPercentageToDP('52%')};
    tinggiGambar = {height: heightPercentageToDP('32%')};
  }
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Schedule'},
    {key: 'second', title: 'History'},
  ]);

  const navigation = useNavigation();

  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'MyQR Tripon',
        backIconStyle: true,
        titleStyle: {
          color: '#FFF',
          backgrounColor: '#FCFDFF',
          textAlign: 'center',
          ...Constanta({
            font: 'bold',
          }),
        },
        onBackPressed: () => {
          navigation.goBack('Home');
        },
      }}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            labelStyle={{
              color: '#000',
              ...Constanta({
                font: 'semibold',
              }),
            }}
            style={{
              backgroundColor: 'white',
            }}
            indicatorStyle={{
              backgroundColor: '#003A91',
              height: 2,
            }}
          />
        )}
      />
    </BaseContainer>
  );
}
