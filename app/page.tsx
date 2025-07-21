"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  // Core Navigation & System
  Home, Settings, Bell, Menu,
  // Agricultural Operations
  Sprout, TreePine,
  // Weather & Environment  
  Sun, Thermometer, Droplets,
  // Data & Analytics
  BarChart3, TrendingUp,
  // Status & Alerts
  AlertTriangle, CheckCircle, XCircle,
  // Farm Management
  Map, Gauge, Activity,
  // Technology
  Wifi, Drone, Camera, Satellite,
  // Actions
  Plus, Download, RefreshCw, Eye, Target
} from "lucide-react"

// Sophisticated Apple Orchard Data for Virtual Agriculture Advisor
const orchardMetrics = {
  diseaseRisk: {
    overall: { level: 'Moderate', score: 4.7, trend: '+0.8 from yesterday' },
    appleScab: { risk: 'High', probability: 78, nextSprayWindow: '2 days' },
    fireBlight: { risk: 'Low', probability: 15, status: 'Monitoring' },
    powderyMildew: { risk: 'Moderate', probability: 42, action: 'Preventive spray recommended' },
    cedarAppleRust: { risk: 'Low', probability: 12, status: 'Seasonal monitoring' }
  },
  yieldPrediction: {
    estimated: { tons: 387, perHectare: 7.74, confidence: 94 },
    marketValue: { current: '$2.85/kg', projected: '$3.12/kg', revenue: '$1.2M' },
    harvestOptimal: { date: 'September 15-22', daysRemaining: 28 }
  },
  orchardStatus: {
    totalTrees: 12500,
    healthyTrees: 11875,
    atRiskTrees: 475,
    diseasedTrees: 150,
    area: 50, // hectares
    density: 250 // trees per hectare
  },
  sections: [
    { id: 'A', name: 'Section A', trees: 3125, health: 'healthy', coverage: 98 },
    { id: 'B', name: 'Section B', trees: 3125, health: 'warning', coverage: 94 },
    { id: 'C', name: 'Section C', trees: 3125, health: 'healthy', coverage: 97 },
    { id: 'D', name: 'Section D', trees: 3125, health: 'healthy', coverage: 96 }
  ],
  weather: {
    current: { temp: 23, humidity: 68, windSpeed: 12, pressure: 1013 },
    forecast: { frostRisk: 'Low', hailRisk: 'None', optimalSpray: 'Tomorrow 6-9 AM' },
    evapotranspiration: { today: 4.2, weekly: 28.5, irrigationNeeded: false }
  }
}

const aiRecommendations = [
  {
    id: 1,
    type: 'critical',
    category: 'Disease Prevention',
    title: 'Apple Scab Risk - Immediate Action Required',
    description: 'Weather conditions favor apple scab development. Apply fungicide (Captan 50WP) within 24-48 hours.',
    action: 'Schedule spray drone for Sections B, C, D',
    confidence: 89,
    time: '12 minutes ago',
    delivered: 'Sent via SMS & Email',
    equipment: 'DJI Agras T40, 15L tank'
  },
  {
    id: 2,
    type: 'advisory',
    category: 'Growth Stage',
    title: 'Optimal Thinning Window Approaching',
    description: 'Fruit diameter reaching 10-12mm. Begin chemical thinning in 5-7 days for optimal yield.',
    action: 'Prepare NAA + Carbaryl treatment',
    confidence: 94,
    time: '1 hour ago',
    delivered: 'Sent via SMS & Email',
    equipment: 'Ground sprayer recommended'
  },
  {
    id: 3,
    type: 'opportunity',
    category: 'Market Intelligence',
    title: 'Premium Harvest Timing Opportunity',
    description: 'Market prices projected to peak at $3.25/kg in 3 weeks. Current ripeness: 67%.',
    action: 'Monitor sugar levels, plan harvest for Sept 18-20',
    confidence: 78,
    time: '3 hours ago',
    delivered: 'Sent via SMS & Email',
    equipment: 'Sugar refractometer testing'
  }
]

