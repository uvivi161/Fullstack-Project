import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateDialogeComponent } from './user-update-dialoge.component';

describe('UserUpdateDialogeComponent', () => {
  let component: UserUpdateDialogeComponent;
  let fixture: ComponentFixture<UserUpdateDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUpdateDialogeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdateDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
