import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Map, Layers, Calendar, TrendingUp, Thermometer, Droplets, Fish, Waves, ZoomIn, Download, Settings } from 'lucide-react';
import { useState } from 'react';

const temperatureTimeline = [
  { year: 2020, value: 18.2 },
  { year: 2021, value: 18.8 },
  { year: 2022, value: 19.1 },
  { year: 2023, value: 19.6 },
  { year: 2024, value: 20.2 },
];

const speciesHotspots = [
  { name: 'Coral Triangle', species: 3420, lat: -5.0, lon: 120.0, threat: 'high' },
  { name: 'Caribbean Sea', species: 2100, lat: 15.0, lon: -75.0, threat: 'medium' },
  { name: 'Great Barrier Reef', species: 2890, lat: -18.0, lon: 147.0, threat: 'high' },
  { name: 'Mediterranean', species: 1650, lat: 35.0, lon: 18.0, threat: 'medium' },
  { name: 'North Atlantic', species: 1890, lat: 45.0, lon: -30.0, threat: 'low' },
];

const layerOptions = [
  { id: 'temperature', name: 'Sea Surface Temperature', icon: Thermometer, enabled: true },
  { id: 'salinity', name: 'Salinity Levels', icon: Droplets, enabled: false },
  { id: 'currents', name: 'Ocean Currents', icon: Waves, enabled: true },
  { id: 'biodiversity', name: 'Biodiversity Hotspots', icon: Fish, enabled: true },
  { id: 'chlorophyll', name: 'Chlorophyll Concentration', icon: TrendingUp, enabled: false },
];

export function Visualization() {
  const [selectedYear, setSelectedYear] = useState([2024]);
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [activeLayers, setActiveLayers] = useState(
    layerOptions.filter(layer => layer.enabled).map(layer => layer.id)
  );

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="mb-2">Interactive Ocean Visualization</h1>
        <p className="text-muted-foreground">Explore marine data through interactive maps and temporal analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Region Selection */}
            <div className="space-y-2">
              <Label>Geographic Region</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global Ocean</SelectItem>
                  <SelectItem value="pacific">Pacific Ocean</SelectItem>
                  <SelectItem value="atlantic">Atlantic Ocean</SelectItem>
                  <SelectItem value="indian">Indian Ocean</SelectItem>
                  <SelectItem value="arctic">Arctic Ocean</SelectItem>
                  <SelectItem value="southern">Southern Ocean</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Period */}
            <div className="space-y-2">
              <Label>Time Period: {selectedYear[0]}</Label>
              <Slider
                value={selectedYear}
                onValueChange={setSelectedYear}
                max={2024}
                min={2000}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>2000</span>
                <span>2024</span>
              </div>
            </div>

            <Separator />

            {/* Layer Controls */}
            <div className="space-y-3">
              <Label>Data Layers</Label>
              {layerOptions.map((layer) => {
                const IconComponent = layer.icon;
                return (
                  <div key={layer.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{layer.name}</span>
                    </div>
                    <Switch
                      checked={activeLayers.includes(layer.id)}
                      onCheckedChange={() => toggleLayer(layer.id)}
                    />
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Export Options */}
            <div className="space-y-2">
              <Label>Export</Label>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Map
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Visualization */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Interactive Ocean Map
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ZoomIn className="h-4 w-4 mr-2" />
                  Zoom
                </Button>
                <Button variant="outline" size="sm">
                  <Layers className="h-4 w-4 mr-2" />
                  Layers
                </Button>
              </div>
            </div>
            <CardDescription>
              Showing {activeLayers.length} active layers for {selectedRegion} in {selectedYear[0]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1625425405800-be8054129584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMG1hcCUyMHNhdGVsbGl0ZSUyMHZpZXd8ZW58MXx8fHwxNzU3ODMwNzI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Ocean satellite view"
                className="w-full h-full object-cover opacity-60"
              />
              
              {/* Interactive overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Map className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Interactive Map Loading...</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click and drag to explore • Use controls to adjust layers
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-900/95 rounded-lg p-3 shadow-lg">
                <h4 className="font-medium text-sm mb-2">Legend</h4>
                <div className="space-y-1">
                  {activeLayers.includes('temperature') && (
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-red-400 rounded"></div>
                      <span>Temperature (15-25°C)</span>
                    </div>
                  )}
                  {activeLayers.includes('currents') && (
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-purple-400 rounded"></div>
                      <span>Ocean Currents</span>
                    </div>
                  )}
                  {activeLayers.includes('biodiversity') && (
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-green-400 rounded"></div>
                      <span>Biodiversity Hotspots</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temporal Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Temporal Analysis
            </CardTitle>
            <CardDescription>Temperature trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={temperatureTimeline}>
                <XAxis dataKey="year" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0891b2" 
                  fill="url(#gradient)"
                  fillOpacity={0.6}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Biodiversity Hotspots */}
        <Card>
          <CardHeader>
            <CardTitle>Biodiversity Hotspots</CardTitle>
            <CardDescription>Marine biodiversity distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {speciesHotspots.map((hotspot) => (
                <div key={hotspot.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{hotspot.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {hotspot.species.toLocaleString()} species
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={hotspot.threat === 'high' ? 'destructive' : 
                               hotspot.threat === 'medium' ? 'secondary' : 'outline'}
                    >
                      {hotspot.threat} threat
                    </Badge>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}