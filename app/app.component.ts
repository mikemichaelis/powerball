import {Component, OnInit} from 'angular2/core'
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http'

import {IPowerball} from './ipowerball'
import {RandomOrgService} from './random-org.service'

@Component({
    selector: 'powerball-app',            
    template: `            
    <h1>{{title}}</h1>
    <button (click)="onGenerate()">generate</button>
    
    <div *ngIf="powerball">
        <ul>
            <li *ngFor="#pick of powerball.picks">
                {{pick}}
            </li>     
            
            <li>{{powerball.power}}</li> 
        </ul>                    
    </div>               
    `
})

export class AppComponent {
    
    public title: string = 'Powerball';    
    public powerball: IPowerball; 
                  
    constructor(private _randomOrgService: RandomOrgService) {}    
    
    onGenerate() {
        this.powerball = null;
        this._randomOrgService.getPowerball().then(powerball => this.powerball = powerball);        
    }       
}