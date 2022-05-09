export interface CommandComponent {
    meta: {
        name:string;
        description:string;
        aliases?:string[]
        categories?:string[]
        cooldown?:number;
        disabled?:boolean;
        path?:string;
        usage?:string[];
        permissions?:string[];
    }
}