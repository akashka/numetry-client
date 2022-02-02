import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class Instructor {
    instructor: any;

    constructor(public api: Api) { }

    query(params?: any) {
        return this.api.get('api/instructor', params);
    }

    add(instructor) {
        return this.api.post('api/instructor', instructor);
    }

    update(instructor) {
        return this.api.put('api/instructor', instructor);
    }

}
