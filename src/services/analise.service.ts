import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/modal/usuario';
import { fileURLToPath, pathToFileURL } from 'url';

@Injectable({
    providedIn: 'root'
})
export class AnaliseService {
    private server = "https://backend-analise.000webhostapp.com/backend-analise/";
    constructor(private http: HttpClient) { }

    getAnalise(id) {
        return new Promise<any>((resolve, reject) => {
            this.http.get(this.server + "/analise/analise.php", { params: { getByid: id } }).
                subscribe(snapshots => { resolve(snapshots); }, err => { reject(err) })
        });
    }
    getAll() {
        return new Promise<any>((resolve, reject) => {
            this.http.get(this.server + "/analise/analise.php", { params: { getAll: "all" } }).
                subscribe(snapshots => { resolve(snapshots); }, err => { reject(err) })
        });
    }
    getAllAnalises() {
        return new Promise<any>((resolve, reject) => {
            this.http.get(this.server + "/analise/analise.php", { params: { getAnalises: "analises" } }).
                subscribe(snapshots => { resolve(snapshots); }, err => { reject(err) })
        });
    }
    getSearch(param) {
        return new Promise<any>((resolve, reject) => {
            this.http.post(this.server + "/analise/analise.php", param).
                subscribe(snapshots => { resolve(snapshots); }, err => { reject(err) })
        });
    }
    saveAnalise(form) {
        form.append("saveAnalise", "saveAnalise");
        return new Promise<any>((resolve, reject) => {
            this.http.post(this.server + "/analise/analise.php", form).
            subscribe(snapshots => { resolve(snapshots); }, err => { reject(err) })
    });
    }
    saveAmostra(form) {
        form.append("saveAmostra", "saveAmostra");
        return new Promise<any>((resolve, reject) => {
        this.http.post(this.server + "/analise/analise.php", form).
        subscribe(snapshots => { resolve(snapshots); }, err => { reject(err) })
});
    }
}