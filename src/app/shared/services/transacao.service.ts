import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskEntity } from '../domains/task-entity';
import { lastValueFrom } from 'rxjs';
import { Transacao } from '../domains/transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  urlBase: string;

  constructor(
    private http: HttpClient,
    ) {
    this.urlBase = "http://localhost:8080";
  }

  async getAll(): Promise<Transacao[]> {
    try {
      const transacaoArray: Array<Transacao> = await lastValueFrom(this.http.get<Transacao[]>(this.urlBase + `/transacoes`));

      if (transacaoArray) {
        return transacaoArray;
      }
    } catch (error) {
      console.error(error);
    }
    throw new Error();
  }

  async save(transacao: Transacao): Promise<Transacao> {
    try {
      const taskEntity = await lastValueFrom(this.http.post<Transacao>(this.urlBase + `/transacoes`, transacao, { 'headers': { 'Content-Type': 'application/json' } }));

      if (taskEntity) {
        return taskEntity;
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    throw new Error();
  }

  async update(transacao: Transacao): Promise<boolean> {
    try {
      const success = await lastValueFrom(this.http.put(this.urlBase + `/transacoes`, transacao, { 'headers': { 'Content-Type': 'application/json' } }));

      if (success) {
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    return false;
  }

  async delete(transacao: Transacao): Promise<boolean> {
    try {
      const success: HttpResponse<any> = await lastValueFrom(this.http.delete(this.urlBase + `/transacoes/${transacao.id}`, { observe: 'response' }));
      if (success.status == 204) {
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    return false;
  }

  async deleteAll(): Promise<boolean> {
    try {
      const success: HttpResponse<any> = await lastValueFrom(this.http.delete(this.urlBase + `/transacoes`, { observe: 'response' }));
      if (success.status == 204) {
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    return false;
  }


  async changeChecked(checked: boolean, id: number): Promise<boolean> {
    let params = new HttpParams();
    params = params.set('checked', checked.toString());
    params = params.set('id', id.toString());
    try {
      const success = await lastValueFrom(this.http.put(this.urlBase + `/transacoes/checked`, null, {params}));

      if (success) {
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    return false;
  }

}