// Real-time IoT Sensor Data (2-minute intervals)
const sensorData = [
  {
    id: 'leafWetness',
    name: 'Leaf Wetness Duration',
    current: 6.8,
    unit: 'hours',
    status: 'warning',
    threshold: '<6 hours',
    trend: '+0.4h',
    diseaseRisk: 'Moderate',
    lastReading: '2 minutes ago',
    chartData: [4.2, 4.8, 5.1, 5.9, 6.2, 6.8] // last 6 readings
  },
  {
    id: 'temperature',
    name: 'Air Temperature',
    current: 23.5,
    unit: '°C',
    status: 'optimal',
    threshold: '18-28°C',
    trend: '+1.2°C',
    growthImpact: 'Favorable',
    lastReading: '2 minutes ago',
    chartData: [21.8, 22.1, 22.6, 23.0, 23.2, 23.5]
  },
  {
    id: 'humidity',
    name: 'Relative Humidity',
    current: 68,
    unit: '%',
    status: 'normal',
    threshold: '50-75%',
    trend: '-2%',
    sprayCondition: 'Acceptable',
    lastReading: '2 minutes ago',
    chartData: [72, 71, 70, 69, 68, 68]
  },
  {
    id: 'light',
    name: 'Solar Radiation',
    current: 850,
    unit: 'W/m²',
    status: 'optimal',
    threshold: '600-1000 W/m²',
    trend: '+50 W/m²',
    photosynthesis: 'Excellent',
    lastReading: '2 minutes ago',
    chartData: [780, 800, 820, 835, 845, 850]
  }
]

