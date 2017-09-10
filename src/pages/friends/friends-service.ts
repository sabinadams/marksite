import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base-service';
@Injectable()
export class FriendsService extends BaseService {

    constructor(  ) { super(); }
    
    getFriends() {
        return [
            {
                id: 1,
                name: "sabin",
                image: 'http://placehold.it/100x100'
            },
            {
                id: 2,
                name: "andrew",
                image: 'http://placehold.it/100x100'
            },{
                id: 3,
                name: "eli",
                image: 'http://placehold.it/100x100'
            },
            {
                id: 4,
                name: "cory",
                image: 'http://placehold.it/100x100'
            },{
                id: 5,
                name: "paul",
                image: 'http://placehold.it/100x100'
            },
            {
                id: 6,
                name: "aaron",
                image: 'http://placehold.it/100x100'
            },{
                id: 7,
                name: "alex",
                image: 'http://placehold.it/100x100'
            },
            {
                id: 8,
                name: "colby",
                image: 'http://placehold.it/100x100'
            }
        ]
    }
}