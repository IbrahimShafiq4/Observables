import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})

export class UserService {
  activatedUserEmitter = new Subject<boolean>();
  userId = new Subject<number>();
  constructor() { }
}
