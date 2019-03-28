import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable()
export class LoginService {

    private loggedin: boolean = false;


    constructor(
        private http: HttpClient,
    ) { }

    login(username: string, password: string): Observable<any> {
        let url = environment.baseBackUrl + '/login';
        console.log(url)
        const body = new HttpParams()
            .set(`username`, username)
            .set(`password`, password);
        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.post(url, body.toString(), { headers, withCredentials: true });
    }

    loggedIn(): any {
        this.loggedin = true;
    }

    isLogged():boolean{
        return this.loggedin;
    }
    signup(user: User): Observable<any> {
        console.log(" inside signup user = ");
        console.log(user);
        let url = environment.baseBackUrl + '/users';
        return this.http.post(url, {
            'firstName': user.firstName,
            'lastName': user.lastName,
            'mail': user.mail,
            'password': user.password
        });
    }
}