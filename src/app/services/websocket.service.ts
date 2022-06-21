import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario:any = null;
  parse1:any;

  constructor(
    private socket:Socket
  ) { 
    this.checkStatus();
    this.cargarStorage();
   }
  //estado del servidor
  checkStatus(){

    this.socket.on('connect', ()=> {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', ()=> {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }
  //es el que manda la info al servidor
  emit( evento:string, payload?:any , callback?:Function ){
    //si hay callback debe de haber payload
    //emit('EVENTO',payload, callback)

    console.log('Emitiendo',evento);

    //inyectar servicio
    this.socket.emit(evento, payload,callback );
    
  }
  //escuchar mensajes
  listen(evento:string){

    return this.socket.fromEvent(evento);
  }
  //solo saber que nombre tiene el que este conectado
  loginWS(nombre:string){

    //console.log('configurando',nombre);

    //promesa para que sea asincrona
    return new Promise<void>( (resolve, rejec) => {
      //usando en metodo emit que ya existe
      this.emit('configurar-usuario',{nombre},(resp:any)=>{
       //esta bien si no reecarga el navegador
      this.usuario = new Usuario( nombre );
      
      this.guardarUsuarioStorage();
      //console.log(resp)
      resolve();
     
      });
    });

    //creando otraves el metodo emit 
    // this.socket.emit('configurar-usuario',{nombre},/*se ejecurta despues de lo que ejecutemos en el servidor*/  (resp:any) => {
    //   console.log(resp);  
    // })
  }

  getUsuario(){
    return this.usuario
  }

  guardarUsuarioStorage(){
    localStorage.setItem('usuario',JSON.stringify(this.usuario));
  }
  
  cargarStorage(){

    if(localStorage.getItem('usuario')){
      this.parse1 = localStorage.getItem('usuario')
      this.usuario = JSON.parse(this.parse1)
      //este guarda el dato en el back para que no cambie el nombre cuando recarge la pagina
      this.loginWS(this.usuario.nombre)

    }

  }

}
