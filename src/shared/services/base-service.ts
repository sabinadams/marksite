import { Injectable, isDevMode } from '@angular/core';


@Injectable()
export class BaseService {
    
    public env = {
        isDevMode: isDevMode,
        api: isDevMode ? 'localhost:6969' : 'node.gamr.co'
    };

    constructor(){}

    // public getUser() {
    //     return JSON.parse(localStorage.getItem('user'));
    // }

}
