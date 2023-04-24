import React, {useState} from 'react';
import {BaseContainer} from '../../../../component';
import TglBerangkatComp from '../../../../component/formulir/tglBerangkatComp';
import KtrBerangkatComp from '../../../../component/formulir/ktrBerangkatComp';
import DataPenumpangComp from '../../../../component/formulir/dataPenumpangComp';
import {Text, View} from 'react-native';
import Constanta from '../../../../lib/Constanta';
export default props => {
  const [stateFormData, setStateFormData] = useState({});
  const initState = {
    langkah: [
      {
        title: 'Keterangan Keberangkatan',
        langkah: 1,
        comp: (
          <TglBerangkatComp
            title="Keterangan Keberangkatan"
            stateFormData={stateFormData}
            lanjutFormulir={(prev, formKeberangkatan) => {
              setLangkahState(prev);
              // console.log({...stateFormData, ...formKeberangkatan});
              setStateFormData({...stateFormData, ...formKeberangkatan});
              // console.log('tgl dan waktu', formKeberangkatan);
            }}
          />
        ),
      },
      // {
      //   title: 'Keterangan Keberangkatan',
      //   langkah: 2,
      //   comp: (
      //     <KtrBerangkatComp
      //       title="Keterangan Keberangkatan"
      //       stateFormData={stateFormData}
      //       lanjutFormulir={(prev, formKeterangan) => {
      //         setLangkahState(prev);
      //         setStateFormData({
      // ...stateFormData,
      // ...formKeterangan,
      //         });
      //       }}
      //       kembaliFormulir={prev => {
      //         setLangkahState(prev);
      //       }}
      //       {...props}
      //     />
      //   ),
      // },
      {
        title: 'Data Penumpang',
        langkah: 2,
        comp: (
          <DataPenumpangComp
            title="Data Penumpang"
            stateFormData={stateFormData}
            lanjutFormulir={(prev, formPenumpang) => {
              props.navigation.navigate('ngawas.pratinjau', {
                ...stateFormData,
                ...formPenumpang,
              });
              setStateFormData({...stateFormData, ...formPenumpang});
            }}
            kembaliFormulir={prev => {
              setLangkahState(prev);
            }}
            {...props}
          />
        ),
      },
    ],
    state_langkah: 1,
  };

  const [langkahState, setLangkahState] = useState(initState.state_langkah);
  const [allParams, setAllParams] = useState({});

  return (
    <BaseContainer
      withActionBar={true}
      actionBarProps={{
        title: 'Bogor Ngawas',
        titleStyle: {
          color: 'white',

          backgrounColor: '#FCFDFF',
          textAlign: 'center',
          ...Constanta({
            font: 'semibold',
          }),
        },
        onBackPressed: () => props.navigation.openDrawer(),
        backIconStyle: true,
        onBackPressed: () => {
          props.navigation.goBack();
        },
      }}>
      {
        initState.langkah.filter(
          (langkah, index) => langkah.langkah == langkahState,
        )[0].comp
      }
    </BaseContainer>
  );
};
