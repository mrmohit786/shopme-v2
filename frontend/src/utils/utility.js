import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';
import { AES_IV } from './constants';

export function loadState(key) {
  try {
    const stringState = localStorage.getItem(key);
    let decryptedState = CryptoAES.decrypt(stringState.toString(), AES_IV);
    decryptedState = decryptedState.toString(CryptoENC);

    return JSON.parse(decryptedState);
  } catch (err) {
    return undefined;
  }
}

export function saveState(data, key) {
  try {
    const stringState = JSON.stringify(data);
    const encryptedState = CryptoAES.encrypt(stringState, AES_IV);
    localStorage.setItem(key, encryptedState);
  } catch (err) {
    console.error(err);
  }
}

export function removeState(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
}
