import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'friendFilter'
})
export class FriendFilter implements PipeTransform {
    transform(friends: any, filter: any): any {
        if( filter == null ) return friends;
        console.log(friends)
        return friends.filter( friend => {
            return friend.name.includes( filter );
        });
    }
}