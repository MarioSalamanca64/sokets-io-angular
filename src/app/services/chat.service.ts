import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService:WebsocketService
  ) { }

    sendMessage( mensaje: string){

      const payload = {
        de: this.wsService.getUsuario().nombre,
        cuerpo: mensaje
      };

      this.wsService.emit('mensaje',payload);

    }

    getMessages(){  
      //escuchar del servidor lo que tenga por nombre nuevo-mensaje 
      //mensaje-nuevo debe de ser el mismo que en el back 
      return this.wsService.listen('mensaje-nuevo');
    }
    //mensajes a una sola persona
    getMessagesPrivate(){
      return this.wsService.listen('mensajes-privado');
    }

}
