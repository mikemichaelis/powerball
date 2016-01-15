import 'rxjs/Rx';

import {Component, Injectable} from 'angular2/core'
import {Http, Headers} from 'angular2/http'

import {IPowerball} from './ipowerball'
import {POWERBALL} from './mock-powerball'

interface processCallback {
    (data: number[]) : void;
}

@Injectable()
export class RandomOrgService {
        
    private _url = 'https://api.random.org/json-rpc/1/invoke';
    private _apiKey = 'c9b4870a-dee2-4a1f-8104-caf7357adc37';
                
    constructor(private _http: Http) {}
        
    public getPowerball(): Promise<IPowerball> {        
        var that = this;        
        return new Promise<IPowerball>((resolve, reject) => {            
            that._retrieve(5, 1, 69, false, picks => {
                that._retrieve(1, 1, 26, true, powerball =>  {                                        
                    resolve({   picks: picks,
                                power: powerball[0] });
                });                    
            });                                                        
        });
    }
             
    private _retrieve(n: number, min: number, max: number, replacement: boolean, callback: processCallback) {
        var body = `{
                        "jsonrpc": "2.0",
                        "method": "generateIntegers",
                        "params": {
                            "apiKey": "` + this._apiKey + `",
                            "n": ` + n + `,
                            "min": ` + min + `,
                            "max": ` + max + `,
                            "replacement": ` + replacement + `
                        },
                        "id": 2
                    }`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json-rpc');

        this._http.post(this._url, body, { headers: headers })
                    .map((res) => res.json())                           
                    .subscribe(
                        (data) => callback(data.result.random.data), 
                        (error) => this.logError(error),                 
                        () => console.log('_retrieve ' + n + ' SUCCESS'));                
    }
        
    logError(err: string) {
        console.error('There was an error: ' + err);
    }
}