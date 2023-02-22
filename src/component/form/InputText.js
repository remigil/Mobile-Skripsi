// import React from 'react';
// import {View, TextInput, Text} from 'react-native';
// import {widthPercentageToDP} from 'react-native-responsive-screen';
// import Constanta from '../../lib/Constanta';

// export default ({
//   inputProps = {},
//   containerProps = {},
//   labelProps = {
//     title: '',
//     status: false,
//     style: {},
//     require: false,
//   },
// }) => {
//   return (
//     <View {...containerProps}>
//       {labelProps.status && (
//         <View
//           style={{
//             flexDirection: 'row',
//           }}>
//           <Text
//             style={[
//               labelProps.style,
// {
//   ...Constanta({
//     font: 'regular',
//   }),
//               },
//             ]}>
//             {labelProps.title}
//           </Text>
//           {labelProps.require && (
//             <Text
//               style={{
//                 color: 'red',
//                 fontSize: widthPercentageToDP('4.5%'),
//                 ...Constanta({
//                   font: 'regular',
//                 }),
//               }}>
//               {' '}
//               *
//             </Text>
//           )}
//         </View>
//       )}
//       <TextInput autoCapitalize={false} {...inputProps} />
//     </View>
//   );
// };

import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Constanta from '../../lib/Constanta';
export default ({
  inputProps = {},
  containerProps = {},
  labelProps = {
    title: '',
    status: false,
    style: {},
    require: false,
    is_false: true,
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

                ...Constanta({
                  font: 'regular',
                }),
              }}>
              {' '}
              *
            </Text>
          )}
        </View>
      )}
      <TextInput
        {...inputProps}
        autoCorrect={false}
        autoCapitalize="none"
        style={[inputProps?.style, {fontFamily: 'OpenSans-Light'}]}
      />
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
          {labelProps.title} Tidak Boleh Kosong
        </Text>
      )}
    </View>
  );
};
