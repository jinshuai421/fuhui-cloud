// import Page from "@/components/Page";

// import style from "./index.module.less";

// import VueRouter from "@/router";
// import Router, { getCurrentRouter } from "@/router/index";

// import { Toast } from "vant";
// import { defineComponent, onMounted, ref } from "vue";
// import { getVerificationCodeApi, loginUserApi } from "@/api/login";
// import { getUserInfoAPI } from "@/api/common";

// export default defineComponent({
//   setup(props, {}) {
//     const username = ref("");
//     const password = ref("");
//     const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;

//     const s = ref(60);
//     const verificationText = ref("获取验证码");

//     let time: any = null;

//     const handleVerification = () => {
//       if (verificationText.value !== "获取验证码") return;
//       if (!username.value) {
//         Toast("请输入手机号");
//         return;
//       }

//       if (!reg.test(username.value)) {
//         Toast("请输入正确手机号");
//         return;
//       }

//       getVerificationCodeApi({ phone: username.value })
//         .then((res) => {
//           Toast("发送成功!");

//           verificationText.value = `重新发送(${s.value}S)`;
//           time = setInterval(() => {
//             if (s.value <= 1) {
//               clearInterval(time);
//               s.value = 60;
//               verificationText.value = `获取验证码`;
//             } else {
//               s.value--;
//               verificationText.value = `重新发送(${s.value}S)`;
//             }
//           }, 1000);
//         })
//         .catch((err) => {
//           Toast(err.msg);
//         });
//     };

//     const onLogin = () => {
//       if (!username.value) {
//         Toast("请输入手机号");
//         return;
//       }

//       if (!reg.test(username.value)) {
//         Toast("请输入正确手机号");
//         return;
//       }

//       if (!password.value) {
//         Toast("请输入验证码");
//         return;
//       }

//       loginUserApi({
//         code: password.value,
//         phone: username.value,
//       })
//         .then((res: any) => {
//           sessionStorage.removeItem("active");
//           sessionStorage.removeItem("hntUserType");
//           sessionStorage.removeItem("subjectObj");
//           getUserInfoAPI().then((data: any) => {
//             if (data.hntUserType === "2") {
//               sessionStorage.setItem("hntUserType", data.hntUserType);
//             } else if (!data.subjectList || !data.subjectList.length) {
//               password.value = "";
//               return Toast("此账号无主体");
//             } else {
//               sessionStorage.setItem(
//                 "subjectObj",
//                 JSON.stringify({
//                   ...data.subjectList[0],
//                   modUserType: data.modUserType,
//                 })
//               );
//             }

//             VueRouter.push({ path: "/" });
//           });
//         })
//         .catch((err) => {
//           Toast(err.msg);
//         });
//     };
//     return () => (
//       <Page padding={0} class={style.bgImg} isHead={false}>
//         <div class={style["top"]}>
//           <div class={style["title1"]}>您好</div>
//           <div class={style["title2"]}>
//             <i></i>
//             <span>欢迎使用福慧云</span>
//           </div>
//         </div>

//         <div class={style["main"]}>
//           <div class={style["input"]}>
//             <i></i>
//             <input v-model={username.value} placeholder="手机号" />
//           </div>
//           <div class={style["input"]}>
//             <i class={style["password"]}></i>
//             <input
//               v-model={password.value}
//               style="width: 130px;"
//               placeholder="验证码"
//             />
//             <div
//               class={[
//                 style["verification"],
//                 verificationText.value === "获取验证码" && style["on"],
//               ]}
//               onClick={handleVerification}
//             >
//               {verificationText.value}
//             </div>
//           </div>
//           <div class={style["login"]} onClick={onLogin}>
//             登录
//           </div>
//         </div>
//       </Page>
//     );
//   },
// });
