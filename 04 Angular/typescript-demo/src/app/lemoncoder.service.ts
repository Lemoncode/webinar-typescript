import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable()
export class LemoncoderService {
  constructor(private http: HttpClient) { }

  getCoder(name: string): Observable<string> {
    return this.http.get(`https://api.github.com/users/${name}`)
      .pipe(
        map((result: any) => result.login)
      );
  }
}
