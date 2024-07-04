import { FormData } from '@/components/Form/types';


export enum ButtonType {
    // 确认
    Confirm = 'confirm',
    // 重置
    Reset = 'reset',
}

export interface FilterButtonData {
    type:ButtonType,
    text?:string,
}


export interface Data{
    formData:any
} 

export const getState = ():Data=>{
    return {
        formData:{}
    }
}

export interface RenderConfirmButton {
    ():JSX.Element
}

export interface FilterProps {
    data:FormData,
    buttonGroup?:Array<FilterButtonData>,
    // 显示分界线
    showLine?:boolean,
    operateClassName?:string,
    // 自定义确认按钮渲染
    renderConfirmButton?:RenderConfirmButton,
}

