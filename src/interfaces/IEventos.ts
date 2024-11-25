//get, put, delete
export interface IEventos{
    id:string;
    nombre:string;
    fecha:string;
    hora:string;
    descripcion:string;
    cantidadAsistentes:string;
    usuariosInscritos: string[];
    username?: string;
}

//post
export interface IEvento{
    nombre:string;
    fecha:string;
    hora:string;
    descripcion:string;
    cantidadAsistentes:string;
}