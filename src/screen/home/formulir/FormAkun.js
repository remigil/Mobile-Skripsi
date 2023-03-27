import React, { useState } from 'react';
import { View, Text, StatusBar, Pressable, Image, TouchableOpacity } from 'react-native';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen';
import { IconEditData } from '../../../assets/Assets';


export default props => {
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={{marginTop: 12, marginLeft: 20, color: '#01796F', size: 14}}>
        Data Diri
      </Text>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{color: '#01796F', size: 14}}>Nama Lengkap</Text>
          <View
            style={{
              width: 321,
              height: 47,
              borderColor: '#CDD1E0',
              borderWidth: 1,
              borderRadius: 6,
              marginTop: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', size: 12, marginLeft: 16}}>
              Agil Almunawar
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 9,
              }}>
              <Text style={{color: 'black', size: 12, marginRight: 7}}>
                Edit data
              </Text>
              <IconEditData />
            </View>
          </View>
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{color: '#01796F', size: 14}}>
            Nomor Induk Kependudukan (NIK)
          </Text>
          <View
            style={{
              width: 321,
              height: 47,
              borderColor: '#CDD1E0',
              borderWidth: 1,
              borderRadius: 6,
              marginTop: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', size: 12, marginLeft: 16}}>
              3672819872129741
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 9,
              }}>
              <Text style={{color: 'black', size: 12, marginRight: 7}}>
                Edit data
              </Text>
              <IconEditData />
            </View>
          </View>
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{color: '#01796F', size: 14}}>Tanggal Lahir</Text>
          <View
            style={{
              width: 321,
              height: 47,
              borderColor: '#CDD1E0',
              borderWidth: 1,
              borderRadius: 6,
              marginTop: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', size: 12, marginLeft: 16}}>
              01 oktober 2000
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 9,
              }}>
              <Text style={{color: 'black', size: 12, marginRight: 7}}>
                Edit data
              </Text>
              <IconEditData />
            </View>
          </View>
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{color: '#01796F', size: 14}}>Kewarganegaraan</Text>
          <View
            style={{
              width: 321,
              height: 47,
              borderColor: '#CDD1E0',
              borderWidth: 1,
              borderRadius: 6,
              marginTop: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', size: 12, marginLeft: 16}}>
              Warga Negara Indonesia
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 9,
              }}>
              <Text style={{color: 'black', size: 12, marginRight: 7}}>
                Edit data
              </Text>
              <IconEditData />
            </View>
          </View>
        </View>
      </View>

      <Text style={{marginTop: 20, marginLeft: 20, color: '#01796F', size: 14}}>
        Data Lainnya
      </Text>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{color: '#01796F', size: 14}}>Nomor SIM</Text>
          <View
            style={{
              width: 321,
              height: 47,
              borderColor: '#CDD1E0',
              borderWidth: 1,
              borderRadius: 6,
              marginTop: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', size: 12, marginLeft: 16}}>
              3672819872129741
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 9,
              }}>
              <Text style={{color: 'black', size: 12, marginRight: 7}}>
                Edit data
              </Text>
              <IconEditData />
            </View>
          </View>
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{color: '#01796F', size: 14}}>Email</Text>
          <View
            style={{
              width: 321,
              height: 47,
              borderColor: '#CDD1E0',
              borderWidth: 1,
              borderRadius: 6,
              marginTop: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', size: 12, marginLeft: 16}}>
              rokik@gmail.com
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 9,
              }}>
              <Text style={{color: 'black', size: 12, marginRight: 7}}>
                Edit data
              </Text>
              <IconEditData />
            </View>
          </View>
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{color: '#003A91', size: 14}}>No Telepon Seluler</Text>
          <View
            style={{
              width: 321,
              height: 47,
              borderColor: '#CDD1E0',
              borderWidth: 1,
              borderRadius: 6,
              marginTop: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', size: 12, marginLeft: 16}}>
              +62 89631789831
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 9,
              }}>
              <Text style={{color: '#000000', size: 12, marginRight: 7}}>
                Edit data
              </Text>
              <IconEditData />
            </View>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            width: 321,
            height: 46,
            backgroundColor: '#003A91',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
          }}
          onPress={() => navigation.navigate('dataDiri')}>
          <Text style={{color: 'white', size: 15}}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>;
}