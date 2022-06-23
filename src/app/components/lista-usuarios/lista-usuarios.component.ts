import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  //otra forma de manejar los sokets
  usuariosActivosObs!: Observable<any>;

  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    this.usuariosActivosObs = this.chatService.getUsuariosActivos();

    // Emitir el obtener usuarios
    this.chatService.emitirUsuariosActivos();
  }

}
