type CreateElementOptions = {
    /**
     * @description 标签名
     */
    tag:string;
    /**
     * @description className
     */
    className?:string;
    /**
     * @description 文案
     */
    text?:string;
    /**
     * @description 子元素
     */
    children?:Element[],
    /**
     * @description dataset数据
     */
    data?:any;
    // 点击事件
    onClick?:(e:MouseEvent)=>void;
}

/**
 * @description 创建DOM元素
 * @param tag 
 * @param className 
 * @param text 
 * @returns 
 */
export const createElement =function(options:CreateElementOptions):Element{
    const {tag,className='',text='',children=[],data,onClick} = options;
    const el = document.createElement(tag);
    el.className = className;
    el.textContent = text
    el.append(...children);
    if(onClick){
        el.onclick = onClick;
    }

    if(data){
        const keys = Object.keys(data);
        for(let key of keys){
            el.dataset[key] = data[key];

        }
    }

    return el
}

type ImageElementOptions = {
      /**
       * @description 图片路径
       */
       src:string;
     /**
     * @description className
     */
      className?:string;
    
}
export const createImage = function(optoins:ImageElementOptions):Element{
    const {className='',src} = optoins;
    const image = new Image();
    image.src = src;
    image.className = className;
    return image;
}