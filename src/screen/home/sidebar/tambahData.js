import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TambahKendaraan} from '../../../assets/Assets';
import {AddVehicle, GetJenisMerk} from '../../../repositories/ngawas';
import {BaseContainer, DropdownOption, InputTextComp} from '../../../component';
import {BasicAlertProps} from '../../../component/container/dialogContainer';
import KeyboardAvoiding from '../../../component/form/KeyboardAvoiding';
import Constanta from '../../../lib/Constanta';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default props => {
  const {params: paramsData} = props.route;
  const initState = {
    formProfilKendaraan: {
      nopol: {
        value: paramsData?.nopol === undefined ? '' : paramsData?.nopol,
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
  };
  const [formProfilKendaraan, setFormProfilKendaraan] = useState(
    initState.formProfilKendaraan,
  );
  const [noRegis, setNoRegis] = useState({
    regis1: '',
    regis2: '',
    regis3: '',
  });
  formProfilKendaraan.nopol.value = `${noRegis.regis1} ${noRegis.regis2} ${noRegis.regis3}`;
  const [isLoading, setIsLoading] = useState(false);
  const [jenisMerk, setJenisMerk] = useState([]);
  const [listMerk, setListMerk] = useState([]);
  const [basicAlertProps, setBasicAlertProps] = useState(BasicAlertProps);
  const closeBasicAlert = () => {
    setBasicAlertProps({
      ...basicAlertProps,
      basicAlertVisible: false,
      basicAlertTitle: null,
      basicAlertMessage: null,
      iconClose: false,
    });
  };
  const getListKendaraan = () => {
    GetJenisMerk()
      .then(hasil => {
        // console.log(hasil.data.data);
        // let refactor = [];
        let refactor = hasil.data.data.map(list => ({
          ...list,
          title: list.type_name,
          valueToDatabase: list.id,
          brand_vehicle: list.brand_vehicle.map(ers => ({
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
    if (
      formProfilKendaraan.nopol.value == '' ||
      formProfilKendaraan.merk.value == '' ||
      formProfilKendaraan.tipeKendaraan.value == '' ||
      noRegis.regis1 == '' ||
      noRegis.regis2 == '' ||
      noRegis.regis3 == ''
    ) {
      setBasicAlertProps({
        basicAlertVisible: true,
        basicAlertTitle: 'Perhatian',
        basicAlertMessage: 'masih ada form yang kosong',
        basicAlertOnOk: () => {
          closeBasicAlert();
        },
        basicAlertOkBtnOnly: true,
        basicAlertBtnOkText: 'Kembali',
        basicAlertShowButton: true,
        withTitle: true,
      });
    } else {
      AddVehicle({
        no_vehicle: formProfilKendaraan.nopol.value,
        brand_id: formProfilKendaraan.merk.value,
        type_id: formProfilKendaraan.tipeKendaraan.value,
      })
        .then(ok => {
          setBasicAlertProps({
            basicAlertVisible: true,
            basicAlertShowButton: true,
            withTitle: true,
            basicAlertTitle: 'Anda telah berhasil menambah kendaraan',
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
    }
  };

  return (
    <BaseContainer
      withActionBar={true}
      withBasicAlert={true}
      basicAlertProps={basicAlertProps}
      actionBarProps={{
        title: 'Tambah Data Kendaraan',
        backIconStyle: true,
        titleStyle: {
          color: 'white',
          ...Constanta({
            font: 'bold',
          }),
          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        onBackPressed: () => props.navigation.navigate('ProfileAccount'),
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
            <Text
              style={{
                alignSelf: 'flex-start',
                fontSize: widthPercentageToDP('5%'),
                color: '#01796F',
                ...Constanta({font: 'regular'}),
                marginLeft: responsiveWidth(7.5),
                marginBottom: responsiveHeight(2),
              }}>
              Nomor Registrasi
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                marginLeft: responsiveWidth(8),
              }}>
              {/* nopol 1 */}
              <TextInput
                value={noRegis?.regis1}
                onChangeText={fill => setNoRegis({...noRegis, regis1: fill})}
                autoCorrect={false}
                autoCapitalize="none"
                maxLength={2}
                style={{
                  borderWidth: 1,
                  borderColor: '#CDD1E0',
                  borderRadius: widthPercentageToDP('1.3%'),
                  width: widthPercentageToDP('10%'),
                  textTransform: 'uppercase',
                  height: heightPercentageToDP('6%'),
                  textAlign: 'center',
                  ...Constanta({font: 'regular'}),
                  fontSize: responsiveFontSize(2),
                }}
              />
              <View
                style={{
                  borderBottomColor: '#000',
                  borderBottomWidth: 1.5,
                  width: 5,
                  height: 1,
                  margin: responsiveWidth(3),
                }}
              />
              {/* nopol 2 */}
              <TextInput
                value={noRegis?.regis2}
                onChangeText={fill => setNoRegis({...noRegis, regis2: fill})}
                autoCorrect={false}
                autoCapitalize="none"
                maxLength={4}
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  borderColor: '#CDD1E0',
                  borderRadius: widthPercentageToDP('1.3%'),
                  width: widthPercentageToDP('25%'),
                  textTransform: 'uppercase',
                  height: heightPercentageToDP('6%'),
                  textAlign: 'center',
                  ...Constanta({font: 'regular'}),
                  fontSize: responsiveFontSize(2),
                }}
              />
              <View
                style={{
                  borderBottomColor: '#000',
                  borderBottomWidth: 1.5,
                  width: 5,
                  height: 1,
                  margin: responsiveWidth(3),
                }}
              />
              {/* nopol 3 */}
              <TextInput
                value={noRegis?.regis3}
                onChangeText={fill => setNoRegis({...noRegis, regis3: fill})}
                autoCorrect={false}
                autoCapitalize="none"
                maxLength={3}
                style={{
                  borderWidth: 1,
                  borderColor: '#CDD1E0',
                  borderRadius: widthPercentageToDP('1.3%'),
                  width: widthPercentageToDP('15%'),
                  textTransform: 'uppercase',
                  height: heightPercentageToDP('6%'),
                  textAlign: 'center',
                  ...Constanta({font: 'regular'}),
                  fontSize: responsiveFontSize(2),
                }}
              />
            </View>
            {/* <InputTextComp
              inputProps={{
                placeholder: 'Masukkan Nomor Registrasi',
                keyboardType: 'default',
                value: formProfilKendaraan.nopol?.value,
                onChangeText: value =>
                  setFormProfilKendaraan({
                    ...formProfilKendaraan,
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
                  height: heightPercentageToDP('6%'),
                },
              }}
              containerProps={{}}
              labelProps={{
                status: true,
                title: 'Nomor Registrasi',
                style: {
                  fontSize: widthPercentageToDP('5%'),
                  color: '#01796F',
                  fontWeight: '400',
                  marginBottom: widthPercentageToDP('1.5%'),
                },
                is_false: true,
              }}
            /> */}
            {/* Tipe Kendaraan */}
            <View
              style={{
                marginTop: heightPercentageToDP('1%'),
              }}>
              <DropdownOption
                titleMaster={'Tipe Kendaraan'}
                AccordianData={{
                  title:
                    formProfilKendaraan.tipeKendaraan?.value ??
                    formProfilKendaraan.tipeKendaraan.placeholder,
                  data: jenisMerk,
                  valueForEdit:
                    formProfilKendaraan.tipeKendaraan?.placeholder != ''
                      ? 'Pilih Tipe'
                      : formProfilKendaraan.tipeKendaraan.placeholder,
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
                titleMaster={'Model Kendaraan'}
                AccordianData={{
                  title: 'Pilih Model',
                  data: listMerk,
                  valueForEdit:
                    formProfilKendaraan.merk.placeholder != ''
                      ? 'Pilih Model'
                      : formProfilKendaraan.merk.placeholder,
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
                  colors={['#F8C92C', '#01796F']}
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