// Additional data structures will be added for other tabs as needed

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Mobile-First Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-md" role="banner">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo & Title - Mobile Optimized */}
            <div className="flex items-center min-w-0 flex-1">
              <div className="flex items-center">
                <div className="p-2 bg-primary rounded-xl mr-3 shadow-lg">
                  <Sprout className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <h1 className="heading-md md:heading-lg text-primary font-black truncate">
                    Applico Virtual Agriculture Advisor
                  </h1>
                  <p className="hidden md:block body-md text-muted-foreground">
                    AI-Powered Apple Orchard Intelligence • 50 Hectares
                  </p>
                </div>
              </div>
            </div>
            
            {/* Header Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm font-semibold text-green-800">System Online</span>
              </div>
              <Button className="btn-outline-ag">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <Button size="sm" variant="ghost" className="p-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2">
                <Menu className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Navigation Tabs - Hidden on Mobile */}
      <div className="hidden md:block bg-card border-b border-border">
        <div className="px-6 lg:px-8">
          <nav className="flex space-x-1" role="tablist" aria-label="Dashboard navigation">
            {[
              { name: 'Overview', icon: Home },
              { name: 'Sensors', icon: Activity },
              { name: 'Orchard Map', icon: Map },
              { name: 'Analytics', icon: BarChart3 }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => {
                  setIsLoading(true)
                  setTimeout(() => setIsLoading(false), 300)
                  setActiveTab(tab.name)
                }}
                className={`flex items-center px-6 py-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === tab.name
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                role="tab"
                aria-selected={activeTab === tab.name}
                aria-controls={`panel-${tab.name.toLowerCase().replace(' ', '-')}`}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50" role="navigation">
        <div className="grid grid-cols-4 h-16">
          {[
            { name: 'Overview', icon: Home, label: 'Home' },
            { name: 'Sensors', icon: Activity, label: 'Sensors' },
            { name: 'Orchard Map', icon: Map, label: 'Map' },
            { name: 'Analytics', icon: BarChart3, label: 'Stats' }
          ].map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`mobile-nav-item ${activeTab === tab.name ? 'active' : ''}`}
              aria-label={`Switch to ${tab.label}`}
            >
              <tab.icon className="h-6 w-6 mb-1" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 md:px-6 lg:px-8 py-6 md:py-8 max-w-7xl mx-auto" role="main">
        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {activeTab === 'Overview' && <OverviewContent />}
          {activeTab === 'Sensors' && <SensorsContent />}
          {activeTab === 'Orchard Map' && <OrchardMapContent />}
          {activeTab === 'Analytics' && <AnalyticsContent />}
        </div>
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" role="status" aria-live="polite">
            <div className="card-agricultural p-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="heading-sm text-primary">Loading Farm Data...</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )

  // Component functions for each tab content
  function OverviewContent() {
    return (
      <div 
        id="panel-overview" 
        role="tabpanel" 
        aria-labelledby="Overview" 
        className="space-y-6 md:space-y-8"
      >
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="heading-lg text-foreground">Virtual Agriculture Advisor</h2>
            <p className="body-lg text-muted-foreground mt-1">
              AI-powered insights for your 50-hectare apple orchard • 12,500 trees
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg border border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-semibold text-green-800">All Systems Active</span>
            </div>
          </div>
        </div>

        {/* AI Disease Prediction System */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="heading-md text-foreground">AI Disease Prediction System</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-orange-50 px-2 py-1 rounded text-xs border border-orange-200">
                <AlertTriangle className="h-3 w-3 text-orange-600 mr-1" />
                <span className="font-bold text-orange-800">{orchardMetrics.diseaseRisk.overall.level} Risk</span>
              </div>
              <Button size="sm" variant="outline" className="btn-outline-ag text-xs">
                <Eye className="h-3 w-3 mr-1" />
                AI Analysis
              </Button>
            </div>
          </div>
          
          {/* 2-Column Grid for Disease Risk - Apple Specific */}
          <div className="farm-grid-2">
            {/* Apple Scab - Highest Priority */}
            <div className="card-status critical">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="heading-sm text-foreground">Apple Scab</h4>
                    <p className="body-md text-muted-foreground">Primary Threat</p>
                  </div>
                </div>
                <div className="status-dot critical"></div>
              </div>
              
              <div className="space-y-4">
                <div className="metric-display text-red-600">{orchardMetrics.diseaseRisk.appleScab.probability}%</div>
                <div className="flex items-center justify-between">
                  <span className="body-md font-semibold">Risk Level</span>
                  <span className="metric-display-sm text-red-600">{orchardMetrics.diseaseRisk.appleScab.risk}</span>
                </div>
                <div className="text-xs font-bold text-red-800 bg-red-50 px-2 py-1 rounded">
                  Action: Spray in {orchardMetrics.diseaseRisk.appleScab.nextSprayWindow}
                </div>
                <div className="progress-agricultural">
                  <div className="progress-fill-warning" style={{width: `${orchardMetrics.diseaseRisk.appleScab.probability}%`}}></div>
                </div>
              </div>
            </div>
            
            {/* Other Disease Risks */}
            <div className="card-agricultural">
              <div className="flex items-center justify-between mb-4">
                <h4 className="heading-sm text-foreground">Other Diseases</h4>
                <TreePine className="h-5 w-5 text-green-500" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="body-md text-sm">Fire Blight</span>
                  </div>
                  <span className="font-bold text-green-600 text-sm">{orchardMetrics.diseaseRisk.fireBlight.probability}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="body-md text-sm">Powdery Mildew</span>
                  </div>
                  <span className="font-bold text-yellow-600 text-sm">{orchardMetrics.diseaseRisk.powderyMildew.probability}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="body-md text-sm">Cedar Apple Rust</span>
                  </div>
                  <span className="font-bold text-green-600 text-sm">{orchardMetrics.diseaseRisk.cedarAppleRust.probability}%</span>
                </div>
                
                <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
                  <span className="font-bold text-blue-800">AI Confidence:</span>
                  <span className="text-blue-700 ml-1">94% based on weather, sensors & historical data</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apple Orchard Intelligence - Key Metrics */}
        <div className="space-y-4">
          <h3 className="heading-md text-foreground">Orchard Intelligence Dashboard</h3>
          <div className="farm-grid-3-mobile">
            {/* AI Yield Prediction - Compact */}
            <div className="card-agricultural p-3">
              <div className="text-center space-y-2">
                <div className="p-2 bg-green-100 rounded-lg mx-auto w-fit">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-lg md:text-xl font-black text-green-600 tabular-nums">
                    {orchardMetrics.yieldPrediction.estimated.tons}T
                  </div>
                  <p className="text-xs font-bold text-muted-foreground">Est. Yield</p>
                </div>
                <div className="flex items-center justify-center bg-green-50 px-1 py-0.5 rounded text-xs">
                  <span className="font-bold text-green-600">{orchardMetrics.yieldPrediction.estimated.confidence}% confidence</span>
                </div>
              </div>
            </div>

            {/* Market Value Projection */}
            <div className="card-agricultural p-3">
              <div className="text-center space-y-2">
                <div className="p-2 bg-blue-100 rounded-lg mx-auto w-fit">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-lg md:text-xl font-black text-blue-600 tabular-nums">
                    {orchardMetrics.yieldPrediction.marketValue.revenue}
                  </div>
                  <p className="text-xs font-bold text-muted-foreground">Revenue</p>
                </div>
                <p className="text-xs font-bold text-blue-600 bg-blue-50 px-1 py-0.5 rounded">
                  {orchardMetrics.yieldPrediction.marketValue.projected}
                </p>
              </div>
            </div>

            {/* Optimal Harvest Window */}
            <div className="card-agricultural p-3">
              <div className="text-center space-y-2">
                <div className="p-2 bg-orange-100 rounded-lg mx-auto w-fit">
                  <Activity className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-lg md:text-xl font-black text-orange-600 tabular-nums">
                    {orchardMetrics.yieldPrediction.harvestOptimal.daysRemaining}d
                  </div>
                  <p className="text-xs font-bold text-muted-foreground">To Harvest</p>
                </div>
                <div className="text-xs font-bold text-orange-800 bg-orange-50 px-1 py-0.5 rounded">
                  Sept 15-22
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations & Action Center */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="heading-md text-foreground">AI Recommendations & Action Center</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-green-50 px-2 py-1 rounded text-xs border border-green-200">
                <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                <span className="font-bold text-green-800">SMS & Email Active</span>
              </div>
              <Button size="sm" variant="outline" className="btn-outline-ag text-xs">
                <Bell className="h-3 w-3 mr-1" />
                View All
              </Button>
            </div>
          </div>
          
          <div className="farm-grid-mobile-compact">
            {aiRecommendations.map((rec) => (
              <div 
                key={rec.id}
                className={`alert-agricultural ${
                  rec.type === 'critical' ? 'error' : rec.type === 'advisory' ? 'warning' : 'info'
                } p-4`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full flex-shrink-0 ${
                    rec.type === 'critical' 
                      ? 'bg-red-100' 
                      : rec.type === 'advisory'
                      ? 'bg-yellow-100'
                      : 'bg-blue-100'
                  }`}>
                    {rec.type === 'critical' ? (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    ) : rec.type === 'advisory' ? (
                      <Bell className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-black text-base text-foreground">{rec.title}</h4>
                          <div className={`px-2 py-0.5 rounded text-xs font-bold ${
                            rec.type === 'critical' ? 'bg-red-100 text-red-800' :
                            rec.type === 'advisory' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {rec.category}
                          </div>
                        </div>
                        <div className="text-xs font-bold text-green-600">{rec.delivered}</div>
                      </div>
                      <span className="text-xs font-bold text-muted-foreground ml-2">
                        {rec.time}
                      </span>
                    </div>
                    
                    <p className="text-sm font-bold text-muted-foreground mb-2">{rec.description}</p>
                    
                    <div className="bg-gray-50 p-2 rounded mb-3">
                      <p className="text-xs font-bold text-gray-800 mb-1">
                        🤖 Recommended Action:
                      </p>
                      <p className="text-xs font-semibold text-gray-700">{rec.action}</p>
                      {rec.equipment && (
                        <p className="text-xs text-gray-600 mt-1">
                          🛠️ Equipment: {rec.equipment}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-gray-600">AI Confidence:</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{width: `${rec.confidence}%`}}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-green-600">{rec.confidence}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        className="btn-primary-ag text-xs px-3 py-1.5 h-auto"
                        onClick={() => setActiveTab('Orchard Map')}
                      >
                        <Map className="h-3 w-3 mr-1" />
                        View on Map
                      </Button>
                      {rec.type === 'critical' && (
                        <Button 
                          size="sm" 
                          className="btn-secondary-ag text-xs px-3 py-1.5 h-auto"
                        >
                          <Drone className="h-3 w-3 mr-1" />
                          Schedule Drone
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="text-xs px-2 py-1.5 h-auto font-bold">
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <div className="space-y-4">
          <h3 className="heading-md text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Button className="btn-primary-ag h-16 md:h-20 flex-col space-y-1 md:space-y-2">
              <Drone className="h-6 w-6 md:h-8 md:w-8" />
              <span className="font-black text-xs md:text-sm">Schedule Drone</span>
            </Button>
            
            <Button className="btn-secondary-ag h-16 md:h-20 flex-col space-y-1 md:space-y-2">
              <Camera className="h-6 w-6 md:h-8 md:w-8" />
              <span className="font-black text-xs md:text-sm">Capture Images</span>
            </Button>
            
            <Button className="btn-outline-ag h-16 md:h-20 flex-col space-y-1 md:space-y-2">
              <BarChart3 className="h-6 w-6 md:h-8 md:w-8" />
              <span className="font-black text-xs md:text-sm">View Reports</span>
            </Button>
            
            <Button className="btn-outline-ag h-16 md:h-20 flex-col space-y-1 md:space-y-2">
              <Settings className="h-6 w-6 md:h-8 md:w-8" />
              <span className="font-black text-xs md:text-sm">Settings</span>
            </Button>
          </div>
        </div>

        {/* Farm Statistics - Mobile Optimized */}
        <div className="space-y-6">
          <h3 className="heading-md text-foreground">Today&apos;s Statistics</h3>
          <div className="farm-grid-2">
            {/* Performance Stats */}
            <div className="card-agricultural">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="heading-sm text-foreground">Performance</h4>
                  <p className="body-md text-muted-foreground">System Overview</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="body-md">Trees Monitored</span>
                  <div className="text-right">
                    <span className="metric-display-sm">847</span>
                    <div className="progress-agricultural mt-1 w-16">
                      <div className="progress-fill-primary" style={{width: '95%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="body-md">Sensor Readings</span>
                  <div className="text-right">
                    <span className="metric-display-sm">1,247</span>
                    <div className="progress-agricultural mt-1 w-16">
                      <div className="progress-fill-success" style={{width: '100%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="body-md">System Uptime</span>
                  <div className="text-right">
                    <span className="metric-display-sm text-green-600">99.9%</span>
                    <div className="progress-agricultural mt-1 w-16">
                      <div className="progress-fill-success" style={{width: '99%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Coverage Stats */}
            <div className="card-agricultural">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="heading-sm text-foreground">Coverage</h4>
                  <p className="body-md text-muted-foreground">Field Operations</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="body-md">Spray Coverage</span>
                  <span className="metric-display-sm text-blue-600">98.2%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="body-md">Image Capture</span>
                  <span className="metric-display-sm text-green-600">94.8%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="body-md">Data Accuracy</span>
                  <span className="metric-display-sm text-green-600">97.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function SensorsContent() {
    return (
      <div 
        id="panel-sensors" 
        role="tabpanel" 
        aria-labelledby="Sensors"
        className="space-y-6 md:space-y-8"
      >
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="heading-lg text-foreground">IoT Sensor Network</h2>
            <p className="body-lg text-muted-foreground mt-1">
              Real-time monitoring • 2-minute intervals • 50 hectares coverage
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg border border-green-200">
              <Wifi className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-semibold text-green-800">124/125 Sensors Online</span>
            </div>
            <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
              <Activity className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-800">Live Data</span>
            </div>
            <Button size="sm" className="btn-outline-ag">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Advanced IoT Sensor Cards with Mini Charts */}
        <div className="farm-grid">
          {sensorData.map((sensor) => {
            const getStatusColor = () => {
              switch(sensor.status) {
                case 'optimal': return 'healthy';
                case 'normal': return 'healthy';
                case 'warning': return 'warning';
                case 'critical': return 'critical';
                default: return 'healthy';
              }
            };

            const getIcon = () => {
              switch(sensor.id) {
                case 'temperature': return <Thermometer className="h-6 w-6" />;
                case 'humidity': return <Droplets className="h-6 w-6" />;
                case 'leafWetness': return <TreePine className="h-6 w-6" />;
                case 'light': return <Sun className="h-6 w-6" />;
                default: return <Activity className="h-6 w-6" />;
              }
            };

            const getStatusText = () => {
              switch(sensor.id) {
                case 'leafWetness': return sensor.diseaseRisk;
                case 'temperature': return sensor.growthImpact;
                case 'humidity': return sensor.sprayCondition;
                case 'light': return sensor.photosynthesis;
                default: return sensor.status;
              }
            };

            return (
              <div key={sensor.id} className={`card-status ${getStatusColor()}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${
                      sensor.status === 'optimal' || sensor.status === 'normal' ? 'bg-green-100' : 
                      sensor.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <div className={`${
                        sensor.status === 'optimal' || sensor.status === 'normal' ? 'text-green-600' : 
                        sensor.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {getIcon()}
                      </div>
                    </div>
                    <div>
                      <h4 className="heading-sm text-foreground">{sensor.name}</h4>
                      <p className="body-md text-muted-foreground text-xs">{sensor.lastReading}</p>
                    </div>
                  </div>
                  <div className={`status-dot ${getStatusColor()}`}></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-baseline space-x-2">
                    <div className="metric-display">{sensor.current}{sensor.unit}</div>
                    <div className={`text-sm font-bold ${
                      sensor.trend.startsWith('+') ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {sensor.trend}
                    </div>
                  </div>
                  
                  {/* Mini Chart - Last 6 readings */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-muted-foreground">Last 12 minutes:</span>
                      <span className="text-xs font-medium text-muted-foreground">{sensor.threshold}</span>
                    </div>
                    
                    <div className="flex items-end space-x-1 h-8">
                      {sensor.chartData.map((value, index) => {
                        const maxValue = Math.max(...sensor.chartData);
                        const height = (value / maxValue) * 100;
                        return (
                          <div
                            key={index}
                            className={`flex-1 rounded-t ${
                              sensor.status === 'optimal' || sensor.status === 'normal' ? 'bg-green-400' :
                              sensor.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                            }`}
                            style={{ height: `${height}%` }}
                            title={`${value}${sensor.unit} (${(index + 1) * 2} min ago)`}
                          ></div>
                        );
                      })}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${
                        sensor.status === 'optimal' || sensor.status === 'normal' ? 'text-green-600' : 
                        sensor.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        Impact: {getStatusText()}
                      </span>
                      <Button size="sm" variant="ghost" className="p-1 text-xs">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sensor Analytics & Trends */}
        <div className="space-y-6">
          <h3 className="heading-md text-foreground">Network Analytics</h3>
          <div className="farm-grid-2">
            {/* Network Status */}
            <div className="card-agricultural">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Wifi className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="heading-sm text-foreground">Network Status</h4>
                  <p className="body-md text-muted-foreground">Connectivity Overview</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="status-dot healthy"></div>
                    <span className="body-md">Online Sensors</span>
                  </div>
                  <span className="metric-display-sm text-green-600">47/48</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="status-dot critical"></div>
                    <span className="body-md">Offline Sensors</span>
                  </div>
                  <span className="metric-display-sm text-red-600">1</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="body-md">Signal Strength</span>
                  <span className="metric-display-sm text-green-600">94%</span>
                </div>
                
                <div className="progress-agricultural">
                  <div className="progress-fill-success" style={{width: '98%'}}></div>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Last updated: 2 minutes ago
                </p>
              </div>
            </div>

            {/* Recent Sensor Alerts */}
            <div className="card-agricultural">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="heading-sm text-foreground">Recent Alerts</h4>
                  <p className="body-md text-muted-foreground">Last 24 Hours</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="status-dot warning mt-1"></div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-semibold text-yellow-900">Leaf Wetness Alert</h5>
                    <p className="text-xs text-yellow-800 mt-1">Section B exceeding threshold</p>
                    <span className="text-xs text-yellow-600 font-medium">15 minutes ago</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="status-dot healthy mt-1"></div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-semibold text-green-900">Temperature Stable</h5>
                    <p className="text-xs text-green-800 mt-1">All sections within optimal range</p>
                    <span className="text-xs text-green-600 font-medium">1 hour ago</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-semibold text-blue-900">Sensor Calibration</h5>
                    <p className="text-xs text-blue-800 mt-1">Section D sensors recalibrated</p>
                    <span className="text-xs text-blue-600 font-medium">3 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sensor Management Actions */}
        <div className="space-y-6">
          <h3 className="heading-md text-foreground">Sensor Management</h3>
          <div className="farm-grid">
            <Button className="btn-primary-ag h-20 flex-col space-y-2">
              <RefreshCw className="h-8 w-8" />
              <span className="font-bold">Sync All Sensors</span>
            </Button>
            
            <Button className="btn-secondary-ag h-20 flex-col space-y-2">
              <Settings className="h-8 w-8" />
              <span className="font-bold">Calibrate Sensors</span>
            </Button>
            
            <Button className="btn-outline-ag h-20 flex-col space-y-2">
              <Download className="h-8 w-8" />
              <span className="font-bold">Export Data</span>
            </Button>
            
            <Button className="btn-outline-ag h-20 flex-col space-y-2">
              <Bell className="h-8 w-8" />
              <span className="font-bold">Alert Settings</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  function OrchardMapContent() {
    // Generate individual tree data for visualization
    const generateTrees = () => {
      const trees = [];
      const rows = 12;
      const cols = 15;
      let treeId = 1;
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const randomHealth = Math.random();
          let health = 'healthy';
          if (randomHealth > 0.85) health = 'diseased';
          else if (randomHealth > 0.70) health = 'warning';
          
          trees.push({
            id: treeId++,
            row,
            col,
            health,
            x: col * 40 + 20,
            y: row * 40 + 20,
            fruitCount: Math.floor(Math.random() * 150) + 50
          });
        }
      }
      return trees;
    };

    const individualTrees = generateTrees();

    return (
      <div 
        id="panel-orchard-map" 
        role="tabpanel" 
        aria-labelledby="Orchard Map"
        className="space-y-6 md:space-y-8"
      >
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="heading-lg text-foreground">Orchard Map</h2>
            <p className="body-lg text-muted-foreground mt-1">
              Individual tree monitoring and health visualization
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button size="sm" className="btn-outline-ag">
              <Satellite className="h-4 w-4 mr-2" />
              Satellite View
            </Button>
            <Button size="sm" className="btn-outline-ag">
              <Download className="h-4 w-4 mr-2" />
              Export Map
            </Button>
          </div>
        </div>

        {/* Tree Health Summary - Compact Cards */}
        <div className="farm-grid">
          <div className="card-status healthy">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-full">
                <TreePine className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="heading-sm text-foreground">Healthy Trees</h4>
                <p className="body-md text-muted-foreground">Optimal Condition</p>
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <span className="metric-display text-green-600">{orchardMetrics.orchardStatus.healthyTrees}</span>
              <span className="text-sm font-semibold text-green-600 mb-1">
                {Math.round((orchardMetrics.orchardStatus.healthyTrees / orchardMetrics.orchardStatus.totalTrees) * 100)}%
              </span>
            </div>
          </div>

          <div className="card-status warning">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="heading-sm text-foreground">At Risk Trees</h4>
                <p className="body-md text-muted-foreground">Needs Attention</p>
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <span className="metric-display text-yellow-600">{orchardMetrics.orchardStatus.atRiskTrees}</span>
              <span className="text-sm font-semibold text-yellow-600 mb-1">
                {Math.round((orchardMetrics.orchardStatus.atRiskTrees / orchardMetrics.orchardStatus.totalTrees) * 100)}%
              </span>
            </div>
          </div>

          <div className="card-status critical">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-red-100 rounded-full">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h4 className="heading-sm text-foreground">Diseased Trees</h4>
                <p className="body-md text-muted-foreground">Immediate Action</p>
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <span className="metric-display text-red-600">{orchardMetrics.orchardStatus.diseasedTrees}</span>
              <span className="text-sm font-semibold text-red-600 mb-1">
                {Math.round((orchardMetrics.orchardStatus.diseasedTrees / orchardMetrics.orchardStatus.totalTrees) * 100)}%
              </span>
            </div>
          </div>

          <div className="card-agricultural">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="heading-sm text-foreground">Total Trees</h4>
                <p className="body-md text-muted-foreground">Full Orchard</p>
              </div>
            </div>
            <span className="metric-display text-primary">{orchardMetrics.orchardStatus.totalTrees}</span>
          </div>
        </div>

        {/* Interactive Tree Map - INDIVIDUAL TREES */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="heading-md text-foreground">Interactive Tree Map</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="tree-marker healthy"></div>
                  <span>Healthy</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="tree-marker warning"></div>
                  <span>At Risk</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="tree-marker diseased"></div>
                  <span>Diseased</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card-agricultural p-6">
            <div className="relative bg-green-50 rounded-xl p-4 overflow-auto" style={{minHeight: '400px'}}>
              <div className="relative" style={{width: '620px', height: '500px'}}>
                {individualTrees.map((tree) => (
                  <div
                    key={tree.id}
                    className={`tree-marker ${tree.health} absolute cursor-pointer transition-all duration-200 hover:scale-125 hover:z-10`}
                    style={{
                      left: `${tree.x}px`,
                      top: `${tree.y}px`
                    }}
                    title={`Tree ${tree.id}: ${tree.health} - ${tree.fruitCount} fruits estimated`}
                    onClick={() => {
                      // In a real app, this would open a detailed tree view
                      console.log(`Tree ${tree.id} selected`);
                    }}
                  >
                    {tree.health === 'diseased' && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
                
                {/* Section Labels */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-primary/20">
                  <span className="text-sm font-semibold text-primary">Section A</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-primary/20">
                  <span className="text-sm font-semibold text-primary">Section B</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-primary/20">
                  <span className="text-sm font-semibold text-primary">Section C</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-primary/20">
                  <span className="text-sm font-semibold text-primary">Section D</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Click on individual trees to view detailed health reports and fruit count estimates
              </p>
            </div>
          </div>
        </div>

        {/* Section Details & Drone Data */}
        <div className="farm-grid-2">
          <div className="card-agricultural">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="heading-sm text-foreground">Section Analysis</h4>
                <p className="body-md text-muted-foreground">Area Performance</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {orchardMetrics.sections.map((section) => (
                <div key={section.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      section.health === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <div className="font-semibold">{section.name}</div>
                      <div className="text-sm text-muted-foreground">{section.trees} trees</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{section.coverage}%</div>
                    <div className="text-xs text-muted-foreground">Coverage</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-agricultural">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Drone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="heading-sm text-foreground">Drone Operations</h4>
                <p className="body-md text-muted-foreground">Flight Data</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="body-md">Last Flight</span>
                <span className="font-semibold">2 hours ago</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="body-md">Coverage Accuracy</span>
                <span className="font-semibold text-green-600">97.2%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="body-md">Images Captured</span>
                <span className="font-semibold">1,247</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="body-md">Fruit Count Accuracy</span>
                <span className="font-semibold text-blue-600">94.8%</span>
              </div>
              
              <Button className="btn-primary-ag w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Flight
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function AnalyticsContent() {
    return (
      <>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
          <p className="text-gray-600">Performance metrics and ROI analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenue Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$284,500</div>
              <div className="text-xs text-muted-foreground">This Season</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">$45,200</div>
              <div className="text-xs text-muted-foreground">Total ROI</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Efficiency Gain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">+34%</div>
              <div className="text-xs text-muted-foreground">vs Last Season</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Quality Grades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Premium Grade</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-14 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="font-medium">87%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Standard Grade</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-3 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="font-medium">11%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Below Standard</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-1 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="font-medium">2%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Efficiency Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Monitoring Time Reduction</span>
                <span className="font-medium text-green-600">-68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Spray Accuracy</span>
                <span className="font-medium text-blue-600">96.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Chemical Reduction</span>
                <span className="font-medium text-green-600">-23%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Labor Hours Saved</span>
                <span className="font-medium text-purple-600">240 hrs</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }
}