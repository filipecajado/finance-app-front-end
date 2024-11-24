import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-input-add-itens',
  templateUrl: './todo-input-add-itens.component.html',
  styleUrls: ['./todo-input-add-itens.component.scss']
})
export class TodoInputAddItensComponent implements OnInit {

  @Output() public emitItemTaskList = new EventEmitter();
  public descricao: string = '';
  public valor: number | null = null;
  public tipo: string = '';
  public addItemTaskList: string = "";
  public data?: Date;
  constructor() { }

  ngOnInit(): void { }

  public submitItemTaskList(): void {
    if (this.descricao.trim() && this.valor !== null && this.tipo) {
      const transacaoItem = {
        descricao: this.descricao.trim(),
        valor: this.valor,
        tipo: this.tipo,
        data: this.data
      };

      this.emitItemTaskList.emit(transacaoItem);

      this.descricao = '';
      this.valor = null;
      this.tipo = '';
      this.data = undefined;
    }
  }
}
