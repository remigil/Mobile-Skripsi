import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Constanta from '../../lib/Constanta';

export default ({
  icon = null,
  inputProps = {},
  containerProps = {},
  labelProps = {
    title: '',
    status: false,
    style: {},
    require: false,
    is_false: false,
    otherTitleCondition: '',
  },
}) => {
  return (
    <View {...containerProps}>
      {labelProps.status && (
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={[labelProps.style, {...Constanta({font: 'regular'})}]}>
            {labelProps.title}
          </Text>
          {labelProps.require && (
            <Text
              style={{
                color: 'red',
                fontSize: widthPercentageToDP('4.5%'),
                ...Constanta({font: 'regular'}),
              }}>
              {' '}
              *
            </Text>
          )}
        </View>
      )}
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: '#CDD1E0',
            paddingLeft: widthPercentageToDP('3.5%'),
            borderRadius: widthPercentageToDP('2%'),
          },
          [inputProps.style],
        ]}>
        <View style={{flex: 1}}>
          <TextInput
            placeholder="Search"
            {...inputProps}
            style={[
              // inputProps?.style,
              {
                ...Constanta({
                  font: 'regular',
                }),
              },
            ]}
          />
        </View>
        <View style={{marginRight: widthPercentageToDP('1%')}}>
          {icon && icon}
        </View>
      </View>
      {!labelProps.is_false && (
        <Text
          style={{
            color: '#CE2121',
            fontWeight: '300',
            fontSize: widthPercentageToDP('3%'),

            ...Constanta({
              font: 'regular',
            }),
          }}>
          <>
            {labelProps.otherTitleCondition ? (
              labelProps.otherTitleCondition
            ) : (
              <>{labelProps.title} Tidak Boleh Kosong</>
            )}
          </>
        </Text>
      )}
    </View>
  );
};
