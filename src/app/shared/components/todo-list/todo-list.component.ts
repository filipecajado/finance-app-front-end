import { Component, DoCheck, OnInit } from '@angular/core';
import { Subject, Subscription, debounce, debounceTime, timer } from 'rxjs';
import { TransacaoService } from '../../services/transacao.service';
import { Transacao } from '../../domains/transacao';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  transacaoList: Transacao[] = [];
  saveTimer: Subscription;
  private saveSubject: Subject<Transacao> = new Subject();
  totalReceitas?: number;
  totalDespesas?: number;

  saldo?: number;
  constructor(
    private service: TransacaoService
  ) {
    this.saveTimer = this.saveSubject.pipe(
      debounce(() => timer(1000))
    ).subscribe(item => {
      this.update(item);
    });
  }

  ngOnInit(): void {
    this.getTransacaoList()
  }

  public async setEmitTaskList(event: any) {

    let transacao: Transacao = event
    transacao = await this.service.save(transacao)
    this.transacaoList.push(transacao)
    this.transacaoList.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    this.totalReceitas = this.transacaoList
    .filter(item => item.tipo === 'RECEITA')
    .reduce((sum, item) => sum + item.valor, 0);

    this.totalDespesas = this.transacaoList
    .filter(item => item.tipo === 'DESPESA')
    .reduce((sum, item) => sum + item.valor, 0);

    this.saldo = this.totalReceitas - this.totalDespesas


  }

  public async deleteItemTaskList(task: Transacao) {
    await this.service.delete(task);
    this.getTransacaoList();
  }

  public async deleteAll() {
    const confirm = window.confirm("Você deseja realmente Deletar tudo?");
    await this.service.deleteAll();
    if (confirm) {
      this.transacaoList = [];
      this.getTransacaoList()
    }

  }

  public validationInput(description: any, task: Transacao) {
    if (!description.length) {
      const confirm = window.confirm("Valor está vazio, deseja Deletar?");

      if (confirm) {
        this.deleteItemTaskList(task)
      }
    }
  }

  public async getTransacaoList() {
    this.transacaoList = await this.service.getAll()
    this.transacaoList.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

    this.totalReceitas = this.transacaoList
    .filter(item => item.tipo === 'RECEITA')
    .reduce((sum, item) => sum + item.valor, 0);

    this.totalDespesas = this.transacaoList
    .filter(item => item.tipo === 'DESPESA')
    .reduce((sum, item) => sum + item.valor, 0);

    this.saldo = this.totalReceitas - this.totalDespesas
  }


  startSaveTimer(item: Transacao) {
    this.saveSubject.next(item);
  }

  async update(transacao: Transacao) {
    await this.service.update(transacao);
    this.getTransacaoList()
  }
}
