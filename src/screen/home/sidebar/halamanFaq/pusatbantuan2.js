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
  ScrollView,
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
          color: '#01796F',
          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => {
          props.navigation.navigate('HalamanFaq');
        },
      }}>
      <ScrollView>
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
                color: '#01796F',
                marginTop: 13,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Saya Ingin Melihat Lokasi ETLE
            </Text>
            <Text
              style={{
                color: '#000000',
                textAlign: 'left',
                marginTop: 19,
                lineHeight: 20,
              }}>
              Hai , ETLE merupakan sistem yang akan mencatat , mendeteksi , dan
              memotret pelanggaran dijalan raya melalui kemera CCTV. Dengan kata
              lain, ETLE adalah kamera pengintai yang dapat mendeteksi
              pelanggaran dalam berkendara.
            </Text>
            <Divider style={{marginTop: 14, backgroundColor: '#ACACAC'}} />
            <Text
              style={{
                color: '#01796F',
                marginTop: 13,
                fontSize: 14,
                fontWeight: 'bold',
              }}>
              Cara Melihat titik Kecelakaan terdekat
            </Text>
            <View>
              <Text style={{color: '#4E4E4E', marginTop: 9}}>Cara Pertama</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                }}>
                <View style={{paddingVertical: 10, marginRight: 5}}>
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
                    <Text style={{color: 'black', fontSize: 10, marginLeft: 5}}>
                      Buka{' '}
                      {
                        <Text style={{fontWeight: 'bold'}}>
                          Filter Titik Sebaran
                        </Text>
                      }
                      {`\n`}di menu filter pada{' '}
                      {<Text style={{fontWeight: 'bold'}}>home</Text>}
                    </Text>
                  </View>
                  <Image source={Panduan1} style={{marginTop: 10}} />
                </View>
                <View style={{paddingVertical: 10, marginLeft: 5}}>
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
                    <Text style={{color: 'black', fontSize: 10, marginLeft: 6}}>
                      Lalu Klik opsi{' '}
                      {<Text style={{fontWeight: 'bold'}}>“ETLE”</Text>} untuk
                      melihat{`\n`} titik ETLE disekitarmu
                    </Text>
                  </View>
                  <Image source={Panduan2} style={{marginTop: 10}} />
                </View>
                <View style={{paddingVertical: 10, alignItems: 'center'}}>
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
                        <Text style={{color: 'black'}}>3</Text>
                      </View>
                    </View>
                    <Text style={{color: 'black', fontSize: 10, marginLeft: 6}}>
                      Setelah anda menekan tombol{' '}
                      {<Text style={{fontWeight: 'bold'}}>“Terapkan”</Text>},
                      maka{`\n`}
                      {<Text style={{fontWeight: 'bold'}}>titik ETLE </Text>}
                      yang ada di radius posisi anda akan
                      {`\n`}muncul
                    </Text>
                  </View>
                  <Image source={Panduan2} style={{marginTop: 10}} />
                </View>
              </View>
            </View>
            <View style={{paddingBottom: 50}}>
              <Text style={{color: '#4E4E4E', marginTop: 9}}>Cara Kedua</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                <View style={{paddingVertical: 10, marginRight: 5}}>
                  <View style={{flexDirection: 'row', marginTop: 6}}>
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
                    <Text style={{color: 'black', fontSize: 10, marginLeft: 6}}>
                      Buka {<Text style={{fontWeight: 'bold'}}>Menu Peta</Text>}{' '}
                      di menu{`\n`}Navigasi
                    </Text>
                  </View>
                  <Image source={Panduan1} style={{marginTop: 15}} />
                </View>
                <View style={{paddingVertical: 10, marginLeft: 5}}>
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
                    <Text style={{color: 'black', fontSize: 10, marginLeft: 6}}>
                      Lalu Klik Icon{' '}
                      {<Text style={{fontWeight: 'bold'}}>“Filter”</Text>} pada{' '}
                      {`\n`}menu peta agar menampilkan{`\n`}opsi filter
                    </Text>
                  </View>
                  <Image source={Panduan2} style={{marginTop: 10}} />
                </View>
                <View style={{paddingVertical: 10}}>
                  <View style={{flexDirection: 'row', marginTop: 12}}>
                    <View style={{justifyContent: 'center'}}>
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 12,
                          backgroundColor: '#D9D9D9',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: 'black'}}>3</Text>
                      </View>
                    </View>
                    <Text style={{color: 'black', fontSize: 10, marginLeft: 6}}>
                      Pilih opsi ETLE pada pilihan{`\n`}filter
                    </Text>
                  </View>
                  <Image source={Panduan2} style={{marginTop: 18}} />
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
                        <Text style={{color: 'black'}}>4</Text>
                      </View>
                    </View>
                    <Text style={{color: 'black', fontSize: 10, marginLeft: 6}}>
                      Setelah anda menekan tombol{`\n`}“Terapkan”,maka titik
                      ETLE yang{`\n`}ada di radius posisi anda akan{`\n`}muncul
                    </Text>
                  </View>
                  <Image source={Panduan2} style={{marginTop: 10}} />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
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
