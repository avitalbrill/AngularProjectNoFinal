import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turn } from '../models/turn';
@Injectable({
  providedIn: 'root'
})
export class TurnService {

constructor(private http: HttpClient)
  { }
getAllTurns(): Observable<Turn[]> {
  return this.http.get<Turn[]>('https://localhost:7257/api/Turn');
}
getTurnById(turnId: number): Observable<Turn> {
  return this.http.get<Turn>(`https://localhost:7257/api/Turn/${turnId}`);
}
addTurn(turnData: Turn): Observable<Turn> {
  return this.http.post<Turn>('https://localhost:7257/api/Turn', turnData);
}
updateTurn(turnId: number, turnData: Turn): Observable<Turn> {
  return this.http.put<Turn>(`https://localhost:7257/api/Turn/${turnId}`, turnData);
}
deleteTurn(turnId: number): Observable<any> {
  return this.http.delete<any>(`https://localhost:7257/api/Turn/${turnId}`);
}

}
