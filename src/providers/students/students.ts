import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class Students {
    students: any;

    constructor(public api: Api) { }

    query(params?: any) {
        return this.api.get('api/students', params);
    }

    add(students) {
        return this.api.post('api/students', students);
    }

    update(students) {
        return this.api.put('api/students', students);
    }

}
