

const sm2Encrypt = window.sm2Encrypt;

const publicKey = '041d892861c105eff02ec62dea50ce6dc8a2c14e1f91ef5a9d0d6aa915384a3c1c17d7ad5c1b1b5b9f3b2f940d22aef7b3d1c4c4553df8cc1b7cb565b292dac7e3';
const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1
export function Encrypt(msg: any) {
    const encryptData = sm2Encrypt(msg, publicKey, cipherMode);
    return encryptData
}
