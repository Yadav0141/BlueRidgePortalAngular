import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupRestoreHistoryListComponent } from './backup-restore-history-list.component';

describe('BackupRestoreHistoryListComponent', () => {
  let component: BackupRestoreHistoryListComponent;
  let fixture: ComponentFixture<BackupRestoreHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupRestoreHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupRestoreHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
