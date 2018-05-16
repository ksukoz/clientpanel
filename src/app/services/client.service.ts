import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clients: AngularFireList<any>;
  client: AngularFireObject<any>;
  
  constructor(
    public af:AngularFireDatabase
  ) {
    this.clients = this.af.list<Client>('/clients') as AngularFireList<Client[]>
  }

  getClients() {
    return this.clients;
  }

  newClient(client:Client) {
    this.clients.push(client);
  }

  getClient(id:string) {
    this.client = this.af.object<Client>('/clients/'+id) as AngularFireObject<Client>;
    return this.client;
  }

  updateClient(id:string, client:Client) {
    const key = client.$key;
    delete client.$key;
    return this.clients.update(id, client)
  }
}
