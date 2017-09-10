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
                image: 'http://placehold.it/100x100',
                color: 'blue'
            },
            {
                id: 2,
                name: "andrew",
                image: 'http://placehold.it/100x100',
                color:'red'
            },{
                id: 3,
                name: "eli",
                image: 'http://placehold.it/100x100',
                color:'purple'
            },
            {
                id: 4,
                name: "cory",
                image: 'http://placehold.it/100x100',
                color:'yellow'
            },{
                id: 5,
                name: "paul",
                image: 'http://placehold.it/100x100',
                color: 'orange'
            },
            {
                id: 6,
                name: "aaron",
                image: 'http://placehold.it/100x100',
                color: 'green'
            },{
                id: 7,
                name: "alex",
                image: 'http://placehold.it/100x100',
                color: 'white'
            },
            {
                id: 8,
                name: "colby",
                image: 'http://placehold.it/100x100',
                color: 'pink'
            }
        ]
    }
}