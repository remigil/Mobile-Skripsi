import {Buffer} from 'buffer';
import CryptoJS from 'react-native-crypto-js';

global.Buffer = Buffer;

const decryptResponseAPI = ({msg}) => {
  try {
    msg = Buffer.from(msg, 'base64').toString('utf8');
    const decrypt = CryptoJS.AES.decrypt(
      msg,
      'ShVmYp3s6v9y$B&E)H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+K',
      {
        iv: 'VmYq3t6w9z$C&F)J',
        mode: CryptoJS.mode.CBC,
      },
    ).toString(CryptoJS.enc.Utf8);
    return decrypt;
  } catch (error) {
    return error;
  }
};
export {decryptResponseAPI};
