import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class Franchise {
    franchise: any;

    constructor(public api: Api) { }

    query(params?: any) {
        return this.api.get('api/franchise', params);
    }

    add(franchise) {
        return this.api.post('api/franchise', franchise);
    }

    update(franchise) {
        return this.api.put('api/franchise', franchise);
    }

}

