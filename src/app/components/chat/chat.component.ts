import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto:any = '';
  //para desuscribir cuando no estemos en esta pagina ng on destroid
  MensajesSubscription!: Subscription;
  //scroll automatico para todo lo que se manda
  elemento!: any;

  mensajes: any [] = [];

  constructor(
    public chatService:ChatService
  ) { }

  
  ngOnInit(): void {
    
    this.elemento = document.getElementById('chat-mensajes')

    this.MensajesSubscription = this.chatService.getMessages().subscribe( msg => {

      console.log(msg);
      this.mensajes.push(msg);
      //poner el scroll siempre en el ultimo mensaje
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
    
  }

  ngOnDestroy(): void {
    this.MensajesSubscription.unsubscribe();
  }

  enviar(){

    if(this.texto.trim().length === 0){
      return;
    }

     this.chatService.sendMessage(this.texto);

    this.texto = '';
  }

}
