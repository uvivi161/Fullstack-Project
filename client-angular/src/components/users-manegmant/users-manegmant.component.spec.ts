import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManegmantComponent } from './users-manegmant.component';

describe('UsersManegmantComponent', () => {
  let component: UsersManegmantComponent;
  let fixture: ComponentFixture<UsersManegmantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersManegmantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersManegmantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
