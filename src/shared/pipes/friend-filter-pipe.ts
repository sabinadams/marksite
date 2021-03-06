import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'friendFilter'
})
export class FriendFilter implements PipeTransform {
    transform(friends: any, filter: any, filterKeys: Array<string>): any {
        if( filterKeys == undefined ) {
            console.log("WARNING: No filter keys provided", friends, filter, filterKeys);
            return friends;
        }
        if( filter == null ) return friends;
        return friends.filter( friend => {
           for ( let key of filterKeys ) {
               if ( friend[ key ].toLowerCase().includes( filter.toLowerCase() ) ) {
                   return friend;
               }
           }
        });
    }
}