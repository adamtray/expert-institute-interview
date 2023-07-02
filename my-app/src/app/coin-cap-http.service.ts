import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CoinCapHttpService {
    private baseUrl = 'https://api.coincap.io/v2/';

    constructor( private httpClient: HttpClient ) {

    }

    getAllAssets() {
      let url = this.baseUrl + 'assets';
      return this.httpClient.get(url);
    }

    getAssetHistory(id: string) {
      let url = this.baseUrl + 'assets/' + id + '/history?interval=d1';
      return this.httpClient.get(url);
    }
}
