export interface ScenesTree{
    name:string;
    children: Array<SceneChild>;

}

export interface SceneChild {
    name:string;
    children:Array<AttributeValue>;
}

export interface AttributeValue{
    name:string;
    value?:number;
}

