import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enlaces } from '../components/tarjeta-credito/Models/Enlaces';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  
  //private myAppUrl = 'https://localhost:44345/';
  private myAppUrl = 'http://reservasecen-001-site1.itempurl.com/';
 //myAppUrl: string = '';
  
  private myAPiURL = 'api/Tarjeta';
  private urlCompleta = 'https://localhost:44345/api/Tarjeta';
 
  constructor(private http: HttpClient) {
     //this.myAppUrl = this.en;
   }
   //Crear tarjeta CREATE
   saveTarjeta(tarjeta:any): Observable<any>{
      return this.http.post(this.myAppUrl + this.myAPiURL, tarjeta);
   }

   //Obtener los datos READ
   getListTarjetas(): Observable<any>{
     return this.http.get(this.myAppUrl + this.myAPiURL);
   }

   //Actualizar Tarjeta UPDATE
   updateTarjeta(id: number, tarjeta: any): Observable<any>{
      return this.http.put(this.myAppUrl + this.myAPiURL + "/" + id, tarjeta);
   }

   //Eliminar tarjetas DELETE
   borrartarjeta(id: number): Observable<any>{
       return this.http.delete(this.myAppUrl + this.myAPiURL + "/" + id);
   }


}
