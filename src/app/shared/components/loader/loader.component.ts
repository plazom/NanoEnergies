import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
@Component({
  selector: 'ne-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  color = 'Primary';
  mode: 'determinate' | 'indeterminate' = 'indeterminate';
  value = 100;
  diameter = 40;
  isLoading$: Subject<boolean> = this.loaderService.globalLoader.isLoading$;
  constructor(private loaderService: LoaderService){}
}