import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base-service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MarkersService extends BaseService {

    constructor(  ) { super(); }
    
    getMarkers(){
        let markers = [
            {
                id: 1,
                memo: "This is a test memo 1",
                image: 'https://untappedcities-wpengine.netdna-ssl.com/wp-content/uploads/2013/06/minetta-street-lane-brook-history-of-streets-untapped.jpg',
                color: 'blue',
                date: 'xx/xx/xxxx'
            },
            {
                id: 2,
                memo: "This is a test memo 2",
                image: 'http://somentecoisaslegais.com.br/wp-content/uploads/2015/01/Ruas-mais-bonitas-do-mundo-12-Washington-EUA-420x300.jpg',
                color:'red',
                date: 'xx/xx/xxxx'
            },{
                id: 3,
                memo: "This is a test memo 3",
                image: 'https://www.salzburg.info/website/var/tmp/image-thumbnails/0/2433/thumb__teaser--topic/florianibrunnen-am-alten-markt_12937.jpeg',
                color:'purple',
                date: 'xx/xx/xxxx'
            },
            {
                id: 4,
                memo: "This is a test memo 4",
                image: 'https://streetsdept.files.wordpress.com/2017/08/img_0713-4-5.jpg?w=600&h=400',
                color:'yellow',
                date: 'xx/xx/xxxx'
            }
        ]

        return Observable.of(new Object()).mapTo(markers);
    }
}