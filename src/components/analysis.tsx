import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, Brain, Lightbulb, FileText, Download, Settings, BarChart3, Zap, Target, FileSpreadsheet, FileImage, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const correlationData = [
  { temperature: 18.2, diversity: 45, salinity: 34.5, species: 'High diversity zone' },
  { temperature: 19.1, diversity: 52, salinity: 34.3, species: 'Coral reef area' },
  { temperature: 20.5, diversity: 38, salinity: 33.9, species: 'Coastal waters' },
  { temperature: 17.8, diversity: 42, salinity: 34.7, species: 'Deep water' },
  { temperature: 21.2, diversity: 28, salinity: 33.8, species: 'Warm currents' },
  { temperature: 16.9, diversity: 48, salinity: 35.1, species: 'Cold currents' },
  { temperature: 22.1, diversity: 25, salinity: 33.5, species: 'Tropical zone' },
  { temperature: 15.8, diversity: 51, salinity: 35.3, species: 'Polar zone' },
];

const aiInsights = [
  {
    id: 1,
    title: 'Temperature-Diversity Correlation',
    insight: 'Strong negative correlation (-0.78) between water temperature and species diversity. Cooler waters (15-18°C) show highest biodiversity.',
    confidence: 89,
    type: 'correlation',
    impact: 'high',
  },
  {
    id: 2,
    title: 'Seasonal Migration Patterns',
    insight: 'eDNA analysis reveals 23% increase in tuna species presence during spring months, indicating seasonal migration corridors.',
    confidence: 94,
    type: 'temporal',
    impact: 'medium',
  },
  {
    id: 3,
    title: 'Pollution Impact on Otolith Morphology',
    insight: 'Fish from polluted areas show 15% deviation in otolith circularity indices compared to pristine environments.',
    confidence: 82,
    type: 'environmental',
    impact: 'high',
  },
  {
    id: 4,
    title: 'Chlorophyll-Fish Abundance Relationship',
    insight: 'Peak fish abundance occurs 2-3 weeks after chlorophyll blooms, suggesting phytoplankton-driven food web dynamics.',
    confidence: 91,
    type: 'ecological',
    impact: 'medium',
  },
];

const analysisTemplates = [
  { name: 'Climate Change Impact', variables: ['Temperature', 'Species Count', 'Time'], icon: TrendingUp },
  { name: 'Pollution Assessment', variables: ['Chemical Levels', 'Biodiversity', 'Health Index'], icon: Target },
  { name: 'Migration Analysis', variables: ['eDNA', 'Location', 'Season'], icon: BarChart3 },
  { name: 'Ecosystem Health', variables: ['Multiple Parameters', 'Biodiversity', 'Stability'], icon: Zap },
];

const modelPerformance = [
  { model: 'Species Prediction', accuracy: 94, f1Score: 0.92, samples: 1247 },
  { model: 'Temperature Correlation', accuracy: 87, f1Score: 0.85, samples: 892 },
  { model: 'Biodiversity Index', accuracy: 91, f1Score: 0.89, samples: 1543 },
  { model: 'Pollution Impact', accuracy: 83, f1Score: 0.81, samples: 634 },
];

