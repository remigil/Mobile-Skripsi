import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import {BaseContainer} from '../../component';
import {LINK_ICON_STAKEHOLDER} from '../../constant/URL_EMBED';
import Constanta from '../../lib/Constanta';
import {GetLinkStakeholder} from '../../repositories/stakeholder';

export default props => {
  const [isLoading, setIsLoading] = useState(true);
  const [link, setLink] = useState([]);

  console.log('ini link stakeholder', link);

  useEffect(() => {
    GetLinkStakeholder()
      .then(succ => {
        console.log(succ.data);
        setLink(succ.data.data);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
        // props.isLoaded(true);
      });
  }, []);

  return (
    <BaseContainer
      {...props}
      withActionBar={true}
      withBasicAlert={true}
      actionBarProps={{
        containerStyle: {
          paddingVertical: heightPercentageToDP('1%'),
        },
        title: 'Stakeholder',
        titleStyle: {
          color: '#fff',
          backgrounColor: '#00000040',
          textAlign: 'center',
          ...Constanta({
            font: 'bold',
          }),
        },
        onBackPressed: () => {
          props.navigation.openDrawer();
        },
      }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
          }}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              {link?.length ? (
                link?.map(item => (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('stakeholder.webview', item);
                      }}
                      key={item.id}
                      style={{
                        width: responsiveWidth(20),
                        height: responsiveHeight(13),
                        margin: responsiveWidth(2),
                        marginVertical: responsiveWidth(3),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#D9D9D9',
                          margin: responsiveWidth(2),
                          padding: responsiveWidth(2),
                          borderRadius: responsiveWidth(2),
                        }}>
                        <Image
                          source={{
                            uri: LINK_ICON_STAKEHOLDER + item.icon,
                          }}
                          resizeMode="contain"
                          style={{
                            width: responsiveWidth(14),
                            height: responsiveHeight(7),
                          }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            textAlign: 'center',
                            zIndex: 999,
                            // backgroundColor: 'red',
                            color: 'black',
                            ...Constanta({
                              font: 'regular',
                            }),
                            textTransform: 'uppercase',
                            fontSize: responsiveFontSize(1.4),
                          }}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ))
              ) : (
                <></>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </BaseContainer>
  );
};
