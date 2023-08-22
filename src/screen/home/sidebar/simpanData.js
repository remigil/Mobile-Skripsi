import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TambahKendaraan} from '../../../assets/Assets';
import {
  AddVehicle,
  GetJenisMerk,
  GetKendaraanId,
} from '../../../repositories/ngawas';
import {BaseContainer, DropdownOption, InputTextComp} from '../../../component';
import {BasicAlertProps} from '../../../component/container/dialogContainer';
import KeyboardAvoiding from '../../../component/form/KeyboardAvoiding';
import {EditKendaraan} from '../../../repositories/sidebar';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Constanta from '../../../lib/Constanta';

export default props => {
  const {params: paramsData} = props.route;
  console.log(paramsData.id);
  const initState = {
    formProfilKendaraan: {
      id: {
        value: paramsData?.id === undefined ? '' : paramsData?.id,
        is_require: true,
      },
      nopol: {
        value:
          paramsData?.no_vehicle === undefined ? '' : paramsData?.no_vehicle,
        is_require: false,
        placeholder: 'Pilih Warga Negara',
      },
      tipeKendaraan: {
        value:
          paramsData?.tipeKendaraan === undefined
            ? ''
            : paramsData?.tipeKendaraan,
        is_require: false,
        placeholder: 'Masukan Nama',
        children: [],
      },
      merk: {
        // value: '',
        value: paramsData?.merk === undefined ? '' : paramsData?.merk,
        is_require: false,
        placeholder: 'Masukkan Nik',
        children: [],
      },
    },
    tipeKendaraan: jenisMerk,
    // [
    //   {
    //     title: 'Mobil',
    //     value: 1,
    //     valueToDatabase: 1,
    //     children: [
    //       {
    //         title: 'Honda',
    //         value: 1,
    //         valueToDatabase: 1,
    //       },
    //       {
    //         title: 'Toyota',
    //         value: 2,
    //         valueToDatabase: 2,
    //       },
    //       {
    //         title: 'Daihatsu',
    //         value: 3,
    //         valueToDatabase: 3,
    //       },
    //       {
    //         title: 'Suzuki',
    //         value: 4,
    //         valueToDatabase: 4,
    //       },
    //       {
    //         title: 'Nissan',
    //         value: 5,
    //         valueToDatabase: 5,
    //       },
    //       {
    //         title: 'Yamaha',
    //         value: 6,
    //         valueToDatabase: 6,
    //       },
    //     ],
    //   },
    //   {
    //     title: 'Sepeda motor',
    //     value: 2,
    //     valueToDatabase: 2,
    //     children: [
    //       {
    //         title: 'Honda',
    //         value: 1,
    //         valueToDatabase: 1,
    //       },

    //       {
    //         title: 'Yamaha',
    //         value: 2,
    //         valueToDatabase: 2,
    //       },
    //       {
    //         title: 'Suzuki',
    //         value: 3,
    //         valueToDatabase: 3,
    //       },
    //       {
    //         title: 'Kawasaki',
    //         value: 4,
    //         valueToDatabase: 4,
    //       },
    //     ],
    //   },
    // ],
  };
  const [formProfilKendaraan, setFormProfilKendaraan] = useState(
    initState.formProfilKendaraan,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [jenisMerk, setJenisMerk] = useState([]);
  const [listMerk, setListMerk] = useState([]);
  const [basicAlertProps, setBasicAlertProps] = useState(BasicAlertProps);

  console.log(props);

  const getListKendaraan = () => {
    GetJenisMerk()
      .then(hasil => {
        // console.log(hasil.data.data);
        // let refactor = [];
        let refactor = hasil.data.data.map(list => ({
          ...list,
          title: list.type_name,
          valueToDatabase: list.id,
          brand_vehicle: list.brand_vehicles.map(ers => ({
            ...ers,
            title: ers.brand_name,
            valueToDatabase: ers.id,
          })),
        }));
        setJenisMerk(refactor);
      })
      .catch(err => console.log(err))
      .finally(() => {
        // setIsLoading(false);
      });
  };

  // console.log({ini: formProfilKendaraan});

  useEffect(() => {
    getListKendaraan();
  }, []);

  const submitVehicle = () => {
    EditKendaraan({
      id: paramsData.id,
      no_vehicle: formProfilKendaraan.nopol.value,
      brand_id: formProfilKendaraan.merk.value,
      type_id: formProfilKendaraan.tipeKendaraan.value,
    })
      .then(ok => {
        console.log('edit woyyy', ok);
        setBasicAlertProps({
          basicAlertVisible: true,
          basicAlertShowButton: true,
          withTitle: true,
          basicAlertTitle: 'Anda telah berhasil merubah kendaraan',
          basicAlertMessage: '',
          basicAlertOnOk: () => {
            setBasicAlertProps({
              ...basicAlertProps,
              basicAlertVisible: false,
              basicAlertTitle: null,
              basicAlertMessage: null,
              iconClose: false,
            });
            props.navigation.navigate('ProfileAccount');
          },
          basicAlertOnClosed: () => {
            setBasicAlertProps({
              ...basicAlertProps,
              basicAlertVisible: false,
              basicAlertTitle: null,
              basicAlertMessage: null,
              iconClose: false,
            });
          },
          basicAlertOkBtnOnly: true,
          basicAlertBtnOkText: 'OK',
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <BaseContainer
      withActionBar={true}
      withBasicAlert={true}
      basicAlertProps={basicAlertProps}
      actionBarProps={{
        title: 'Edit Data Kendaraan',
        backIconStyle: true,
        titleStyle: {
          color: 'white',
          backgrounColor: '#FCFDFF',
          textAlign: 'center',
          ...Constanta({
            font: 'bold',
          }),
        },
        onBackPressed: () => props.navigation.goBack(),
      }}>
      <View
        style={{
          flex: 1,
          marginTop: heightPercentageToDP('2%'),
        }}>
        <KeyboardAvoiding>
          <View
            style={{
              alignItems: 'center',
            }}>
            {/* <Text
              style={{
                textAlign: 'center',
                color: '#000000',
                fontWeight: '600',
                fontSize: widthPercentageToDP('6%'),
                marginVertical: heightPercentageToDP('2%'),
              }}>
              Profil Kendaraan
            </Text> */}
            <InputTextComp
              inputProps={{
                placeholder: paramsData.no_vehicle,
                keyboardType: 'default',
                value: formProfilKendaraan.nopol?.value,
                onChangeText: value =>
                  setFormProfilKendaraan({
                    ...formProfilKendaraan,
                    // nopol: {
                    //   ...formProfilKendaraan.nopol,
                    //   value: paramsData.id,
                    // },
                    nopol: {
                      ...formProfilKendaraan.nopol,
                      value: value,
                    },
                  }),
                style: {
                  borderWidth: 1,
                  borderColor: '#CDD1E0',
                  paddingLeft: widthPercentageToDP('3.5%'),
                  borderRadius: widthPercentageToDP('2%'),
                  width: widthPercentageToDP('85%'),
                  textTransform: 'uppercase',
                  height: responsiveHeight(6),
                },
              }}
              containerProps={{}}
              labelProps={{
                status: true,
                title: 'Nomor Registrasi / Nomor Polisi',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: '#01796F',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                },
                is_false: true,
              }}
            />
            {/* Tipe Kendaraan */}
            <View
              style={{
                marginTop: heightPercentageToDP('1%'),
              }}>
              <DropdownOption
                titleMaster={'Tipe Kendaraan'}
                AccordianData={{
                  title: 'Pilih Tipe',
                  data: jenisMerk,
                  valueForEdit:
                    formProfilKendaraan.tipeKendaraan?.value != ''
                      ? paramsData.type_vehicle.type_name
                      : paramsData.type_vehicle.type_name,
                }}
                selectItemAccordian={value => {
                  let datas = jenisMerk.filter(er => er.id === value);
                  setListMerk([]);
                  setTimeout(() => {
                    setListMerk(datas[0].brand_vehicle);
                  }, 1000);
                  setFormProfilKendaraan({
                    ...formProfilKendaraan,
                    tipeKendaraan: {
                      ...formProfilKendaraan.nopol,
                      value: value,
                      children: listMerk,
                    },
                  });
                }}
              />
            </View>

            <View
              style={{
                marginTop: heightPercentageToDP('1%'),
              }}>
              <DropdownOption
                titleMaster={'Merk Kendaraan'}
                AccordianData={{
                  title: 'Pilih Model',
                  data: listMerk,
                  valueForEdit:
                    formProfilKendaraan.merk.value != ''
                      ? paramsData.brand_vehicle.brand_name
                      : paramsData.brand_vehicle.brand_name,
                }}
                selectItemAccordian={value =>
                  setFormProfilKendaraan({
                    ...formProfilKendaraan,
                    merk: {
                      ...formProfilKendaraan.nopol,
                      value: value,
                    },
                  })
                }
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: widthPercentageToDP('100%'),
                justifyContent: 'space-evenly',
                marginVertical: heightPercentageToDP('4%'),
              }}>
              <TouchableOpacity
                onPress={() => submitVehicle()}
                style={{
                  width: widthPercentageToDP('90%'),
                  height: 42,
                  borderRadius: 5,
                }}>
                <LinearGradient
                  start={{x: 1.0, y: 1.0}}
                  end={{x: 0.0, y: 0.4}}
                  locations={[0, 0.7]}
                  colors={['#01796F', '#01796F']}
                  style={{
                    flex: 1,
                    borderRadius: 8,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TambahKendaraan />
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      marginLeft: 10,
                    }}>
                    Simpan Data
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoiding>
      </View>
      {isLoading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            height: heightPercentageToDP('100%'),
            width: widthPercentageToDP('100%'),
            backgroundColor: '#2727278F',
            opacity: 10,
            justifyContent: 'center',
            zIndex: 9999,
          }}>
          <View style={{alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#01796F" />
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginTop: 9,
              }}>
              Harap Tunggu Sebentar
            </Text>
          </View>
        </View>
      )}
    </BaseContainer>
  );
};
