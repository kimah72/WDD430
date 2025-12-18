import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Entry } from '../entry.model';
import { EntryService } from '../entry.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-entry-list',
  standalone: false,
  templateUrl: './entry-list.html',
  styleUrls: ['./entry-list.css'],
})
export class EntryList implements OnInit, OnDestroy {
  entries: Entry[] = [];
  isLoading = false;
  totalEntries = 0;
  entryPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10, 25];
  userIsAuthenticated = false;
  userId: string = '';
  private entrySub!: Subscription;
  private authStatusSub!: Subscription;

  constructor(
    public entryService: EntryService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.entryService.getEntries(this.entryPerPage, this.currentPage);
    this.userId = this.authService.getUserId() ?? '';
    this.entrySub = this.entryService.getEntryUpdateListener()
      .subscribe((entryData: {entry: Entry[], entryCount: number}) => {
        this.isLoading = false;
        this.totalEntries = entryData.entryCount;
        this.entries = entryData.entry;
        this.cd.detectChanges();
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId() ?? '';
      this.cd.detectChanges();
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.entryPerPage = pageData.pageSize;
    this.entryService.getEntries(this.entryPerPage, this.currentPage);
  }

  onDelete(entryId: string) {
    this.isLoading = true;
    this.entryService.deleteEntry(entryId).subscribe(() => {
      this.entryService.getEntries(this.entryPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.entrySub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
