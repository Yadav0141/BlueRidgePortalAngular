import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupOrRestoreComponent } from './backup-or-restore.component';

describe('BackupOrRestoreComponent', () => {
  let component: BackupOrRestoreComponent;
  let fixture: ComponentFixture<BackupOrRestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupOrRestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupOrRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
