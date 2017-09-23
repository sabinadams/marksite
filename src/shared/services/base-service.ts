import { Injectable, isDevMode } from '@angular/core';


@Injectable()
export class BaseService {
    
    public env = {
        isDevMode: isDevMode,
        api: isDevMode ? 'http://localhost:6969' : 'http://node.gamr.co'
    };

    constructor(){

    }

}
