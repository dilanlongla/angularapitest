import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class User {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  endPoint = 'https://jsonplaceholder.typicode.com';

  constructor(private httpClient: HttpClient) {}

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUsers(): Observable<User> {
    return this.httpClient.get<User>(this.endPoint + '/todos').pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  getUser(id): Observable<User> {
    return this.httpClient.get<User>(this.endPoint + '/todos/' + id).pipe(
      retry(1),
      catchError(this.httpError)
    );
  }

  create(employee): Observable<User> {
    return this.httpClient
      .post<User>(
        this.endPoint + '/todos',
        JSON.stringify(employee),
        this.httpHeader
      )
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  update(id, data): Observable<User> {
    return this.httpClient
      .put<User>(
        this.endPoint + '/todos/' + id,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  delete(id) {
    return this.httpClient
      .delete<User>(this.endPoint + '/todos/' + id, this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }

  httpError(error) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
