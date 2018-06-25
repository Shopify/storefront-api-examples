
import { Injectable } from '@angular/core';

@Injectable()

export class ProductService {

    getCorrectId(id: String): String {
        if (id.substr(id.length - 1) != "=") {
            id = id + '=';
        };
        return id;
    }
    
}
