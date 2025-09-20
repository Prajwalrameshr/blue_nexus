import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine, Legend, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Thermometer, Droplets, Waves, Activity, Fish, AlertTriangle, TrendingUp, TrendingDown, Wind, Eye, Target, Info, Globe } from 'lucide-react';
import { useState, useMemo } from 'react';

// Ocean-specific data sets
const oceanData = {
  global: {
    name: "Global Ocean",
    description: "Worldwide marine data aggregation",
    temperature: 19.8,
    tempTrend: +0.3,
    species: 1450,
    speciesTrend: +23,
    currentVelocity: 0.8,
    currentDirection: "NE",
    ecosystemHealth: 87,
    temperatureData: [
      { time: '00:00', temp: 18.2, salinity: 34.5, depth: 10, oxygen: 7.8 },
      { time: '02:00', temp: 18.0, salinity: 34.6, depth: 10, oxygen: 7.9 },
      { time: '04:00', temp: 17.8, salinity: 34.7, depth: 10, oxygen: 8.0 },
      { time: '06:00', temp: 18.5, salinity: 34.4, depth: 10, oxygen: 7.7 },
      { time: '08:00', temp: 19.1, salinity: 34.3, depth: 10, oxygen: 7.5 },
      { time: '10:00', temp: 19.8, salinity: 34.2, depth: 10, oxygen: 7.3 },
      { time: '12:00', temp: 20.5, salinity: 34.1, depth: 10, oxygen: 7.1 },
      { time: '14:00', temp: 21.0, salinity: 34.0, depth: 10, oxygen: 7.0 },
      { time: '16:00', temp: 21.2, salinity: 33.9, depth: 10, oxygen: 6.9 },
      { time: '18:00', temp: 20.8, salinity: 34.0, depth: 10, oxygen: 7.0 },
      { time: '20:00', temp: 19.8, salinity: 34.2, depth: 10, oxygen: 7.2 },
      { time: '22:00', temp: 19.2, salinity: 34.3, depth: 10, oxygen: 7.4 },
    ],
    biodiversityData: [
      { species: 'Fish', count: 847, color: 'hsl(var(--chart-1))', percentage: 57.4 },
      { species: 'Mollusks', count: 234, color: 'hsl(var(--chart-2))', percentage: 15.9 },
      { species: 'Crustaceans', count: 156, color: 'hsl(var(--chart-3))', percentage: 10.6 },
      { species: 'Cnidarians', count: 89, color: 'hsl(var(--chart-4))', percentage: 6.0 },
      { species: 'Others', count: 124, color: 'hsl(var(--chart-5))', percentage: 8.4 },
      { species: 'Echinoderms', count: 67, color: '#0c4a6e', percentage: 4.5 },
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Chlorophyll Elevation',
        description: 'Possible algal bloom detected in monitoring zone 3A',
        priority: 'medium'
      },
      {
        type: 'info',
        title: 'Current Anomaly',
        description: 'Increased current activity in deep water channels',
        priority: 'low'
      }
    ],
    chemicalData: [
      { parameter: 'pH', value: 8.1, status: 'normal', unit: '', optimal: 8.0 },
      { parameter: 'Dissolved O2', value: 7.2, status: 'normal', unit: 'mg/L', optimal: 7.5 },
      { parameter: 'Chlorophyll-a', value: 2.8, status: 'elevated', unit: 'μg/L', optimal: 1.5 },
      { parameter: 'Nitrates', value: 15.3, status: 'normal', unit: 'μmol/L', optimal: 12.0 },
      { parameter: 'Phosphates', value: 1.2, status: 'low', unit: 'μmol/L', optimal: 2.0 },
      { parameter: 'Turbidity', value: 0.8, status: 'normal', unit: 'NTU', optimal: 1.0 },
    ]
  },
  pacific: {
    name: "Pacific Ocean",
    description: "Largest ocean basin data",
    temperature: 22.1,
    tempTrend: +0.5,
    species: 2150,
    speciesTrend: +45,
    currentVelocity: 1.2,
    currentDirection: "W",
    ecosystemHealth: 89,
    temperatureData: [
      { time: '00:00', temp: 21.5, salinity: 35.2, depth: 10, oxygen: 8.1 },
      { time: '02:00', temp: 21.3, salinity: 35.3, depth: 10, oxygen: 8.2 },
      { time: '04:00', temp: 21.1, salinity: 35.4, depth: 10, oxygen: 8.3 },
      { time: '06:00', temp: 21.8, salinity: 35.1, depth: 10, oxygen: 8.0 },
      { time: '08:00', temp: 22.4, salinity: 35.0, depth: 10, oxygen: 7.8 },
      { time: '10:00', temp: 23.1, salinity: 34.9, depth: 10, oxygen: 7.6 },
      { time: '12:00', temp: 23.8, salinity: 34.8, depth: 10, oxygen: 7.4 },
      { time: '14:00', temp: 24.3, salinity: 34.7, depth: 10, oxygen: 7.3 },
      { time: '16:00', temp: 24.5, salinity: 34.6, depth: 10, oxygen: 7.2 },
      { time: '18:00', temp: 24.1, salinity: 34.7, depth: 10, oxygen: 7.3 },
      { time: '20:00', temp: 23.1, salinity: 34.9, depth: 10, oxygen: 7.5 },
      { time: '22:00', temp: 22.5, salinity: 35.0, depth: 10, oxygen: 7.7 },
    ],
    biodiversityData: [
      { species: 'Fish', count: 1245, color: 'hsl(var(--chart-1))', percentage: 58.8 },
      { species: 'Mollusks', count: 412, color: 'hsl(var(--chart-2))', percentage: 19.4 },
      { species: 'Cnidarians', count: 234, color: 'hsl(var(--chart-4))', percentage: 11.0 },
      { species: 'Crustaceans', count: 189, color: 'hsl(var(--chart-3))', percentage: 8.9 },
      { species: 'Echinoderms', count: 145, color: '#0c4a6e', percentage: 6.8 },
      { species: 'Others', count: 98, color: 'hsl(var(--chart-5))', percentage: 4.6 },
    ],
    alerts: [
      {
        type: 'info',
        title: 'Coral Bleaching Monitor',
        description: 'Temperature increase monitoring active in Great Barrier Reef region',
        priority: 'medium'
      },
      {
        type: 'warning',
        title: 'Tsunami Warning System',
        description: 'Seismic activity detected - monitoring for potential tsunami risk',
        priority: 'high'
      }
    ],
    chemicalData: [
      { parameter: 'pH', value: 8.2, status: 'normal', unit: '', optimal: 8.1 },
      { parameter: 'Dissolved O2', value: 7.8, status: 'normal', unit: 'mg/L', optimal: 7.5 },
      { parameter: 'Chlorophyll-a', value: 1.9, status: 'normal', unit: 'μg/L', optimal: 1.5 },
      { parameter: 'Nitrates', value: 18.7, status: 'normal', unit: 'μmol/L', optimal: 15.0 },
      { parameter: 'Phosphates', value: 2.1, status: 'normal', unit: 'μmol/L', optimal: 2.0 },
      { parameter: 'Turbidity', value: 0.6, status: 'normal', unit: 'NTU', optimal: 1.0 },
    ]
  },
  atlantic: {
    name: "Atlantic Ocean",
    description: "Atlantic basin monitoring",
    temperature: 18.4,
    tempTrend: +0.1,
    species: 1290,
    speciesTrend: +18,
    currentVelocity: 0.9,
    currentDirection: "NE",
    ecosystemHealth: 85,
    temperatureData: [
      { time: '00:00', temp: 17.8, salinity: 36.1, depth: 10, oxygen: 7.9 },
      { time: '02:00', temp: 17.6, salinity: 36.2, depth: 10, oxygen: 8.0 },
      { time: '04:00', temp: 17.4, salinity: 36.3, depth: 10, oxygen: 8.1 },
      { time: '06:00', temp: 18.1, salinity: 36.0, depth: 10, oxygen: 7.8 },
      { time: '08:00', temp: 18.7, salinity: 35.9, depth: 10, oxygen: 7.6 },
      { time: '10:00', temp: 19.4, salinity: 35.8, depth: 10, oxygen: 7.4 },
      { time: '12:00', temp: 20.1, salinity: 35.7, depth: 10, oxygen: 7.2 },
      { time: '14:00', temp: 20.6, salinity: 35.6, depth: 10, oxygen: 7.1 },
      { time: '16:00', temp: 20.8, salinity: 35.5, depth: 10, oxygen: 7.0 },
      { time: '18:00', temp: 20.4, salinity: 35.6, depth: 10, oxygen: 7.1 },
      { time: '20:00', temp: 19.4, salinity: 35.8, depth: 10, oxygen: 7.3 },
      { time: '22:00', temp: 18.8, salinity: 35.9, depth: 10, oxygen: 7.5 },
    ],
    biodiversityData: [
      { species: 'Fish', count: 723, color: 'hsl(var(--chart-1))', percentage: 56.1 },
      { species: 'Mollusks', count: 287, color: 'hsl(var(--chart-2))', percentage: 22.3 },
      { species: 'Crustaceans', count: 156, color: 'hsl(var(--chart-3))', percentage: 12.1 },
      { species: 'Cnidarians', count: 89, color: 'hsl(var(--chart-4))', percentage: 6.9 },
      { species: 'Echinoderms', count: 67, color: '#0c4a6e', percentage: 5.2 },
      { species: 'Others', count: 98, color: 'hsl(var(--chart-5))', percentage: 7.6 },
    ],
    alerts: [
      {
        type: 'info',
        title: 'Gulf Stream Analysis',
        description: 'Strong Gulf Stream current detected - excellent for marine transport',
        priority: 'low'
      },
      {
        type: 'warning',
        title: 'Sargassum Bloom',
        description: 'Large sargassum mat detected in Caribbean waters',
        priority: 'medium'
      }
    ],
    chemicalData: [
      { parameter: 'pH', value: 8.0, status: 'normal', unit: '', optimal: 8.0 },
      { parameter: 'Dissolved O2', value: 7.6, status: 'normal', unit: 'mg/L', optimal: 7.5 },
      { parameter: 'Chlorophyll-a', value: 2.1, status: 'normal', unit: 'μg/L', optimal: 1.5 },
      { parameter: 'Nitrates', value: 14.2, status: 'normal', unit: 'μmol/L', optimal: 12.0 },
      { parameter: 'Phosphates', value: 1.8, status: 'normal', unit: 'μmol/L', optimal: 2.0 },
      { parameter: 'Turbidity', value: 1.2, status: 'normal', unit: 'NTU', optimal: 1.0 },
    ]
  },
  indian: {
    name: "Indian Ocean",
    description: "Indian Ocean region data",
    temperature: 24.2,
    tempTrend: +0.7,
    species: 1890,
    speciesTrend: +35,
    currentVelocity: 0.7,
    currentDirection: "SW",
    ecosystemHealth: 82,
    temperatureData: [
      { time: '00:00', temp: 23.5, salinity: 34.8, depth: 10, oxygen: 7.5 },
      { time: '02:00', temp: 23.3, salinity: 34.9, depth: 10, oxygen: 7.6 },
      { time: '04:00', temp: 23.1, salinity: 35.0, depth: 10, oxygen: 7.7 },
      { time: '06:00', temp: 23.8, salinity: 34.7, depth: 10, oxygen: 7.4 },
      { time: '08:00', temp: 24.4, salinity: 34.6, depth: 10, oxygen: 7.2 },
      { time: '10:00', temp: 25.1, salinity: 34.5, depth: 10, oxygen: 7.0 },
      { time: '12:00', temp: 25.8, salinity: 34.4, depth: 10, oxygen: 6.8 },
      { time: '14:00', temp: 26.3, salinity: 34.3, depth: 10, oxygen: 6.7 },
      { time: '16:00', temp: 26.5, salinity: 34.2, depth: 10, oxygen: 6.6 },
      { time: '18:00', temp: 26.1, salinity: 34.3, depth: 10, oxygen: 6.7 },
      { time: '20:00', temp: 25.1, salinity: 34.5, depth: 10, oxygen: 6.9 },
      { time: '22:00', temp: 24.5, salinity: 34.6, depth: 10, oxygen: 7.1 },
    ],
    biodiversityData: [
      { species: 'Fish', count: 1134, color: 'hsl(var(--chart-1))', percentage: 60.0 },
      { species: 'Cnidarians', count: 378, color: 'hsl(var(--chart-4))', percentage: 20.0 },
      { species: 'Mollusks', count: 189, color: 'hsl(var(--chart-2))', percentage: 10.0 },
      { species: 'Crustaceans', count: 113, color: 'hsl(var(--chart-3))', percentage: 6.0 },
      { species: 'Echinoderms', count: 76, color: '#0c4a6e', percentage: 4.0 },
      { species: 'Others', count: 76, color: 'hsl(var(--chart-5))', percentage: 4.0 },
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Monsoon Impact',
        description: 'Monsoon season affecting water temperature and salinity levels',
        priority: 'medium'
      },
      {
        type: 'info',
        title: 'Coral Triangle Monitoring',
        description: 'High biodiversity zone under active conservation monitoring',
        priority: 'low'
      }
    ],
    chemicalData: [
      { parameter: 'pH', value: 8.3, status: 'elevated', unit: '', optimal: 8.1 },
      { parameter: 'Dissolved O2', value: 6.8, status: 'low', unit: 'mg/L', optimal: 7.5 },
      { parameter: 'Chlorophyll-a', value: 3.2, status: 'elevated', unit: 'μg/L', optimal: 1.5 },
      { parameter: 'Nitrates', value: 21.4, status: 'elevated', unit: 'μmol/L', optimal: 15.0 },
      { parameter: 'Phosphates', value: 2.8, status: 'elevated', unit: 'μmol/L', optimal: 2.0 },
      { parameter: 'Turbidity', value: 1.8, status: 'elevated', unit: 'NTU', optimal: 1.0 },
    ]
  },
  arctic: {
    name: "Arctic Ocean",
    description: "Arctic marine ecosystem",
    temperature: 1.2,
    tempTrend: +0.8,
    species: 420,
    speciesTrend: -5,
    currentVelocity: 0.3,
    currentDirection: "E",
    ecosystemHealth: 78,
    temperatureData: [
      { time: '00:00', temp: 0.8, salinity: 32.1, depth: 10, oxygen: 9.2 },
      { time: '02:00', temp: 0.6, salinity: 32.2, depth: 10, oxygen: 9.3 },
      { time: '04:00', temp: 0.4, salinity: 32.3, depth: 10, oxygen: 9.4 },
      { time: '06:00', temp: 0.9, salinity: 32.0, depth: 10, oxygen: 9.1 },
      { time: '08:00', temp: 1.4, salinity: 31.9, depth: 10, oxygen: 8.9 },
      { time: '10:00', temp: 2.1, salinity: 31.8, depth: 10, oxygen: 8.7 },
      { time: '12:00', temp: 2.8, salinity: 31.7, depth: 10, oxygen: 8.5 },
      { time: '14:00', temp: 3.2, salinity: 31.6, depth: 10, oxygen: 8.4 },
      { time: '16:00', temp: 3.4, salinity: 31.5, depth: 10, oxygen: 8.3 },
      { time: '18:00', temp: 3.0, salinity: 31.6, depth: 10, oxygen: 8.4 },
      { time: '20:00', temp: 2.1, salinity: 31.8, depth: 10, oxygen: 8.6 },
      { time: '22:00', temp: 1.5, salinity: 31.9, depth: 10, oxygen: 8.8 },
    ],
    biodiversityData: [
      { species: 'Fish', count: 189, color: 'hsl(var(--chart-1))', percentage: 45.0 },
      { species: 'Crustaceans', count: 126, color: 'hsl(var(--chart-3))', percentage: 30.0 },
      { species: 'Mollusks', count: 63, color: 'hsl(var(--chart-2))', percentage: 15.0 },
      { species: 'Marine Mammals', count: 25, color: 'hsl(var(--chart-4))', percentage: 6.0 },
      { species: 'Seabirds', count: 17, color: '#0c4a6e', percentage: 4.0 },
      { species: 'Others', count: 21, color: 'hsl(var(--chart-5))', percentage: 5.0 },
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Ice Melt Acceleration',
        description: 'Rapid sea ice loss detected - monitoring ecosystem impact',
        priority: 'high'
      },
      {
        type: 'info',
        title: 'Polar Bear Tracking',
        description: 'Active monitoring of polar bear populations and migration patterns',
        priority: 'medium'
      }
    ],
    chemicalData: [
      { parameter: 'pH', value: 7.9, status: 'low', unit: '', optimal: 8.1 },
      { parameter: 'Dissolved O2', value: 9.1, status: 'elevated', unit: 'mg/L', optimal: 7.5 },
      { parameter: 'Chlorophyll-a', value: 0.8, status: 'low', unit: 'μg/L', optimal: 1.5 },
      { parameter: 'Nitrates', value: 8.4, status: 'low', unit: 'μmol/L', optimal: 12.0 },
      { parameter: 'Phosphates', value: 0.9, status: 'low', unit: 'μmol/L', optimal: 2.0 },
      { parameter: 'Turbidity', value: 0.3, status: 'normal', unit: 'NTU', optimal: 1.0 },
    ]
  },
  southern: {
    name: "Southern Ocean",
    description: "Antarctic waters data",
    temperature: 3.8,
    tempTrend: +0.4,
    species: 890,
    speciesTrend: +12,
    currentVelocity: 1.5,
    currentDirection: "E",
    ecosystemHealth: 91,
    temperatureData: [
      { time: '00:00', temp: 3.2, salinity: 34.2, depth: 10, oxygen: 8.8 },
      { time: '02:00', temp: 3.0, salinity: 34.3, depth: 10, oxygen: 8.9 },
      { time: '04:00', temp: 2.8, salinity: 34.4, depth: 10, oxygen: 9.0 },
      { time: '06:00', temp: 3.5, salinity: 34.1, depth: 10, oxygen: 8.7 },
      { time: '08:00', temp: 4.1, salinity: 34.0, depth: 10, oxygen: 8.5 },
      { time: '10:00', temp: 4.8, salinity: 33.9, depth: 10, oxygen: 8.3 },
      { time: '12:00', temp: 5.5, salinity: 33.8, depth: 10, oxygen: 8.1 },
      { time: '14:00', temp: 6.0, salinity: 33.7, depth: 10, oxygen: 8.0 },
      { time: '16:00', temp: 6.2, salinity: 33.6, depth: 10, oxygen: 7.9 },
      { time: '18:00', temp: 5.8, salinity: 33.7, depth: 10, oxygen: 8.0 },
      { time: '20:00', temp: 4.8, salinity: 33.9, depth: 10, oxygen: 8.2 },
      { time: '22:00', temp: 4.2, salinity: 34.0, depth: 10, oxygen: 8.4 },
    ],
    biodiversityData: [
      { species: 'Krill', count: 356, color: 'hsl(var(--chart-3))', percentage: 40.0 },
      { species: 'Fish', count: 267, color: 'hsl(var(--chart-1))', percentage: 30.0 },
      { species: 'Marine Mammals', count: 89, color: 'hsl(var(--chart-4))', percentage: 10.0 },
      { species: 'Seabirds', count: 71, color: '#0c4a6e', percentage: 8.0 },
      { species: 'Cephalopods', count: 53, color: 'hsl(var(--chart-2))', percentage: 6.0 },
      { species: 'Others', count: 54, color: 'hsl(var(--chart-5))', percentage: 6.0 },
    ],
    alerts: [
      {
        type: 'info',
        title: 'Penguin Colony Monitoring',
        description: 'Emperor penguin breeding season - increased wildlife activity',
        priority: 'low'
      },
      {
        type: 'warning',
        title: 'Krill Population Shift',
        description: 'Unusual krill migration patterns detected - investigating climate impact',
        priority: 'medium'
      }
    ],
    chemicalData: [
      { parameter: 'pH', value: 8.0, status: 'normal', unit: '', optimal: 8.1 },
      { parameter: 'Dissolved O2', value: 8.5, status: 'elevated', unit: 'mg/L', optimal: 7.5 },
      { parameter: 'Chlorophyll-a', value: 1.2, status: 'normal', unit: 'μg/L', optimal: 1.5 },
      { parameter: 'Nitrates', value: 28.6, status: 'elevated', unit: 'μmol/L', optimal: 20.0 },
      { parameter: 'Phosphates', value: 3.1, status: 'elevated', unit: 'μmol/L', optimal: 2.0 },
      { parameter: 'Turbidity', value: 0.4, status: 'normal', unit: 'NTU', optimal: 1.0 },
    ]
  }
};

