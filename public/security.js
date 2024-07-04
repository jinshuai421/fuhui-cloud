/**
 * 加密，解密工具类
 */
//key值，要和后端的key相同
// var key = CryptoJS.enc.Utf8.parse("041d892861c105eff02ec62dea50ce6dc8a2c14e1f91ef5a9d0d6aa915384a3c1c17d7ad5c1b1b5b9f3b2f940d22aef7b3d1c4c4553df8cc1b7cb565b292dac7e3");
// 	function Encrypt(word) {
// 		var srcs = CryptoJS.enc.Utf8.parse(word);
// 		var encrypted = CryptoJS.AES.encrypt(srcs, key, {
// 			mode : CryptoJS.mode.ECB,
// 			padding : CryptoJS.pad.Pkcs7
// 		});
// 		return encrypted.toString();
// 	}
	
// 	function Decrypt(word) {
// 		var decrypt = CryptoJS.AES.decrypt(word, key, {
// 			mode : CryptoJS.mode.ECB,
// 			padding : CryptoJS.pad.Pkcs7
// 		});
// 		return CryptoJS.enc.Utf8.stringify(decrypt).toString();
// 	}

	var publicKey = '041d892861c105eff02ec62dea50ce6dc8a2c14e1f91ef5a9d0d6aa915384a3c1c17d7ad5c1b1b5b9f3b2f940d22aef7b3d1c4c4553df8cc1b7cb565b292dac7e3';
	var cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1

	function Encrypt(msg) {
		var encryptData = sm2Encrypt(msg, publicKey, cipherMode);
		return encryptData
	}