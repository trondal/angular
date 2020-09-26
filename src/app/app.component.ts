import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  loading: boolean = false;

  constructor(private loadingService: LoadingService, httpService: HttpClient) {
    httpService
      .get(
        'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' +
          environment.lat +
          '&lon=' +
          environment.lon
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
  ngOnInit(): void {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loadingService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading: boolean) => {
        this.loading = loading;
      });
  }
}