const currentData = [
  { depth: '0m', velocity: 0.8, direction: 'NE', temperature: 21.2, pressure: 1013 },
  { depth: '10m', velocity: 1.2, direction: 'NE', temperature: 20.5, pressure: 1014 },
  { depth: '25m', velocity: 0.9, direction: 'E', temperature: 19.8, pressure: 1016 },
  { depth: '50m', velocity: 0.6, direction: 'SE', temperature: 18.9, pressure: 1018 },
  { depth: '75m', velocity: 0.4, direction: 'S', temperature: 17.8, pressure: 1020 },
  { depth: '100m', velocity: 0.3, direction: 'S', temperature: 16.5, pressure: 1022 },
  { depth: '150m', velocity: 0.2, direction: 'SW', temperature: 15.2, pressure: 1025 },
];

const ecosystemHealthData = [
  { metric: 'Biodiversity', score: 87, fullMark: 100 },
  { metric: 'Water Quality', score: 92, fullMark: 100 },
  { metric: 'Fish Population', score: 78, fullMark: 100 },
  { metric: 'Coral Health', score: 85, fullMark: 100 },
  { metric: 'Oxygen Levels', score: 94, fullMark: 100 },
  { metric: 'pH Balance', score: 89, fullMark: 100 },
];

export function Dashboard() {
  const [selectedOcean, setSelectedOcean] = useState('global');
  
  const oceanOptions = [
    { value: 'global', label: 'Global Ocean', description: 'Worldwide marine data aggregation' },
    { value: 'pacific', label: 'Pacific Ocean', description: 'Largest ocean basin data' },
    { value: 'atlantic', label: 'Atlantic Ocean', description: 'Atlantic basin monitoring' },
    { value: 'indian', label: 'Indian Ocean', description: 'Indian Ocean region data' },
    { value: 'arctic', label: 'Arctic Ocean', description: 'Arctic marine ecosystem' },
    { value: 'southern', label: 'Southern Ocean', description: 'Antarctic waters data' },
  ];

  // Get current ocean data based on selection
  const currentOceanData = useMemo(() => {
    return oceanData[selectedOcean as keyof typeof oceanData] || oceanData.global;
  }, [selectedOcean]);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Enhanced Header with Ocean Selection */}
        <div className="border-b border-border pb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1>Blue Nexus Dashboard</h1>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Real-time oceanographic monitoring dashboard with global marine data analytics</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-muted-foreground">Real-time oceanographic monitoring and ecosystem health assessment</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Live Data
              </Badge>
              <Badge variant="secondary" className="gap-2">
                <Eye className="w-3 h-3" />
                {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </div>
          
          {/* Ocean Selection */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Ocean Region:</span>
            </div>
            <Select value={selectedOcean} onValueChange={setSelectedOcean}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select ocean region" />
              </SelectTrigger>
              <SelectContent>
                {oceanOptions.map((ocean) => (
                  <SelectItem key={ocean.value} value={ocean.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{ocean.label}</span>
                      <span className="text-xs text-muted-foreground">{ocean.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline" className="ml-2">
              {currentOceanData.name}
            </Badge>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select specific ocean basin for targeted analysis or choose Global Ocean for worldwide data</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

      {/* System Alerts */}
      {currentOceanData.alerts.length > 0 && (
        <div className="space-y-4">
          {currentOceanData.alerts.map((alert, index) => (
            <Alert key={index} className={`${
              alert.type === 'warning' 
                ? 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950' 
                : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
            }`}>
              <AlertTriangle className={`h-4 w-4 ${
                alert.type === 'warning' ? 'text-amber-600' : 'text-blue-600'
              }`} />
              <AlertDescription className={`${
                alert.type === 'warning' 
                  ? 'text-amber-800 dark:text-amber-200' 
                  : 'text-blue-800 dark:text-blue-200'
              }`}>
                <strong>{alert.title}</strong> - {alert.description}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Real-time Metrics with Info Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Water Temperature</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Surface water temperature monitoring with trend analysis for {currentOceanData.name}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono">{currentOceanData.temperature}°C</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {currentOceanData.tempTrend > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {currentOceanData.tempTrend > 0 ? '+' : ''}{currentOceanData.tempTrend}°C from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Species Richness</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of unique species identified in {currentOceanData.name} monitoring area</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Fish className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono">{currentOceanData.species.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {currentOceanData.speciesTrend > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {currentOceanData.speciesTrend > 0 ? '+' : ''}{currentOceanData.speciesTrend} species logged today
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Current Velocity</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ocean current speed and direction at surface level in {currentOceanData.name}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Waves className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono">{currentOceanData.currentVelocity} m/s</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Wind className="h-3 w-3 mr-1" />
              Direction: {currentOceanData.currentDirection}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Ecosystem Health</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Composite health score for {currentOceanData.name} based on biodiversity, water quality, and ecosystem indicators</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono">{currentOceanData.ecosystemHealth}%</div>
            <Progress value={currentOceanData.ecosystemHealth} className="mt-2" />
            <div className="text-xs text-muted-foreground mt-1">
              <Badge variant="secondary" className="text-xs">
                {currentOceanData.ecosystemHealth >= 90 ? 'Excellent' : 
                 currentOceanData.ecosystemHealth >= 80 ? 'Good' : 
                 currentOceanData.ecosystemHealth >= 70 ? 'Fair' : 'Poor'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Data Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Temperature & Ocean Parameters */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <CardTitle>Oceanographic Parameters (24h) - {currentOceanData.name}</CardTitle>
                  <CardDescription>Real-time temperature, salinity, and dissolved oxygen monitoring</CardDescription>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Multi-parameter ocean monitoring for {currentOceanData.name} showing temperature trends, salinity levels, and oxygen concentration over 24-hour period</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Badge variant="outline" className="gap-2">
                <Target className="w-3 h-3" />
                Multi-parameter
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={currentOceanData.temperatureData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="oxygenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={11}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  yAxisId="temp"
                  orientation="left"
                  stroke="hsl(var(--chart-1))" 
                  fontSize={11}
                  tick={{ fill: 'hsl(var(--chart-1))' }}
                  label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="salinity"
                  orientation="right"
                  stroke="hsl(var(--chart-2))" 
                  fontSize={11}
                  tick={{ fill: 'hsl(var(--chart-2))' }}
                  label={{ value: 'Salinity (PSU)', angle: 90, position: 'insideRight' }}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="line"
                />
                <Area
                  yAxisId="temp"
                  type="monotone"
                  dataKey="temp"
                  fill="url(#tempGradient)"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  name="Temperature (°C)"
                  dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--chart-1))', strokeWidth: 2 }}
                />
                <Line
                  yAxisId="salinity"
                  type="monotone"
                  dataKey="salinity"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Salinity (PSU)"
                  dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: 'hsl(var(--chart-2))', strokeWidth: 2 }}
                />
                <Area
                  yAxisId="temp"
                  type="monotone"
                  dataKey="oxygen"
                  fill="url(#oxygenGradient)"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  name="Dissolved O₂ (mg/L)"
                  dot={{ fill: 'hsl(var(--chart-4))', strokeWidth: 2, r: 3 }}
                  strokeDasharray="3 3"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced Species Distribution */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div>
                <CardTitle>Species Distribution - {currentOceanData.name}</CardTitle>
                <CardDescription>Marine biodiversity composition with population metrics</CardDescription>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Detailed breakdown of marine species populations in {currentOceanData.name} showing percentage distribution and specimen counts</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentOceanData.biodiversityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percentage }) => `${percentage.toFixed(1)}%`}
                  outerRadius={90}
                  innerRadius={45}
                  fill="#8884d8"
                  dataKey="count"
                  paddingAngle={2}
                >
                  {currentOceanData.biodiversityData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value, name) => [
                    `${value} specimens (${currentOceanData.biodiversityData.find(d => d.species === name)?.percentage}%)`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {currentOceanData.biodiversityData.map((species, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full shadow-sm" 
                      style={{ backgroundColor: species.color }}
                    ></div>
                    <span className="text-xs font-medium">{species.species}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono">{species.count}</div>
                    <div className="text-xs text-muted-foreground">{species.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Ocean Depth Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div>
                <CardTitle>Ocean Depth Profile Analysis</CardTitle>
                <CardDescription>Current velocity, temperature, and pressure by depth</CardDescription>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Vertical ocean profile showing how current velocity and temperature change with depth from surface to 150m</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart 
                data={currentData} 
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  type="number" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={11}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  dataKey="depth" 
                  type="category" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={11}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  label={{ value: 'Depth', angle: -90, position: 'insideLeft' }}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value, name) => {
                    if (name === 'velocity') return [`${value} m/s`, 'Current Velocity'];
                    if (name === 'temperature') return [`${value}°C`, 'Temperature'];
                    if (name === 'pressure') return [`${value} hPa`, 'Pressure'];
                    return [value, name];
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar 
                  dataKey="velocity" 
                  fill="hsl(var(--chart-3))" 
                  radius={[0, 6, 6, 0]}
                  name="Current Velocity (m/s)"
                />
                <Line 
                  dataKey="temperature" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={3}
                  name="Temperature (°C)"
                  dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced Chemical Parameters */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div>
                <CardTitle>Water Quality Parameters - {currentOceanData.name}</CardTitle>
                <CardDescription>Real-time chemical analysis with optimal ranges</CardDescription>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chemical parameters monitoring for {currentOceanData.name} with status indicators and optimal range comparisons for water quality assessment</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentOceanData.chemicalData.map((param, index) => (
                <div key={param.parameter} className="p-3 border border-border/50 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-chart-3" />
                      <span className="text-sm font-medium">{param.parameter}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono font-semibold">{param.value}{param.unit}</span>
                      <Badge 
                        variant={
                          param.status === 'normal' ? 'secondary' : 
                          param.status === 'elevated' ? 'destructive' : 'outline'
                        }
                        className="text-xs"
                      >
                        {param.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Optimal: {param.optimal}{param.unit}</span>
                    <span>Current: {param.value}{param.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ecosystem Health Radar */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div>
                <CardTitle>Ecosystem Health Radar - {currentOceanData.name}</CardTitle>
                <CardDescription>Comprehensive health assessment across multiple indicators</CardDescription>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Multi-dimensional ecosystem health assessment for {currentOceanData.name} showing performance across key environmental and biological indicators</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={ecosystemHealthData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Radar
                  name="Health Score"
                  dataKey="score"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value) => [`${value}%`, 'Health Score']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
    </TooltipProvider>
  );
}