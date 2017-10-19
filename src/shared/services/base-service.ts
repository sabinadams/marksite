import { Injectable, isDevMode } from '@angular/core';

declare const process: any;

@Injectable()
export class BaseService {
    
    public env = {
        isDevMode: process.env.IONIC_ENV == 'dev' ? false : true,
        api: process.env.IONIC_ENV == 'dev' ? 'http://localhost:6969' : 'http://node.gamr.co'
    };

    constructor(){}

}
