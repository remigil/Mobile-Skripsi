import React, {createRef, forwardRef, useState} from 'react';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useCombinedRefs} from '../../../lib/use-combine-refs';
import {IconTutupFilter} from '../../../assets/Assets';
import LinearGradient from 'react-native-linear-gradient';
import {Portal} from 'react-native-portalize';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Constanta from '../../../lib/Constanta';

const arrayBufferToBase64 = buffer => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export default forwardRef(({filterMenu, processFilter, ...props}, ref) => {
  const [isLoading, setIsLoading] = useState(false);

  const modalizeRef = createRef(Modalize);
  const combinedRef = useCombinedRefs(ref, modalizeRef);
  const [listFilterMenu, setListFilterMenu] = useState(filterMenu);

  return (
    <>
      <Portal>
        <Modalize
          ref={combinedRef}
          withHandle={false}
          modalHeight={responsiveHeight(40)}
          handlePosition="inside"
          handleStyle={{
            backgroundColor: '#135AAC',
          }}
          HeaderComponent={
            <View
              style={{
                alignItems: 'center',
                position: 'absolute',
                top: responsiveHeight(-3),
                left: responsiveWidth(0),
                right: responsiveWidth(0),
                elevation: 30,
              }}>
              <Pressable
                style={{
                  backgroundColor: '#0552C6',
                  width: responsiveWidth(80),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: responsiveWidth(5),
                  paddingVertical: responsiveHeight(2),
                  borderRadius: 14,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,

                  elevation: 7,
                  flexDirection: 'row',
                }}
                onPress={() => {
                  combinedRef.current.close();
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  Filter Titik Sebaran
                </Text>
                <IconTutupFilter />
              </Pressable>
            </View>
          }
          modalStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: '#FEFEFE',
            width: responsiveWidth(82),
            position: 'absolute',
            top: responsiveHeight(25),
            left: responsiveWidth(8.3),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
              paddingTop: responsiveHeight(5),
              paddingHorizontal: responsiveWidth(2),
            }}>
            {listFilterMenu
              .sort((a, b) => a.id - b.id)
              .map((filterData, index) => (
                <Pressable
                  key={
                    filterData.id + 'filterData' + new Date().getMilliseconds()
                  }
                  onPress={() => {
                    setListFilterMenu(filter => {
                      return [
                        ...filter.filter(
                          dataFil => dataFil.id != filterData.id,
                        ),
                        {
                          ...filterData,
                          value: !filterData.value,
                        },
                      ];
                      //   return filter;
                    });
                  }}
                  style={{
                    alignItems: 'center',
                    backgroundColor: filterData.value ? '#D9E2EF' : '#E8E8E833',
                    borderRadius: 4,
                    borderWidth: 1,
                    justifyContent: 'center',
                    borderColor: filterData.value ? '#97B8EB' : '#97B8EB',
                    marginVertical: responsiveHeight(0.8),
                    width: responsiveWidth(36),
                    height: responsiveHeight(4.5),
                  }}>
                  <Text
                    style={{
                      color: filterData.value ? '#003A91' : '#6D7687',
                      fontSize: responsiveWidth(3.5),
                      fontWeight: '400',
                      ...Constanta({
                        font: 'regular',
                      }),
                    }}>
                    {filterData.title}
                  </Text>
                </Pressable>
              ))}
          </View>
          {listFilterMenu.filter(e => e.value == true).length ? (
            <TouchableOpacity
              onPress={() => {
                let getListActive = listFilterMenu
                  .filter(e => e.value == true)
                  .map(e => e.filter);
                processFilter && processFilter(getListActive.join(','));
                combinedRef.current.close();
              }}
              style={{
                width: responsiveWidth(75),
                height: responsiveHeight(5),
                borderRadius: 4,
                marginTop: responsiveHeight(3),
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <LinearGradient
                start={{x: 1.0, y: 1.0}}
                end={{x: 0.0, y: 0.4}}
                locations={[0, 0.7]}
                colors={['#1F5EBB', '#09449C']}
                style={{
                  flex: 1,
                  borderRadius: 4,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    ...Constanta({
                      font: 'regular',
                    }),
                  }}>
                  TERAPKAN
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <Pressable
              onPress={() => {}}
              style={{
                width: responsiveWidth(75),
                height: responsiveHeight(5),
                borderRadius: 4,
                marginTop: responsiveHeight(3),
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                backgroundColor: '#E7E7E7',
              }}>
              <Text
                style={{
                  color: '#8F8F8F',
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                TERAPKAN
              </Text>
            </Pressable>
          )}
        </Modalize>
      </Portal>
    </>
  );
});
