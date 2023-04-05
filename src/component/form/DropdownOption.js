import React, {useState} from 'react';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
// import {ChevronDown, ChevronUp, TambahKendaraan} from '../../../assets/Assets';
import {List} from 'react-native-paper';
import {ChevronDown, ChevronUp} from '../../assets/Assets';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useEffect} from 'react';
import Constanta from '../../lib/Constanta';
import {responsiveWidth} from 'react-native-responsive-dimensions';
export default ({
  titleMaster = '',
  AccordianData = {
    title: '',
    data: [
      {
        title: '',
        value: '',
        valueToDatabase: '',
      },
    ],
    valueForEdit: '',
  },
  selectItemAccordian = null,
  styleData = {
    titleHeader: {
      color: '#01796F',
      fontSize: widthPercentageToDP('5%'),
    },
    titlePlaceholder: {
      color: '#8E8F90',
    },
    header: {
      width: widthPercentageToDP('84%'),
      borderWidth: 1,
      borderColor: '#CDD1E0',
      alignSelf: 'center',
      borderRadius: 10,
      backgroundColor: 'white',
    },
    option: {
      width: widthPercentageToDP('84%'),
      borderWidth: 1,
      borderColor: '#CDD1E0',
      alignSelf: 'center',
    },
  },
}) => {
  const [accordianDataState, setAccordianDataState] = useState({
    expanded: false,
    titleAccordianSubMaster: AccordianData.valueForEdit ?? AccordianData.title,
  });
  const handlePress = () => {
    setAccordianDataState({
      ...accordianDataState,
      expanded: !accordianDataState.expanded,
    });
  };
  useEffect(() => {
    setAccordianDataState({
      ...accordianDataState,
      titleAccordianSubMaster: AccordianData.valueForEdit,
    });
  }, [AccordianData.valueForEdit]);
  return (
    <View>
      {/* <Text>{AccordianData.valueForEdit}</Text> */}
      <Text
        style={{
          ...styleData.titleHeader,
          ...Constanta({
            font: 'regular',
          }),
        }}>
        {titleMaster}
      </Text>
      <List.Section>
        <List.Accordion
          theme={{colors: {background: 'white'}}}
          title={accordianDataState.titleAccordianSubMaster}
          style={{
            ...styleData.header,
          }}
          expanded={accordianDataState.expanded}
          titleStyle={{
            ...styleData.titlePlaceholder,
            ...Constanta({
              font: 'regular',
            }),
          }}
          right={() => {
            if (accordianDataState.expanded) {
              return <ChevronUp width={20} height={20} />;
            } else {
              return <ChevronDown width={20} height={20} />;
            }
          }}
          onPress={() => handlePress()}>
          {AccordianData.data.length ? (
            AccordianData.data.map((item, index) => (
              <List.Item
                key={index}
                style={{
                  ...styleData.option,
                  borderTopRightRadius: index ? 0 : 4,
                  borderTopLeftRadius: index ? 0 : 4,
                  borderBottomRightRadius: !index ? 0 : 4,
                  borderBottomLeftRadius: !index ? 0 : 4,
                  marginTop: index ? 0 : 3,
                  // width: responsiveWidth(83),
                  ...styleData.header.width,
                  // ...Constanta({
                  //   font: 'semibold',
                  // }),
                }}
                titleStyle={{
                  ...Constanta({
                    font: 'regular',
                  }),
                }}
                onPress={() => {
                  setAccordianDataState({
                    ...accordianDataState,
                    expanded: !accordianDataState.expanded,
                    titleAccordianSubMaster: item.title,
                  });
                  // console.log({dataTitle: item.title});
                  selectItemAccordian(item.valueToDatabase);
                }}
                title={item.title}
              />
            ))
          ) : (
            <></>
          )}
        </List.Accordion>
      </List.Section>
    </View>
  );
};
