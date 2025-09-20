import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, Upload, Eye, RotateCcw, ZoomIn, Layers, TreePine, Fish, Camera, Microscope, Download, GitCompare, FileText, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const taxonomyHierarchy = [
  { level: 'Kingdom', value: 'Animalia', confidence: 100 },
  { level: 'Phylum', value: 'Chordata', confidence: 100 },
  { level: 'Class', value: 'Actinopterygii', confidence: 98 },
  { level: 'Order', value: 'Perciformes', confidence: 95 },
  { level: 'Family', value: 'Serranidae', confidence: 87 },
  { level: 'Genus', value: 'Epinephelus', confidence: 82 },
  { level: 'Species', value: 'E. marginatus', confidence: 76 },
];

const recentClassifications = [
  {
    id: 1,
    species: 'Epinephelus marginatus',
    commonName: 'Dusky Grouper',
    confidence: 94,
    date: '2024-12-15',
    location: 'Mediterranean Sea',
    status: 'verified',
  },
  {
    id: 2,
    species: 'Thunnus thynnus',
    commonName: 'Atlantic Bluefin Tuna',
    confidence: 88,
    date: '2024-12-14',
    location: 'North Atlantic',
    status: 'pending',
  },
  {
    id: 3,
    species: 'Pomacanthus imperator',
    commonName: 'Emperor Angelfish',
    confidence: 91,
    date: '2024-12-13',
    location: 'Indo-Pacific',
    status: 'verified',
  },
];

const otolithMeasurements = [
  { parameter: 'Length', value: '12.4 mm', range: '10.2-14.8 mm' },
  { parameter: 'Width', value: '8.7 mm', range: '7.1-10.3 mm' },
  { parameter: 'Perimeter', value: '34.2 mm', range: '29.8-38.6 mm' },
  { parameter: 'Area', value: '72.3 mm²', range: '58.1-86.5 mm²' },
  { parameter: 'Circularity', value: '0.847', range: '0.780-0.920' },
  { parameter: 'Aspect Ratio', value: '1.43', range: '1.25-1.65' },
];

