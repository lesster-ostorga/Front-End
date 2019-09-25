export class catalogosRescate //datos generales sin parametros
{
    
    CatTraslado: Cat_Traslado[] 
    CatUnidad:Cat_Unidad[] 
    Cat_Causa:Cat_Causa[]
    CatVehiculo:Cat_Vehiculo
    Piloto:Piloto[]
    Personal_RadioTel:Personal_RadioTel[]
    Personal:Personal[] 
    vobo:VoBo []
    Departamento: Departamento[]
    TipoAviso: TipoAviso[]
    ClaseServicio: ClaseServicio[]

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

export class Cat_Causa
{
    Cod_Causa: string 
    Descripcion: string 
 }

 export class Cat_Vehiculo
 {
     Cod_Vehiculo: string 
     Descripcion: string 
  }
 

export class Piloto
{
    Carnet : string 
    Nombre: string  
    cargo : string 
}

export class Personal_RadioTel
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

export class Municipio {

    Cod_Muni: string 
    Nombre_Muni: string
    
  }

  export class Lugar {

    Cod_Lugar: string 
    Lugar: string
    
  }

  export class ClaseServicio {

    Cod_Clase_Servicio: string 
    Des_Clase_Servicio: string
    
  }

  export class TipoServicio {

    Cod_Servicio: string 
    Descripcion_Servicio: string
    
  }


