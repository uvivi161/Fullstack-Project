import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityYearlyChartComponent } from './graph.component';

describe('GraphComponent', () => {
  let component: CityYearlyChartComponent;
  let fixture: ComponentFixture<CityYearlyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityYearlyChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityYearlyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