export function Taxonomy() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassification, setSelectedClassification] = useState('');
  const [otolithView, setOtolithView] = useState('2d');
  const [showTree, setShowTree] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="mb-2">Taxonomy & Otolith Morphology</h1>
        <p className="text-muted-foreground">Species identification and otolith shape analysis for marine biodiversity studies</p>
      </div>

      <Tabs defaultValue="classification" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="classification">Species Identification</TabsTrigger>
          <TabsTrigger value="otolith">Otolith Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="classification" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Upload & Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Species Identification
                </CardTitle>
                <CardDescription>Upload images for automated species classification and taxonomic analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1579539441812-239283e92346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwdGF4b25vbXklMjBjbGFzc2lmaWNhdGlvbiUyMHNjaWVudGlmaWN8ZW58MXx8fHwxNzU3ODMwNzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Fish specimen"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drop fish images here or click to browse
                  </p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Images
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search">Search by Name</Label>
                  <div className="flex gap-2">
                    <Input
                      id="search"
                      placeholder="Enter species or common name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Filter by Classification</Label>
                  <Select value={selectedClassification} onValueChange={setSelectedClassification}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select taxonomic level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="genus">Genus</SelectItem>
                      <SelectItem value="species">Species</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => setAnalysisComplete(true)}
                >
                  <Fish className="h-4 w-4 mr-2" />
                  Identify Species
                </Button>
              </CardContent>
            </Card>

            {/* Classification Results */}
            <Card>
              <CardHeader>
                <CardTitle>Classification Results</CardTitle>
                <CardDescription>AI-powered species identification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {taxonomyHierarchy.map((level) => (
                    <div key={level.level} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{level.level}</div>
                        <div className="text-sm text-muted-foreground italic">{level.value}</div>
                      </div>
                      <Badge variant={level.confidence > 90 ? 'default' : level.confidence > 80 ? 'secondary' : 'outline'}>
                        {level.confidence}%
                      </Badge>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="border rounded-lg p-4 bg-muted/50">
                  <h4 className="font-medium mb-2">Identified Species</h4>
                  <div className="space-y-2">
                    <div className="font-medium italic">Epinephelus marginatus</div>
                    <div className="text-sm">Dusky Grouper</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">76% confidence</Badge>
                      <Badge variant="outline">Mediterranean native</Badge>
                    </div>
                  </div>
                </div>

                {/* Always visible taxonomic tree access */}
                <div className="flex items-center justify-between p-3 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
                  <div className="flex items-center gap-2">
                    <TreePine className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Taxonomic Tree Visualization</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTree(!showTree)}
                    className="gap-2"
                  >
                    <Eye className="h-3 w-3" />
                    {showTree ? 'Hide' : 'View'}
                  </Button>
                </div>

                {analysisComplete && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button 
                        variant={showTree ? "secondary" : "default"}
                        className="flex-1"
                        onClick={() => setShowTree(!showTree)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {showTree ? 'Hide' : 'View'} Taxonomic Tree
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setShowTree(true)}
                      >
                        <TreePine className="h-4 w-4" />
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
                            <FileSpreadsheet className="h-4 w-4 mr-2" />
                            Export as CSV
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Export as JSON
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Export as PDF Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {/* Taxonomic Tree Visualization */}
                    {showTree && (
                      <Card className="border-2 border-primary/20">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                <TreePine className="h-5 w-5" />
                                Taxonomic Hierarchy
                              </CardTitle>
                              <CardDescription>Complete phylogenetic classification pathway</CardDescription>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Export Tree
                                  <ChevronDown className="h-4 w-4 ml-2" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                                  Export as CSV
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Export as JSON
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Export as PDF
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg">
                              <h4 className="font-medium mb-3">Phylogenetic Tree for Epinephelus marginatus</h4>
                              <div className="space-y-3">
                                {taxonomyHierarchy.map((level, index) => (
                                  <div key={level.level} className="flex items-center">
                                    <div className="flex items-center flex-1">
                                      {index > 0 && (
                                        <div className="w-8 h-px bg-border mr-4"></div>
                                      )}
                                      <div className={`w-3 h-3 rounded-full mr-3 ${
                                        level.confidence > 90 ? 'bg-green-500' :
                                        level.confidence > 80 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}></div>
                                      <div className="flex-1 p-3 border rounded-lg bg-white/50 dark:bg-gray-900/50">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <div className="font-medium">{level.level}</div>
                                            <div className="text-sm text-muted-foreground italic">{level.value}</div>
                                          </div>
                                          <Badge variant={level.confidence > 90 ? 'default' : level.confidence > 80 ? 'secondary' : 'outline'}>
                                            {level.confidence}%
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Quick Navigation */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <Card className="p-3 text-center">
                                <Fish className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                                <div className="text-sm font-medium">Actinopterygii</div>
                                <div className="text-xs text-muted-foreground">Ray-finned fishes</div>
                              </Card>
                              <Card className="p-3 text-center">
                                <div className="h-6 w-6 mx-auto mb-2 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                </div>
                                <div className="text-sm font-medium">Chondrichthyes</div>
                                <div className="text-xs text-muted-foreground">Cartilaginous fish</div>
                              </Card>
                              <Card className="p-3 text-center">
                                <div className="h-6 w-6 mx-auto mb-2 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="text-sm font-medium">Mollusca</div>
                                <div className="text-xs text-muted-foreground">Mollusks</div>
                              </Card>
                              <Card className="p-3 text-center">
                                <div className="h-6 w-6 mx-auto mb-2 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                </div>
                                <div className="text-sm font-medium">Arthropoda</div>
                                <div className="text-xs text-muted-foreground">Crustaceans</div>
                              </Card>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
                
                {!analysisComplete && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowTree(!showTree)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {showTree ? 'Hide' : 'Preview'} Taxonomic Tree
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setShowTree(true)}
                      >
                        <TreePine className="h-4 w-4" />
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
                            <FileSpreadsheet className="h-4 w-4 mr-2" />
                            Export as CSV
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Export as JSON
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Export as PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {/* Always show taxonomic tree when requested */}
                    {showTree && (
                      <Card className="border-2 border-primary/20">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                <TreePine className="h-5 w-5" />
                                Taxonomic Hierarchy Preview
                              </CardTitle>
                              <CardDescription>Phylogenetic classification pathway</CardDescription>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Export Tree
                                  <ChevronDown className="h-4 w-4 ml-2" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                                  Export as CSV
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Export as JSON
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Export as PDF
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg">
                              <h4 className="font-medium mb-3">Phylogenetic Tree for Epinephelus marginatus</h4>
                              <div className="space-y-3">
                                {taxonomyHierarchy.map((level, index) => (
                                  <div key={level.level} className="flex items-center">
                                    <div className="flex items-center flex-1">
                                      {index > 0 && (
                                        <div className="w-8 h-px bg-border mr-4"></div>
                                      )}
                                      <div className={`w-3 h-3 rounded-full mr-3 ${
                                        level.confidence > 90 ? 'bg-green-500' :
                                        level.confidence > 80 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}></div>
                                      <div className="flex-1 p-3 border rounded-lg bg-white/50 dark:bg-gray-900/50">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <div className="font-medium">{level.level}</div>
                                            <div className="text-sm text-muted-foreground italic">{level.value}</div>
                                          </div>
                                          <Badge variant={level.confidence > 90 ? 'default' : level.confidence > 80 ? 'secondary' : 'outline'}>
                                            {level.confidence}%
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Quick Navigation */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <Card className="p-3 text-center">
                                <Fish className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                                <div className="text-sm font-medium">Actinopterygii</div>
                                <div className="text-xs text-muted-foreground">Ray-finned fishes</div>
                              </Card>
                              <Card className="p-3 text-center">
                                <div className="h-6 w-6 mx-auto mb-2 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                </div>
                                <div className="text-sm font-medium">Chondrichthyes</div>
                                <div className="text-xs text-muted-foreground">Cartilaginous fish</div>
                              </Card>
                              <Card className="p-3 text-center">
                                <div className="h-6 w-6 mx-auto mb-2 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="text-sm font-medium">Mollusca</div>
                                <div className="text-xs text-muted-foreground">Mollusks</div>
                              </Card>
                              <Card className="p-3 text-center">
                                <div className="h-6 w-6 mx-auto mb-2 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                </div>
                                <div className="text-sm font-medium">Arthropoda</div>
                                <div className="text-xs text-muted-foreground">Crustaceans</div>
                              </Card>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Classifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Classifications</CardTitle>
              <CardDescription>History of species identifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentClassifications.map((classification) => (
                  <div key={classification.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium italic">{classification.species}</div>
                      <div className="text-sm text-muted-foreground">{classification.commonName}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {classification.location} • {classification.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{classification.confidence}%</Badge>
                      <Badge variant={classification.status === 'verified' ? 'default' : 'outline'}>
                        {classification.status}
                      </Badge>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="otolith" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Otolith Viewer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="h-5 w-5" />
                  Otolith Viewer
                </CardTitle>
                <CardDescription>Interactive 2D/3D otolith analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>View Mode</Label>
                  <Select value={otolithView} onValueChange={setOtolithView}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2d">2D View</SelectItem>
                      <SelectItem value="3d">3D Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1694184889674-2df26d350072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwb3RvbGl0aCUyMGVhciUyMHN0b25lJTIwbWljcm9zY29weXxlbnwxfHx8fDE3NTc4MzA3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Otolith microscopy"
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button variant="secondary" size="sm">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="sm">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Layers className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 rounded px-3 py-1">
                    <span className="text-sm font-medium">E. marginatus</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Otolith
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <GitCompare className="h-4 w-4 mr-2" />
                    Compare
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Morphometric Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Morphometric Analysis</CardTitle>
                <CardDescription>Quantitative otolith measurements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {otolithMeasurements.map((measurement) => (
                    <div key={measurement.parameter} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{measurement.parameter}</div>
                        <div className="text-sm text-muted-foreground">Range: {measurement.range}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono">{measurement.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="border rounded-lg p-4 bg-muted/50">
                  <h4 className="font-medium mb-2">Shape Analysis</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Form Factor:</span>
                      <div className="font-mono">0.723</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ellipticity:</span>
                      <div className="font-mono">0.856</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rectangularity:</span>
                      <div className="font-mono">0.634</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Roundness:</span>
                      <div className="font-mono">0.789</div>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export Measurements
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as JSON
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as PDF Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>
        </TabsContent>


      </Tabs>
    </div>
  );
}