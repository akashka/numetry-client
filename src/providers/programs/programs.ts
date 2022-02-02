import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class Programs {
    programs: any;

    constructor(public api: Api) { }

    query(params?: any) {
        return this.api.get('api/programmes', params);
    }

    add(program) {
        return this.api.post('api/programmes', program);
    }

    update(program) {
        return this.api.put('api/programmes', program);
    }

}