export function Analysis() {
  const [selectedXAxis, setSelectedXAxis] = useState('temperature');
  const [selectedYAxis, setSelectedYAxis] = useState('diversity');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="mb-2">Cross-Disciplinary Analysis</h1>
        <p className="text-muted-foreground">AI-powered insights and correlation analysis across marine datasets</p>
      </div>

      <Tabs defaultValue="correlations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="correlations">Correlations</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="templates">Analysis Templates</TabsTrigger>
          <TabsTrigger value="models">Model Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="correlations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Analysis Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">X-Axis Variable</label>
                  <Select value={selectedXAxis} onValueChange={setSelectedXAxis}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temperature">Temperature (°C)</SelectItem>
                      <SelectItem value="salinity">Salinity (PSU)</SelectItem>
                      <SelectItem value="depth">Depth (m)</SelectItem>
                      <SelectItem value="chlorophyll">Chlorophyll (mg/m³)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Y-Axis Variable</label>
                  <Select value={selectedYAxis} onValueChange={setSelectedYAxis}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diversity">Species Diversity</SelectItem>
                      <SelectItem value="abundance">Fish Abundance</SelectItem>
                      <SelectItem value="biomass">Total Biomass</SelectItem>
                      <SelectItem value="endemic">Endemic Species</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Region Filter</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="atlantic">North Atlantic</SelectItem>
                      <SelectItem value="pacific">Pacific</SelectItem>
                      <SelectItem value="indian">Indian Ocean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Period</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Last 12 months" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m">Last Month</SelectItem>
                      <SelectItem value="3m">Last 3 Months</SelectItem>
                      <SelectItem value="12m">Last 12 Months</SelectItem>
                      <SelectItem value="5y">Last 5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Run Analysis
                </Button>
              </CardContent>
            </Card>

            {/* Main Correlation Chart */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Correlation Analysis: Temperature vs Species Diversity</CardTitle>
                    <CardDescription>
                      Scatter plot showing relationship between environmental parameters and biodiversity
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Chart
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <FileImage className="h-4 w-4 mr-2" />
                        Download as PNG
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileImage className="h-4 w-4 mr-2" />
                        Download as SVG
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export Data CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart data={correlationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                    <XAxis 
                      dataKey="temperature" 
                      stroke="currentColor" 
                      opacity={0.6}
                      label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      dataKey="diversity" 
                      stroke="currentColor" 
                      opacity={0.6}
                      label={{ value: 'Species Diversity Index', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                      formatter={(value, name) => [
                        value,
                        name === 'diversity' ? 'Diversity Index' : name === 'temperature' ? 'Temperature (°C)' : name
                      ]}
                    />
                    <Scatter dataKey="diversity" fill="#0891b2">
                      {correlationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${220 + index * 20}, 70%, ${50 + index * 5}%)`} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600">-0.78</div>
                    <div className="text-sm text-muted-foreground">Correlation Coefficient</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">0.61</div>
                    <div className="text-sm text-muted-foreground">R-squared</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">p &lt; 0.001</div>
                    <div className="text-sm text-muted-foreground">Significance</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Temporal Trends</CardTitle>
                    <CardDescription>Biodiversity changes over time</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <FileImage className="h-4 w-4 mr-2" />
                        Download PNG
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export Data
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={correlationData.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                    <XAxis dataKey="temperature" stroke="currentColor" opacity={0.6} />
                    <YAxis stroke="currentColor" opacity={0.6} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }} />
                    <Line type="monotone" dataKey="diversity" stroke="#0891b2" strokeWidth={2} dot={{ fill: '#0891b2', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Regional Comparison</CardTitle>
                    <CardDescription>Biodiversity by geographic region</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <FileImage className="h-4 w-4 mr-2" />
                        Download PNG
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export Data
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={correlationData.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                    <XAxis dataKey="species" stroke="currentColor" opacity={0.6} tick={{ fontSize: 12 }} />
                    <YAxis stroke="currentColor" opacity={0.6} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }} />
                    <Bar dataKey="diversity" fill="#0891b2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Generated Insights
              </CardTitle>
              <CardDescription>Machine learning analysis of cross-disciplinary patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          <h4 className="font-medium">{insight.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.insight}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={insight.confidence > 90 ? 'default' : insight.confidence > 80 ? 'secondary' : 'outline'}>
                          {insight.confidence}% confidence
                        </Badge>
                        <Badge variant={insight.impact === 'high' ? 'destructive' : insight.impact === 'medium' ? 'secondary' : 'outline'}>
                          {insight.impact} impact
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          {insight.type}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Export
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Export as PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                              Export as CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Export as JSON
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysisTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card key={template.name} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5" />
                      {template.name}
                    </CardTitle>
                    <CardDescription>
                      Pre-configured analysis template for {template.name.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Analysis Variables:</label>
                        <div className="flex flex-wrap gap-1">
                          {template.variables.map((variable) => (
                            <Badge key={variable} variant="outline" className="text-xs">
                              {variable}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Use Template
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Export Results
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                              Export Data
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Custom Analysis Builder</CardTitle>
              <CardDescription>Create your own analysis workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Sources</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select data sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oceanographic">Oceanographic Data</SelectItem>
                      <SelectItem value="biodiversity">Biodiversity Records</SelectItem>
                      <SelectItem value="edna">eDNA Sequences</SelectItem>
                      <SelectItem value="taxonomy">Taxonomy Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Analysis Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select analysis type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="correlation">Correlation Analysis</SelectItem>
                      <SelectItem value="regression">Regression Modeling</SelectItem>
                      <SelectItem value="clustering">Clustering Analysis</SelectItem>
                      <SelectItem value="timeseries">Time Series Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Output Format</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select output" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="report">Statistical Report</SelectItem>
                      <SelectItem value="visualization">Interactive Visualization</SelectItem>
                      <SelectItem value="model">Predictive Model</SelectItem>
                      <SelectItem value="dashboard">Live Dashboard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Brain className="h-4 w-4 mr-2" />
                  Build Custom Analysis
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      Export Analysis
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export Data
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileImage className="h-4 w-4 mr-2" />
                      Export Charts
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Dashboard</CardTitle>
              <CardDescription>AI model accuracy and validation metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelPerformance.map((model) => (
                  <div key={model.model} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{model.model}</h4>
                        <p className="text-sm text-muted-foreground">{model.samples.toLocaleString()} training samples</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">v2.1</Badge>
                        <Badge variant="outline">Production</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                        <div className="text-lg font-semibold">{model.accuracy}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">F1 Score</div>
                        <div className="text-lg font-semibold">{model.f1Score}</div>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}