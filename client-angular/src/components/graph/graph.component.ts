// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-graph',
//   imports: [],
//   templateUrl: './graph.component.html',
//   styleUrl: './graph.component.css'
// })
// export class GraphComponent {

// }


// import { Component, OnInit, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

// @Component({
//   selector: 'app-user-statistics',
//   standalone: true,
//   imports: [CommonModule, NgxChartsModule],
//   template: `
//     @if (chartData().length > 0) {
//       <ngx-charts-grouped-vertical-bar-chart
//         [view]="view"
//         [scheme]="colorScheme"
//         [results]="chartData()"
//         [gradient]="false"
//         [xAxis]="true"
//         [yAxis]="true"
//         [legend]="true"
//         [showXAxisLabel]="true"
//         [showYAxisLabel]="true"
//         [xAxisLabel]="'Country'"
//         [yAxisLabel]="'Users Count'">
//       </ngx-charts-grouped-vertical-bar-chart>
//     } @else {
//       <p>Loading statistics...</p>
//     }
//   `,
//   styles: [`
//     :host {
//       display: block;
//       width: 100%;
//     }
//   `],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA]
// })
// export class UserStatisticsComponent implements OnInit {

//   chartData = signal<any[]>([]);
//   view: [number, number] = [900, 500];

//   colorScheme = {
//     name: 'cool',
//     selectable: true,
//     group: 'Ordinal',
//     domain: ['#A10A28', '#C7B42C', '#AAAAAA', '#5AA454', '#1f77b4']
//   };

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchStatistics();
//   }

//   fetchStatistics() {
//     this.http.get<any[]>('https://localhost:7170/api/UserStatistics/cities-yearly?fromYear=2020&toYear=2025')
//       .subscribe(data => {
//         const transformed = data.map(cityData => ({
//           name: cityData.city,
//           series: Object.keys(cityData.yearlyUserCounts).map(year => ({
//             name: year,
//             value: cityData.yearlyUserCounts[year]
//           }))
//         }));
//         this.chartData.set(transformed);
//       });
//   }
// }


// city-yearly-chart.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

interface CityYearlyData {
  city: string;
  yearlyUserCounts: { [year: string]: number };
}

interface ChartData {
  name: string;
  series: { name: string; value: number }[];
}

@Component({
  selector: 'app-city-yearly-chart',
  standalone: true,
  imports: [HttpClientModule,NgxChartsModule, CommonModule],
  template: `
    <div class="chart-container">
      <h2>City Yearly Statistics</h2>
      
      @if(loading){
        <div class="loading">Loading data...</div>
      }
      
      @if(error){
        <div class="error">
          Error loading data: {{ error }}
        </div>
      }
      
      @if(!loading && !error){
        <div class="chart">
          <ngx-charts-bar-vertical-2d
            [view]="[1000, 500]"
            [scheme]="colorScheme"
            [results]="chartData"
            [gradient]="false"
            [xAxis]="true"
            [yAxis]="true"
            [legend]="true"
            [showXAxisLabel]="true"
            [showYAxisLabel]="true"
            [showGridLines]="false"
            [xAxisLabel]="'Cities'"
            [yAxisLabel]="'Users'"
            [legendTitle]="'Years'"
            [groupPadding]="20"
            [barPadding]="5">
          </ngx-charts-bar-vertical-2d>
        </div>
      }
    </div>
  `,
  styles: [`
    .chart-container {
      padding: 20px;
    }
    
    .loading, .error {
      padding: 20px;
      text-align: center;
    }
    
    .error {
      color: red;
    }
    
    .chart {
      width: 100%;
      height: 500px;
    }
  `]
})
export class CityYearlyChartComponent implements OnInit {
  chartData: ChartData[] = [];
  loading = true;
  error: string | null = null;
  
  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#4682B4', '#FF7F50', '#9370DB']
  };
  
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    console.log('component work');
    
    this.fetchCityYearlyData();
  }
  
  fetchCityYearlyData(): void {
    this.loading = true;
    this.error = null;
    this.http.get<CityYearlyData[]>('https://localhost:7170/api/UserStatistics/cities-yearly?fromYear=2020&toYear=2025')
      .subscribe({
        next: (data) => {
          this.transformData(data);
          console.log(data);
          debugger;
          
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load data';
          this.loading = false;
          debugger;
          console.error('Error fetching city yearly statistics:', err);
        }
      });
  }
  
  transformData(data: CityYearlyData[]): void {
    // Create an array to hold the chart data
    let chartData: ChartData[] = [];
    
    // Get all unique years across all cities
    const allYears = new Set<string>();
    data.forEach(cityData => {
      Object.keys(cityData.yearlyUserCounts).forEach(year => {
        allYears.add(year);
      });
    });
    
    // Sort the years
    const sortedYears = Array.from(allYears).sort();
    
    // Transform data for each city
    data.forEach(cityData => {
      const cityEntry: ChartData = {
        name: cityData.city,
        series: []
      };
      
      // Add entry for each year (including zero if no data)
      sortedYears.forEach(year => {
        const count = cityData.yearlyUserCounts[year] || 0;
        cityEntry.series.push({
          name: year,
          value: count
        });
      });
      
      chartData.push(cityEntry);
    });
    
    this.chartData = chartData;
  }
}