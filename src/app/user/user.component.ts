import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fromEvent, interval } from 'rxjs';
import { concatMap, take, takeWhile, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { UserService } from '../user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    const observable = fromEvent<MouseEvent>(
      this.button.nativeElement,
      'click'
    ).pipe(
      // Concatenate the click event with an Ajax request observable
      concatMap(() => {
        // Return the observable for the Ajax request
        return ajax
          .getJSON('https://jsonplaceholder.typicode.com/todos/1')
          .pipe(
            take(3),
            // Log completion of the inner observable
            tap({
              complete() {
                console.log('Inner Observable has been completed');
              },
            })
          );
      }),
      // Take values while the condition is true
      takeWhile((value, index) => `tha value of ${value}` && index < 5) // Adjust the condition as needed
    );

    // Subscribe to the observable
    const subscription = observable.subscribe((value) => console.log(value));

    // const subscription = observable.subscribe({
    //   next: (value) => console.log(value),
    //   complete: () => console.log('Completed')
    // })
  }
  id: number = 0;

  @ViewChild('btn') button!: ElementRef;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.UserService.userId.next(this.id);
    });
  }

  constructor(
    private route: ActivatedRoute,
    private UserService: UserService
  ) {}

  onActivate(): void {
    this.UserService.activatedUserEmitter.next(true);
  }
}
