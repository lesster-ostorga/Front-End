export class catalogosRescate
{
    
    CatTraslado: Cat_Traslado[] 
    CatUnidad:Cat_Unidad[] 
    Piloto:Piloto[]
    Personal:Personal[] 
    vobo:VoBo []
    Departamento: Departamento[]
    TipoAviso: TipoAviso[]
}

export class Cat_Traslado
{
    Ubi_Traslado: string 
    Descripcion: string 
 }

 export class Cat_Unidad
{
     Cod_Unidad:string
     Cod_Compania :string 
     Descripcion_TipoUnidad :string
}

export class Piloto
{
    Carnet : string 
    Nombre: string  
    cargo : string 
}

export class Personal
{
      Carnet: string 
      Nombre : string
      cargo : string
}

export class VoBo
{
      Carnet: string 
      Nombre : string
      Apellido : string
      cargo : string
}

export class Departamento {

Cod_Depto: string 
Nombre_Depto: string

}

export class TipoAviso{

Cod_TipoAviso: string 
Descripcion_Aviso: string

}

