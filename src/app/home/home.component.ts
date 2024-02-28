import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    const customInterval = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        if (count == 5) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Count is Greater Than 3!'));
        }

        observer.next(count);

        count++;
      }, 1000);
    });

    this.firstObsSubscription = customInterval
      .pipe(
        filter((data: number) => {
          return data % 2 == 0;
        }),
        map((data: number) => {
          return `Round ${data + 1}`;
        })
      )
      .subscribe({
        next: (data: number | string) => console.log(data),
        error: (error: Error) => console.log(error.message),
        complete: () => console.log('Completed'),
      });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
