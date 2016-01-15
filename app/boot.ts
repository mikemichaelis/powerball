import {bootstrap} from 'angular2/platform/browser'
import {HTTP_PROVIDERS, BaseRequestOptions, RequestOptions} from 'angular2/http';

import {AppComponent} from './app.component'
import {RandomOrgService} from './random-org.service'

bootstrap(AppComponent, [RandomOrgService, HTTP_PROVIDERS]);