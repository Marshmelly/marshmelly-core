export interface CommandComponent {
    command_name:string;
    command_description:string;
    aliases?:string[]
    categories?:string[]
    cooldown?:number;
    disabled?:boolean;
    path?:string;
    usage?:string[];
    permissions?:string[];
}