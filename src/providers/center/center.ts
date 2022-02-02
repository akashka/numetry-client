import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class Center {
    center: any;

    constructor(public api: Api) { }

    query(params?: any) {
        return this.api.get('api/centers', params);
    }

    add(center) {
        return this.api.post('api/centers', center);
    }

    update(center) {
        return this.api.put('api/centers', center);
    }

}
