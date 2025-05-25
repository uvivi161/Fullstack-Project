import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityChartsDashboardComponent } from './graph.component';

describe('GraphComponent', () => {
  let component: CityChartsDashboardComponent;
  let fixture: ComponentFixture<CityChartsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityChartsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityChartsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
