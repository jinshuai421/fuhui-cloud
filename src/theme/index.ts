import { isAlipayMiniProgram, isZLB, isZLBWeChatMiniProgram } from "@/utils/env";
import { getIsOldStyle } from "@/utils/zlbjssdk";

export enum Theme {
    young,
    old
}
export let THEME:Theme

type ThemeType = keyof typeof Theme;



export function initTheme(){
    if(isZLB || isAlipayMiniProgram || isZLBWeChatMiniProgram){
        return getTheme().then(theme=>{
            setTheme(theme);
            setThemeClass(theme);
        })
    }

    let themeType:ThemeType|null = localStorage.getItem('theme') as ThemeType;
    const theme:Theme = themeType ? Theme[themeType as ThemeType ] : Theme.young;
    setTheme(theme);
    setThemeClass(theme);
}


// 设置主题
export const setTheme = (theme: Theme) => {
    let oldTheme:Theme|null = null;
    
    if(typeof THEME !== 'undefined') {
        oldTheme = THEME;
    }

    if(THEME ===theme) return
    THEME = theme;

    THEME = theme;
    localStorage.setItem('theme', Theme[theme]);
    setThemeClass(theme,oldTheme);

}

// 获取主题
export const getTheme = async ():Promise<Theme>=>{
    if(isZLB || isAlipayMiniProgram || isZLBWeChatMiniProgram){
       return getIsOldStyle().then((isOld:boolean)=>{
           if(isOld){
               return Theme.old
           } else {
                return Theme.young
           }
        })

        
    }
   return  THEME
}

// 设置主题class
const setThemeClass = function(newTheme:Theme,oldTheme?:Theme|null,el:Element = document.body) {
    if(!['undefined','null'].includes(typeof oldTheme)) {
       el.classList.remove(Theme[oldTheme as Theme]);
    }
    el.classList.add(Theme[newTheme]);
}

const getThemeNum = ()=>{
    return Object.keys(Theme).length/2;
}

// 切换主题
export const toggleTheme =async () =>{
    let theme:Theme = await getTheme();
    let index
    if(theme>=getThemeNum()-1){
        index = 0
    } else {
        index = theme+1;
    }
    let type = Theme[index];
    setTheme(Theme[type as ThemeType]);
}


// // 清空主题样式
// const clearThemeClass = (el:Element) =>{
//     const keys = Object.keys(Theme);
//     for(let item of keys){
//         let value = Theme[item as ThemeType];
//         if(typeof value === 'string'){
//             el.classList.remove(item);
//         }
//     }
// }




