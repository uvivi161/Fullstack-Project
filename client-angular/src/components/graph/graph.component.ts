import { Component, type OnInit } from "@angular/core"
import { HttpClient, HttpClientModule } from "@angular/common/http"
import { NgxChartsModule, ScaleType } from "@swimlane/ngx-charts"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface CityYearlyData {
  city: string
  yearlyUserCounts: { [year: string]: number }
}

interface ChartData {
  name: string
  series: { name: string; value: number }[]
}

interface SingleSeriesData {
  name: string
  value: number
}

@Component({
  selector: "app-city-charts-dashboard",
  standalone: true,
  imports: [HttpClientModule, NgxChartsModule, CommonModule, FormsModule],
  template: `
    <div class="executive-dashboard">
      <div class="dashboard-header">
        <div class="header-content">
          <h1>Executive Analytics</h1>
          <p class="dashboard-subtitle">Global User Distribution & Growth Analysis</p>
        </div>
        <div class="time-period">
          <span class="period-label">Data Period:</span>
          <span class="period-value" *ngIf="years.length > 0">{{ years[0] }} - {{ years[years.length-1] }}</span>
        </div>
      </div>
      
      <!-- Loading and Error States -->
      <div class="status-container" *ngIf="loading || error">
        <div class="loading-container" *ngIf="loading">
          <div class="spinner"></div>
          <p>Loading analytics data...</p>
        </div>
        
        <div class="error-container" *ngIf="error">
          <div class="error-icon">⚠️</div>
          <p>Error retrieving data: {{ error }}</p>
          <button class="retry-button" (click)="fetchCityYearlyData()">Retry</button>
        </div>
      </div>
      
      <!-- Dashboard Content -->
      <div class="dashboard-content" *ngIf="!loading && !error">
        <!-- Executive Summary -->
        <div class="executive-summary" *ngIf="years.length > 0">
          <div class="kpi-grid">
            <div class="kpi-card primary">
              <div class="kpi-trend" [class.positive]="getTrendPercentage() > 0" [class.negative]="getTrendPercentage() < 0">
                <span class="trend-value">{{ getTrendPercentage() }}%</span>
                <span class="trend-icon">{{ getTrendPercentage() >= 0 ? '↑' : '↓' }}</span>
              </div>
              <div class="kpi-value">{{ getTotalUsersForYear(years[years.length-1]) | number }}</div>
              <div class="kpi-label">Total Users</div>
              <div class="kpi-period">{{ years[years.length-1] }}</div>
            </div>
            
            <div class="kpi-card">
              <div class="kpi-icon">
                <div class="icon-circle">
                  <span class="icon">🏙️</span>
                </div>
              </div>
              <div class="kpi-content">
                <div class="kpi-value">{{ rawData.length }}</div>
                <div class="kpi-label">Active Cities</div>
              </div>
            </div>
            
            <div class="kpi-card">
              <div class="kpi-icon">
                <div class="icon-circle">
                  <span class="icon">📈</span>
                </div>
              </div>
              <div class="kpi-content">
                <div class="kpi-value">{{ getTopCityForYear(years[years.length-1]).city }}</div>
                <div class="kpi-label">Top Performing City</div>
                <div class="kpi-sublabel">{{ getTopCityForYear(years[years.length-1]).count | number }} users</div>
              </div>
            </div>
            
            <div class="kpi-card">
              <div class="kpi-icon">
                <div class="icon-circle">
                  <span class="icon">📊</span>
                </div>
              </div>
              <div class="kpi-content">
                <div class="kpi-value">{{ getAverageUsersPerCity() | number:'1.0-0' }}</div>
                <div class="kpi-label">Avg. Users per City</div>
                <div class="kpi-sublabel">{{ years[years.length-1] }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Chart Navigation -->
        <div class="visualization-section">
          <div class="section-header">
            <h2>Data Visualization</h2>
            <div class="chart-tabs">
              <button 
                *ngFor="let chart of chartOptions" 
                [class.active]="activeChart === chart.id"
                (click)="activeChart = chart.id">
                <span class="tab-icon">{{ chart.icon }}</span>
                <span class="tab-label">{{ chart.label }}</span>
              </button>
            </div>
          </div>
          
          <!-- Year Selector (for Pie Chart) -->
          <div class="filter-controls" *ngIf="activeChart === 'pie'">
            <div class="filter-group">
              <label for="yearSelect">Year:</label>
              <select id="yearSelect" [(ngModel)]="selectedYear" (change)="onYearChange()">
                <option *ngFor="let year of years" [value]="year">{{ year }}</option>
              </select>
            </div>
          </div>
          
          <!-- Charts -->
          <div class="chart-container">
            <!-- Bar Chart -->
            <div class="chart" *ngIf="activeChart === 'bar' && barChartData.length > 0">
              <h3>City Usage by Year</h3>
              <ngx-charts-bar-vertical-2d
                [view]="view"
                [scheme]="colorScheme"
                [results]="barChartData"
                [gradient]="true"
                [xAxis]="true"
                [yAxis]="true"
                [legend]="true"
                [showXAxisLabel]="true"
                [showYAxisLabel]="true"
                [xAxisLabel]="'Cities'"
                [yAxisLabel]="'Users'"
                [legendTitle]="'Years'"
                [groupPadding]="20"
                [barPadding]="5"
                [roundDomains]="true"
                [showGridLines]="true">
              </ngx-charts-bar-vertical-2d>
            </div>
            
            <!-- Line Chart -->
            <div class="chart" *ngIf="activeChart === 'line' && lineChartData.length > 0">
              <h3>User Growth Trends by City</h3>
              <ngx-charts-line-chart
                [view]="view"
                [scheme]="colorScheme"
                [results]="lineChartData"
                [gradient]="false"
                [xAxis]="true"
                [yAxis]="true"
                [legend]="true"
                [showXAxisLabel]="true"
                [showYAxisLabel]="true"
                [xAxisLabel]="'Year'"
                [yAxisLabel]="'Users'"
                [autoScale]="true"
                [curve]="'monotoneX'"
                [roundDomains]="true"
                [showGridLines]="true">
              </ngx-charts-line-chart>
            </div>
            
            <!-- Pie Chart -->
            <div class="chart" *ngIf="activeChart === 'pie' && pieChartData.length > 0">
              <h3>City Distribution for {{ selectedYear }}</h3>
              <ngx-charts-advanced-pie-chart
                [view]="view"
                [scheme]="colorScheme"
                [results]="pieChartData"
                [gradient]="true">
              </ngx-charts-advanced-pie-chart>
            </div>
            
            <!-- Heat Map -->
            <div class="chart" *ngIf="activeChart === 'heatmap' && heatMapData.length > 0">
              <h3>Usage Intensity by City and Year</h3>
              <ngx-charts-heat-map
                [view]="view"
                [scheme]="colorScheme"
                [results]="heatMapData"
                [gradient]="false"
                [xAxis]="true"
                [yAxis]="true"
                [legend]="true"
                [showXAxisLabel]="true"
                [showYAxisLabel]="true"
                [xAxisLabel]="'Year'"
                [yAxisLabel]="'City'"
                [innerPadding]="10">
              </ngx-charts-heat-map>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    /* Executive Dashboard Styles */
    .executive-dashboard {
      font-family: 'Segoe UI', 'Roboto', sans-serif;
      max-width: 1400px;
      margin: 0 auto;
      background-color: #f5f7fa;
      color: #2c3e50;
      padding: 0;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }

    /* Header Styles */
    .dashboard-header {
      background: linear-gradient(135deg, #2c3e50, #34495e);
      color: white;
      padding: 30px 40px;
      border-radius: 10px 10px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-content h1 {
      font-size: 28px;
      font-weight: 300;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .dashboard-subtitle {
      font-size: 14px;
      opacity: 0.8;
      margin: 5px 0 0 0;
      font-weight: 400;
    }

    .time-period {
      background: rgba(255, 255, 255, 0.1);
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 13px;
    }

    .period-label {
      opacity: 0.7;
      margin-right: 5px;
    }

    .period-value {
      font-weight: 500;
    }

    /* Loading and Error States */
    .status-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      padding: 20px;
    }

    .loading-container, .error-container {
      text-align: center;
      padding: 40px;
      border-radius: 10px;
      background-color: white;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      max-width: 400px;
    }

    .spinner {
      width: 50px;
      height: 50px;
      margin: 0 auto 25px;
      border: 3px solid rgba(0, 0, 0, 0.05);
      border-radius: 50%;
      border-top-color: #3498db;
      animation: spin 1s ease-in-out infinite;
    }

    .error-icon {
      font-size: 50px;
      margin-bottom: 20px;
    }

    .retry-button {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 5px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .retry-button:hover {
      background-color: #2980b9;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    /* Dashboard Content */
    .dashboard-content {
      padding: 30px 40px 40px;
    }

    /* Executive Summary / KPI Section */
    .executive-summary {
      margin-bottom: 40px;
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .kpi-card {
      background-color: white;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
    }

    .kpi-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .kpi-card.primary {
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
      grid-column: span 2;
      display: block;
    }

    .kpi-trend {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 14px;
      font-weight: 600;
      padding: 5px 10px;
      border-radius: 15px;
      background-color: rgba(255, 255, 255, 0.2);
    }

    .kpi-trend.positive {
      color: #2ecc71;
    }

    .kpi-trend.negative {
      color: #e74c3c;
    }

    .kpi-value {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 5px;
      line-height: 1.2;
    }

    .kpi-label {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.8;
    }

    .kpi-period {
      font-size: 13px;
      opacity: 0.7;
      margin-top: 5px;
    }

    .kpi-sublabel {
      font-size: 12px;
      opacity: 0.7;
      margin-top: 3px;
    }

    .kpi-icon {
      margin-right: 20px;
    }

    .icon-circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon {
      font-size: 24px;
    }

    .kpi-content {
      flex: 1;
    }

    /* Visualization Section */
    .visualization-section {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .section-header {
      padding: 25px 30px;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .section-header h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      color: #2c3e50;
    }

    /* Chart Tabs - Improved Button Design */
    .chart-tabs {
      display: flex;
      gap: 5px;
    }

    .chart-tabs button {
      background: none;
      border: none;
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 500;
      color: #64748b;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .chart-tabs button:hover {
      background-color: #f1f5f9;
      color: #334155;
    }

    .chart-tabs button.active {
      background-color: #3498db;
      color: white;
    }

    .tab-icon {
      font-size: 18px;
    }

    /* Filter Controls */
    .filter-controls {
      padding: 15px 30px;
      background-color: #f8fafc;
      border-bottom: 1px solid #f1f5f9;
    }

    .filter-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .filter-group label {
      font-size: 14px;
      font-weight: 500;
      color: #64748b;
    }

    .filter-group select {
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      background-color: white;
      font-size: 14px;
      color: #334155;
      min-width: 120px;
    }

    /* Chart Container */
    .chart-container {
      padding: 30px;
    }

    .chart {
      width: 100%;
      height: 500px;
    }

    .chart h3 {
      font-size: 18px;
      font-weight: 600;
      color: #334155;
      margin: 0 0 20px 0;
      text-align: center;
    }

    /* Animation */
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }

      .time-period {
        align-self: flex-start;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .chart-tabs {
        width: 100%;
        overflow-x: auto;
        padding-bottom: 5px;
      }

      .kpi-card.primary {
        grid-column: span 1;
      }
    }
  `,
  ],
})
export class CityChartsDashboardComponent implements OnInit {
  // Data
  rawData: CityYearlyData[] = []
  barChartData: ChartData[] = []
  lineChartData: ChartData[] = []
  pieChartData: SingleSeriesData[] = []
  heatMapData: ChartData[] = []

