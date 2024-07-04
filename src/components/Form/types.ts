export enum FormType {
    Text = 'text',
    TextArea = 'textarea',
    Select = 'select',
    Checkbox = 'checkbox',
    Radio = 'radio',
    Range = 'range',
    Slider = 'slider',
    Datetime = 'datetime',
}

// 验证规则配置
export interface VerifyConfig {
    // 必填
    required?: boolean;
    // 最小长度
    minLength?: number;
    // 最大长度
    maxLength?: number;
    // 最小值
    min?: number;
    // 最大值
    max?: number;
    // 正则表达式
    pattern?: RegExp;
    // 错误提示
    errMessage?: string;

    showPrompt?: boolean;
}

export interface VerifyResult {
    // 验证结果
    status: boolean;
    // 错误提示
    errMessage?: string;
}

// 表单数据
export type FormData = Array<FormConfigItem|FormConfigItemMultiple>

// 表单配置
export interface FormConfig  {
    rules?: VerifyConfig;
    // 表单数据
    data:FormData,
    
}

// 单字段有多种表单类型
export interface FieldMultipleType {
    label?: string;
    type:FormType;
}


export interface FormConfigItem {
    // 表单项类型
    type: FormType;
    field: string;
    // 字段名
    data: CheckboxType|RangeType|SliderType|TextType;
    rules?: VerifyConfig;
}

export type FormMultipleType = CheckboxTypeMultiple|RangeTypeMultiple|SliderTypeMultiple|TextTypeMultiple

// 单字段多种表单类型的配置
export interface FormConfigItemMultiple {
    field: string;
    label?: string;
    renderLabel?:RenderLabel;
    // 字段名
    data: Array<FormMultipleType>;
    rules?: VerifyConfig;
}


// 表单基本属性
export interface FormBaseProp {
    label?: string;
    className?: string;    
    // 标签class
    labelClassName?: string;
    // 必填星号
    required?: boolean;
    // 标签渲染函数
    renderLabel?:RenderLabel;

}

export type CheckboxValue = number|string
export interface CheckboxItemObj  {
    text: string;
    value: CheckboxValue;
}

export type CheckboxItem = string|CheckboxItemObj;


/**
 * @description 多选框默认渲染函数
 * item 渲染项数据
 * selected 是否选中
 */
export interface CheckboxRenderItem {
    (item: CheckboxItemObj,index:number,select:boolean):any;
} 


export interface RenderLabel {
    (label:string):any;
}

export interface CheckboxType extends FormBaseProp  {
    // 是否单选
    single?: boolean;
    options:Array<CheckboxItem>;
    value?: number|string|Array<number|string>;
    // 选中图标
    selectIcon?: string;
    // 自定义渲染项
    renderItem?: CheckboxRenderItem;
    // 选项列表盒子的className
    bodyClassName?: string;
    // 开启全选 仅多选模式
    selectAll?: boolean;

}


export interface CheckboxTypeMultiple extends CheckboxType,FieldMultipleType {}



export interface RangeType extends FormBaseProp  {
    min?: number;
    max?: number;
    // 最小最输入框占位符
    minPlaceholder?: string;
    // 最大值输入框占位符
    maxPlaceholder?: string;
    value?:[number?,number?]
}

export interface RangeTypeMultiple extends RangeType,FieldMultipleType {}

export interface SliderType extends FormBaseProp  {
    min: number;
    max: number;
    step?: number;
    value: [number?,number?];
}

export interface SliderTypeMultiple extends SliderType,FieldMultipleType {}

export interface RenderRight {
    (unit?:string):any;
}

export enum InputType {
    Text = 'text',
    Password = 'password',
    Digit = 'digit',
    Number = 'number',
}
export interface TextType extends FormBaseProp {
    placeholder?: string;
    // 单位class
    unitClassName?: string;
    inputType?:InputType;
    // 单位
    unit?: string;
    value?: string;
    // 右侧渲染
    renderRight?: RenderRight;
}

export interface TextTypeMultiple extends TextType,FieldMultipleType {}

export interface TextAreaType extends FormBaseProp {
    placeholder?: string;
    value?: string;
    maxLength?: number;
}

export interface TextAreaTypeMultiple extends TextAreaType,FieldMultipleType {}


export interface DateTimerType extends FormBaseProp {

    minDate?: Date;
    maxDate?: Date;
    // 开始日期占位符
    startDatePlaceholder?: string;
    // 结束日期占位符
    maxDatePlaceholder?: string;
    value?:[Date?,Date?]
}