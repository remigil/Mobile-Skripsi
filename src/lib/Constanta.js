import React from 'react';

import {Platform} from 'react-native';
let FontTemplate = {};
if (Platform.OS == 'android') {
  FontTemplate = {
    bold: {
      fontFamily: 'OpenSans-Bold',
    },
    light: {
      fontFamily: 'OpenSans-Light',
    },
    regular: {
      fontFamily: 'OpenSans-Regular',
    },
    semibold: {
      fontFamily: 'OpenSans-Semibold',
    },
  };
} else {
  FontTemplate = {
    bold: {
      fontFamily: 'OpenSans-Bold',
    },
    light: {
      fontFamily: 'OpenSans-Light',
    },
    regular: {
      fontFamily: 'OpenSans-Light',
    },
    semibold: {
      fontFamily: 'OpenSans-Semibold',
    },
  };
}

export default ({font}) => FontTemplate[font];
