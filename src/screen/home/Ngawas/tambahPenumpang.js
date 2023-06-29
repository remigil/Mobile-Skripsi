import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TambahKendaraan} from '../../../assets/Assets';
import {
  BaseContainer,
  InputTextComp,
  DialogContainer,
} from '../../../component';
import Constanta from '../../../lib/Constanta';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {BasicAlertProps} from '../../../component/container/dialogContainer';

export default props => {
  const initState = {
    formTambahPenumpang: {
      wargaNegara: {
        value: 'Indonesia',
        is_require: false,
        placeholder: 'Pilih Warga Negara',
      },
      nama_lengkap: {
        value: '',
        is_require: false,
        placeholder: 'Masukan Nama',
      },
      nik: {
        value: '',
        is_require: false,
        placeholder: 'Masukkan Nik',
      },
    },
    kewarganegaraan: [
      {
        title: 'Warga Negara Indonesia',
        value: 1,
        valueToDatabase: 1,
      },
      {
        title: 'Warga Negara Asing',
        value: 2,
        valueToDatabase: 2,
      },
    ],
    basicAlertProps: {
      ...BasicAlertProps,
    },
  };
  const [basicAlertProps, setBasicAlertProps] = useState({
    ...initState.basicAlertProps,
  });
  const [formTambahPenumpang, setFormTambahPenumpang] = useState(
    initState.formTambahPenumpang,
  );

  const onReach_MAX_Length = temp => {
    let tempLength = temp?.length.toString();

    if (tempLength < 16) {
      setBasicAlertProps({
        basicAlertVisible: true,
        basicAlertTitle: 'Perhatian',
        basicAlertMessage: 'Jumlah digit NIK anda kurang',
        basicAlertOkBtnOnly: true,
        basicAlertBtnOkText: 'OK',
        basicAlertOnOk: () => {
          closeBasicAlert();
        },
        basicAlertShowButton: true,
        withTitle: true,
      });
    }
  };

  const closeBasicAlert = () => {
    // setIsLoading(false);
    setBasicAlertProps({
      ...basicAlertProps,
      basicAlertVisible: false,
      basicAlertTitle: null,
      basicAlertMessage: null,
      onClose: null,
      iconClose: false,
    });
  };

  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Bogor Ngawas',
        titleStyle: {
          color: '#FFF',

          backgrounColor: '#FCFDFF',
          textAlign: 'center',
        },
        backIconStyle: true,
        onBackPressed: () => {
          props.navigation.goBack();
        },
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#000000',
            ...Constanta({
              font: 'semibold',
            }),
            fontSize: widthPercentageToDP('6%'),
            marginVertical: heightPercentageToDP('2%'),
          }}>
          Tambah Penumpang
        </Text>
        {/* initState.kewarganegaraan[
                formTambahPenumpang?.wargaNegara?.value - 1
              ].title != ''
                ? ''
                : 'Pilih Warga Negara', */}
        {/* <DropdownOption
          titleMaster={'Warga Negara'}
          AccordianData={{
            title: 'Pilih Warga Negara',
            data: initState.kewarganegaraan,
            valueForEdit: formTambahPenumpang?.wargaNegara?.value
              ? initState.kewarganegaraan[
                  formTambahPenumpang?.wargaNegara?.value - 1
                ]?.title
              : 'Pilih Warga Negara',
          }}
          selectItemAccordian={value => {
            setFormTambahPenumpang({
              ...formTambahPenumpang,
              wargaNegara: {
                ...formTambahPenumpang.wargaNegara,
                value: value,
              },
            });
            // console.log(formTambahPenumpang.wargaNegara.value);
          }}
        /> */}

        <InputTextComp
          inputProps={{
            placeholder: 'Masukan Nama Lengkap',
            keyboardType: 'default',
            value: formTambahPenumpang.nama_lengkap.value,
            onChangeText: value =>
              setFormTambahPenumpang({
                ...formTambahPenumpang,
                nama_lengkap: {
                  ...formTambahPenumpang.nama_lengkap,
                  value: value,
                },
              }),
            style: {
              borderWidth: 1,
              borderColor: '#CDD1E0',
              paddingLeft: widthPercentageToDP('3.5%'),
              borderRadius: widthPercentageToDP('1%'),
              width: widthPercentageToDP('90%'),
              height: responsiveHeight(6),
            },
          }}
          labelProps={{
            status: true,
            title: 'Nama Lengkap',
            style: {
              fontSize: widthPercentageToDP('5%'),
              color: '#01796F',
              fontWeight: '400',
              marginBottom: widthPercentageToDP('1.5%'),
            },
            is_false: true,
          }}
          containerProps={{
            marginBottom: heightPercentageToDP('1%'),
          }}
        />
        <InputTextComp
          inputProps={{
            placeholder: 'Masukan NIK',
            keyboardType: 'numeric',
            value: formTambahPenumpang.nik.value,
            onChangeText: value =>
              setFormTambahPenumpang({
                ...formTambahPenumpang,
                nik: {
                  ...formTambahPenumpang.nik,
                  value: value,
                },
              }),
            style: {
              borderWidth: 1,
              borderColor: '#CDD1E0',
              paddingLeft: widthPercentageToDP('3.5%'),
              borderRadius: widthPercentageToDP('1%'),
              width: widthPercentageToDP('90%'),
              height: responsiveHeight(6),
            },
            maxLength: 16,
          }}
          labelProps={{
            status: true,
            title: 'NIK (Nomor Induk Kependudukan)',
            style: {
              fontSize: widthPercentageToDP('5%'),
              color: '#01796F',
              fontWeight: '400',
              marginBottom: widthPercentageToDP('1.5%'),
            },
            is_false: true,
          }}
          containerProps={{
            marginBottom: heightPercentageToDP('3%'),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: widthPercentageToDP('100%'),
            justifyContent: 'space-evenly',
            marginVertical: heightPercentageToDP('2%'),
          }}>
          <TouchableOpacity
            onPress={() => {
              let objData = {
                // nationality: formTambahPenumpang?.wargaNegara?.value || null,
                name: formTambahPenumpang?.nama_lengkap?.value || null,
                nik: formTambahPenumpang?.nik?.value || null,
              };
              // console.log(objData);
              let validate = true;
              Object.keys(objData).forEach(val => {
                if (!objData[val]) {
                  validate = false;
                }
              });
              if (!validate) {
                Alert.alert('Perhatian!', 'Formulir tidak boleh kosong');
              }
              if (formTambahPenumpang.nik.value.length < 16) {
                onReach_MAX_Length(formTambahPenumpang.nik.value);
              } else {
                props.navigation.navigate('ngawas.tanggalKeberangkatan', {
                  penumpang: objData,
                });
              }
            }}
            style={{
              width: widthPercentageToDP('90%'),
              height: heightPercentageToDP('5%'),
              borderRadius: 5,
            }}>
            <LinearGradient
              start={{x: 1.0, y: 1.0}}
              end={{x: 0.0, y: 0.4}}
              locations={[0, 0.7]}
              colors={['#01796F', '#01796F']}
              style={{
                flex: 1,
                borderRadius: 5,
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
                  ...Constanta({
                    font: 'regular',
                  }),
                }}>
                Simpan Data
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <DialogContainer {...basicAlertProps} />
      </View>
    </BaseContainer>
  );
};
