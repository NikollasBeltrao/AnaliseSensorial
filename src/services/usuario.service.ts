import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/modal/usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private server = "https://backend-analise.000webhostapp.com/backend-analise/";
    constructor(private http: HttpClient) { }

    getUser(id) {
        return new Promise<Usuario>((resolve, reject) => {
            this.http.get<Usuario>(this.server + "/usuario/usuario.php", { params: { getByid: <string>id } }).
                subscribe(snapshots => { resolve(snapshots); }, err => { reject(err) })
        });
    }
    getAllUsers(){
        return new Promise<any>((resolve, reject) => {
            this.http.get(this.server + "/usuario/usuario.php", { params: { getAll: "all"} }).
                subscribe(snapshots => { resolve(snapshots); }, err => { reject(err) })
        });
    }
    getSearch(param){
        return new Promise<any>((resolve, reject) => {
            this.http.post(this.server + "/usuario/usuario.php", param).
                subscribe(snapshots => { resolve(snapshots); }, err => { reject(err) })
        });
    }
    
    authUser(matricula){
        return new Promise<any>((resolve, reject) => {
            this.http.get(this.server + "/usuario/usuario.php?", { params: { authMatricula: matricula } }).
                subscribe(snapshots => { resolve(snapshots); }, err => { reject(err) })
        });
    }

    createUser(form){
        form.append('createUser', "createUser");
        return new Promise<any>((resolve, reject) => {
            this.http.post(this.server + "/usuario/usuario.php", form).
                subscribe(snapshots => { resolve(snapshots); }, err => { reject(err) })
        });
    }
}