  // UI state
  loading = true
  error: string | null = null
  activeChart = "bar" // Default chart type
  selectedYear: string | null = null
  years: string[] = []

  // Chart options with icons
  chartOptions = [
    { id: "bar", label: "Bar Chart", icon: "📊" },
    { id: "line", label: "Trend Line", icon: "📈" },
    { id: "pie", label: "Distribution", icon: "🔄" },
    { id: "heatmap", label: "Heat Map", icon: "🔥" },
  ]

  // Chart options
  view: [number, number] = [900, 500]

  // Color schemes
  colorScheme = {
    name: "vivid",
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      "#3498db", // Primary blue
      "#2ecc71", // Green
      "#9b59b6", // Purple
      "#f1c40f", // Yellow
      "#e74c3c", // Red
      "#1abc9c", // Teal
      "#34495e", // Dark blue
      "#e67e22", // Orange
      "#95a5a6", // Gray
      "#16a085", // Dark teal
    ],
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCityYearlyData()
  }

  fetchCityYearlyData(): void {
    this.loading = true
    this.error = null

    this.http
      .get<CityYearlyData[]>("https://localhost:7170/api/UserStatistics/cities-yearly?fromYear=2020&toYear=2025")
      .subscribe({
        next: (data) => {
          this.rawData = data
          this.processData(data)
          this.loading = false
        },
        error: (err) => {
          this.error = err.message || "Failed to load data"
          this.loading = false
          console.error("Error fetching city yearly statistics:", err)
        },
      })
  }

  processData(data: CityYearlyData[]): void {
    // Extract all unique years
    const allYears = new Set<string>()
    data.forEach((cityData) => {
      Object.keys(cityData.yearlyUserCounts).forEach((year) => {
        allYears.add(year)
      })
    })

    // Sort the years
    this.years = Array.from(allYears).sort()
    this.selectedYear = this.years[this.years.length - 1] // Default to latest year

    // Transform data for different chart types
    this.transformBarChartData(data, this.years)
    this.transformLineChartData(data, this.years)
    this.transformPieChartData(data, this.selectedYear)
    this.transformHeatMapData(data, this.years)
  }

  transformBarChartData(data: CityYearlyData[], sortedYears: string[]): void {
    const chartData: ChartData[] = []

    data.forEach((cityData) => {
      const cityEntry: ChartData = {
        name: cityData.city,
        series: [],
      }

      sortedYears.forEach((year) => {
        const count = cityData.yearlyUserCounts[year] || 0
        cityEntry.series.push({
          name: year,
          value: count,
        })
      })

      chartData.push(cityEntry)
    })

    this.barChartData = chartData
  }

  transformLineChartData(data: CityYearlyData[], sortedYears: string[]): void {
    const chartData: ChartData[] = []

    data.forEach((cityData) => {
      const cityEntry: ChartData = {
        name: cityData.city,
        series: [],
      }

      sortedYears.forEach((year) => {
        const count = cityData.yearlyUserCounts[year] || 0
        cityEntry.series.push({
          name: year,
          value: count,
        })
      })

      chartData.push(cityEntry)
    })

    this.lineChartData = chartData
  }

  transformPieChartData(data: CityYearlyData[], year: string | null): void {
    if (!year) return

    const chartData: SingleSeriesData[] = []

    data.forEach((cityData) => {
      const count = cityData.yearlyUserCounts[year] || 0
      chartData.push({
        name: cityData.city,
        value: count,
      })
    })

    this.pieChartData = chartData
  }

  transformHeatMapData(data: CityYearlyData[], sortedYears: string[]): void {
    const chartData: ChartData[] = []

    data.forEach((cityData) => {
      const cityEntry: ChartData = {
        name: cityData.city,
        series: [],
      }

      sortedYears.forEach((year) => {
        const count = cityData.yearlyUserCounts[year] || 0
        cityEntry.series.push({
          name: year,
          value: count,
        })
      })

      chartData.push(cityEntry)
    })

    this.heatMapData = chartData
  }

  onYearChange(): void {
    this.transformPieChartData(this.rawData, this.selectedYear)
  }

  // Helper method to get total users for a specific year
  getTotalUsersForYear(year: string): number {
    let total = 0
    this.rawData.forEach((cityData) => {
      total += cityData.yearlyUserCounts[year] || 0
    })
    return total
  }

  // Helper method to get city with most users for a specific year
  getTopCityForYear(year: string): { city: string; count: number } {
    let topCity = ""
    let topCount = 0

    this.rawData.forEach((cityData) => {
      const count = cityData.yearlyUserCounts[year] || 0
      if (count > topCount) {
        topCount = count
        topCity = cityData.city
      }
    })

    return { city: topCity, count: topCount }
  }

  // Helper method to calculate average users per city for the latest year
  getAverageUsersPerCity(): number {
    if (this.years.length === 0 || this.rawData.length === 0) return 0

    const latestYear = this.years[this.years.length - 1]
    const totalUsers = this.getTotalUsersForYear(latestYear)
    return totalUsers / this.rawData.length
  }

  // Helper method to calculate growth trend percentage
  getTrendPercentage(): number {
    if (this.years.length < 2) return 0

    const currentYear = this.years[this.years.length - 1]
    const previousYear = this.years[this.years.length - 2]

    const currentTotal = this.getTotalUsersForYear(currentYear)
    const previousTotal = this.getTotalUsersForYear(previousYear)

    if (previousTotal === 0) return 100

    const percentage = ((currentTotal - previousTotal) / previousTotal) * 100
    return Math.round(percentage * 10) / 10 // Round to 1 decimal place
  }
}
