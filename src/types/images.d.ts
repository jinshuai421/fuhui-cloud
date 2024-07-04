declare module '*.svg'
declare module '*.jpg'
declare module '*.gif'
declare module '*.jpeg'
declare module '*.bmp'
declare module '*.tiff'

declare module "*.png" {
    const value: any;
    export = value;
}

declare function require(img: string): string;