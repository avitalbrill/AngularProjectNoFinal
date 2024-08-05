import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Turn } from '../models/turn';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private turnUpdatedSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getAllTurns(): Observable<Turn[]> {
    return this.http.get<Turn[]>('https://localhost:7257/api/Turn');
  }

  getTurnById(turnId: number): Observable<Turn> {
    return this.http.get<Turn>(`https://localhost:7257/api/Turn/${turnId}`);
  }

  addTurn(turnData: Turn): Observable<Turn> {
    return this.http.post<Turn>('https://localhost:7257/api/Turn', turnData).pipe(
      tap(() => {
        this.turnUpdatedSubject.next();
      })
    );
  }

  updateTurn(turnId: number, turnData: Turn): Observable<Turn> {
    return this.http.put<Turn>(`https://localhost:7257/api/Turn/${turnId}`, turnData).pipe(
      tap(() => {
        this.turnUpdatedSubject.next();
      })
    );
  }

  deleteTurn(turnId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7257/api/Turn/${turnId}`).pipe(
      tap(() => {
        this.turnUpdatedSubject.next();
      })
    );
  }

  getTurnUpdateListener(): Observable<void> {
    return this.turnUpdatedSubject.asObservable();
  }
}
