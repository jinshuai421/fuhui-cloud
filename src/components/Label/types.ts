import { PropType } from "vue"

export const ModuleItemProps = { 
    /**
     * @description 模块图
     */
    img: {
        type: String,
        default: ''
    },
 
}

export type ModuleItemProps = PropType<typeof ModuleItemProps>