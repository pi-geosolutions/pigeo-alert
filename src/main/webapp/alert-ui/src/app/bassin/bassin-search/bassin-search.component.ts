import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {Bassin} from "../bassin";
import {BassinService} from "../bassin.service";

@Component({
  selector: 'app-bassin-search',
  templateUrl: './bassin-search.component.html',
  styleUrls: ['./bassin-search.component.scss']
})
export class BassinSearchComponent implements OnInit {

  bassins$: Observable<Bassin[]>;
  private searchTerms = new Subject<string>();

  constructor(private bassinService: BassinService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.bassins$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.bassinService.searchBassins(term)),
    );
  }
}
