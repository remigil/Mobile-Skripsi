import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Divider, Searchbar} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {Bg_K31, IconCari, Panduan1, Panduan2} from '../../../../assets/Assets';
import {BaseContainer} from '../../../../component';

export default props => {
  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Pusat Bantuan',
        backIconStyle: true,
        titleStyle: {
          color: '#003A91',
          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.navigate('HalamanFaq');
        },
      }}>
      <ImageBackground
        style={{
          flex: 1,
        }}
        source={Bg_K31}>
        <View
          style={{
            marginHorizontal: 30,
          }}>
          <Text
            style={{
              color: '#003A91',
              marginTop: 13,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Saya Ingin Melaporkan Kecelakaan
          </Text>
          <View
            style={{
              backgroundColor: '#FFEDED',
              paddingVertical: 14,
              paddingHorizontal: 18,
              borderRadius: 7,
              marginTop: 13,
            }}>
            <Text
              style={{
                color: '#4E4E4E',
                lineHeight: 16,
              }}>
              {<Text style={{fontWeight: 'bold'}}>Perhatian!</Text>} Pelaporan
              {<Text style={{fontWeight: 'bold'}}> Panic Button </Text>}
              bersifat {<Text style={{fontWeight: 'bold'}}> Genting</Text>},
              anda akan dituntut{' '}
              {<Text style={{fontWeight: 'bold'}}>jika melaporkan</Text>}{' '}
              pelaporan {<Text style={{fontWeight: 'bold'}}>palsu</Text>}.
            </Text>
          </View>
          <Text
            style={{
              color: '#000000',
              textAlign: 'left',
              marginTop: 19,
              lineHeight: 20,
            }}>
            Hai , Aplikasi K3i ini memfasilitasi anda apabila ingin melaporkan
            kejadian kecelakaan yang terjadi disekitar anda saat ini, agar kami
            dapat mengetahui dan memproses kejadian yang telah dilaporkan.
          </Text>
          <Divider style={{marginTop: 14, backgroundColor: '#ACACAC'}} />
          <Text
            style={{
              color: '#003A91',
              marginTop: 13,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            Cara Pertama Melaporkan Kecelakaan
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <View style={{paddingVertical: 10}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 12,
                      backgroundColor: '#D9D9D9',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'black'}}>1</Text>
                  </View>
                </View>
                <Text style={{color: 'black', fontSize: 12, marginLeft: 6}}>
                  Klik tombol{' '}
                  {<Text style={{fontWeight: 'bold'}}>Panic Button</Text>}
                  {`\n`}di menu Home
                </Text>
              </View>
              <Image source={Panduan1} style={{marginTop: 10}} />
            </View>
            <View style={{paddingVertical: 10}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 12,
                      backgroundColor: '#D9D9D9',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'black'}}>2</Text>
                  </View>
                </View>
                <Text style={{color: 'black', fontSize: 12, marginLeft: 6}}>
                  Klik tombol{' '}
                  {<Text style={{fontWeight: 'bold'}}>Panic Button</Text>}
                  {`\n`}di menu Home
                </Text>
              </View>
              <Image source={Panduan2} style={{marginTop: 10}} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
  },
  item: {
    marginVertical: 5,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4E4E4E',
    paddingBottom: 9,
  },
});
