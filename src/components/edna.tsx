import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dna, Search, Database, Upload, ChevronRight, Microscope, FlaskConical, Download, GitCompare, Zap, FileText, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const sequenceData = [
  {
    id: 'SEQ001',
    species: 'Thunnus thynnus',
    gene: 'COI',
    length: 658,
    quality: 98,
    similarity: 99.2,
    accession: 'MT123456',
    location: 'North Atlantic',
    date: '2024-12-15',
  },
  {
    id: 'SEQ002',
    species: 'Epinephelus marginatus',
    gene: '16S rRNA',
    length: 547,
    quality: 95,
    similarity: 97.8,
    accession: 'MT123457',
    location: 'Mediterranean',
    date: '2024-12-14',
  },
  {
    id: 'SEQ003',
    species: 'Pomacanthus imperator',
    gene: 'COI',
    length: 652,
    quality: 97,
    similarity: 98.5,
    accession: 'MT123458',
    location: 'Indo-Pacific',
    date: '2024-12-13',
  },
];

const detectionResults = [
  { species: 'Thunnus thynnus', reads: 1247, abundance: 'High', status: 'confirmed' },
  { species: 'Sardina pilchardus', reads: 892, abundance: 'Medium', status: 'confirmed' },
  { species: 'Engraulis encrasicolus', reads: 543, abundance: 'Medium', status: 'confirmed' },
  { species: 'Trachurus trachurus', reads: 234, abundance: 'Low', status: 'tentative' },
  { species: 'Mullus barbatus', reads: 156, abundance: 'Low', status: 'tentative' },
];

const referenceDatabases = [
  { name: 'GenBank', sequences: '245M+', coverage: 'Global', status: 'active' },
  { name: 'BOLD Systems', sequences: '8.5M+', coverage: 'Barcode-focused', status: 'active' },
  { name: 'EMBL-EBI', sequences: '52M+', coverage: 'European', status: 'active' },
  { name: 'FishBase', sequences: '1.2M+', coverage: 'Fish-specific', status: 'active' },
];

export function EdnaModule() {
  const [searchSequence, setSearchSequence] = useState('');
  const [selectedGene, setSelectedGene] = useState('COI');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 8;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="mb-2">Molecular & eDNA Analysis</h1>
        <p className="text-muted-foreground">Environmental DNA sequencing and molecular species identification</p>
      </div>

      <Tabs defaultValue="sequences" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sequences">Sequence Database</TabsTrigger>
          <TabsTrigger value="analysis">eDNA Analysis</TabsTrigger>
          <TabsTrigger value="detection">Species Detection</TabsTrigger>
          <TabsTrigger value="references">Reference Data</TabsTrigger>
        </TabsList>

        <TabsContent value="sequences" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sequence Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Sequence Upload
                </CardTitle>
                <CardDescription>Upload DNA sequences for species identification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="sequence-id">Sequence ID</Label>
                  <Input id="sequence-id" placeholder="Enter unique sequence ID" />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="gene-marker">Gene Marker</Label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={selectedGene}
                    onChange={(e) => setSelectedGene(e.target.value)}
                  >
                    <option value="COI">COI (Cytochrome Oxidase I)</option>
                    <option value="16S">16S rRNA</option>
                    <option value="12S">12S rRNA</option>
                    <option value="18S">18S rRNA</option>
                    <option value="ITS">ITS (Internal Transcribed Spacer)</option>
                  </select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="sequence-data">DNA Sequence</Label>
                  <Textarea 
                    id="sequence-data"
                    placeholder="Paste DNA sequence (FASTA format)..."
                    rows={6}
                    className="font-mono text-sm"
                    value={searchSequence}
                    onChange={(e) => setSearchSequence(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="location">Collection Location</Label>
                    <Input id="location" placeholder="Lat, Long or region" />
                  </div>
                  <div>
                    <Label htmlFor="date">Collection Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>

                <Button className="w-full">
                  <Dna className="h-4 w-4 mr-2" />
                  Upload & Analyze Sequence
                </Button>
              </CardContent>
            </Card>

            {/* Sequence Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Sequence Search
                </CardTitle>
                <CardDescription>Search against reference databases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">BLAST Analysis</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    High-speed sequence alignment against comprehensive marine databases
                  </p>
                </div>

                {isAnalyzing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analyzing sequence...</span>
                      <span>{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Top Matches</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium italic">Thunnus thynnus</div>
                        <div className="text-sm text-muted-foreground">Atlantic Bluefin Tuna</div>
                      </div>
                      <Badge variant="default">99.2%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium italic">Thunnus orientalis</div>
                        <div className="text-sm text-muted-foreground">Pacific Bluefin Tuna</div>
                      </div>
                      <Badge variant="secondary">97.8%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium italic">Thunnus albacares</div>
                        <div className="text-sm text-muted-foreground">Yellowfin Tuna</div>
                      </div>
                      <Badge variant="outline">95.1%</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={handleAnalysis} disabled={isAnalyzing}>
                    <Search className="h-4 w-4 mr-2" />
                    {isAnalyzing ? 'Searching...' : 'Search Databases'}
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
              </CardContent>
            </Card>
          </div>

          {/* Sequence Library */}
          <Card>
            <CardHeader>
              <CardTitle>Sequence Library</CardTitle>
              <CardDescription>Stored DNA sequences and analysis results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sequenceData.map((sequence) => (
                  <div key={sequence.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{sequence.id}</span>
                          <Badge variant="outline">{sequence.gene}</Badge>
                        </div>
                        <div className="font-medium italic">{sequence.species}</div>
                        <div className="text-sm text-muted-foreground">
                          {sequence.location} • {sequence.date}
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Quality:</span> {sequence.quality}%
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Similarity:</span> {sequence.similarity}%
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Length:</span> {sequence.length} bp
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground font-mono">{sequence.accession}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sample Processing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5" />
                  eDNA Sample Processing
                </CardTitle>
                <CardDescription>Environmental sample analysis workflow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <div className="font-medium">Sample Collection</div>
                      <div className="text-sm text-muted-foreground">Water/sediment samples collected</div>
                    </div>
                    <Badge variant="default">Complete</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <div className="font-medium">DNA Extraction</div>
                      <div className="text-sm text-muted-foreground">Environmental DNA isolated</div>
                    </div>
                    <Badge variant="default">Complete</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg bg-blue-50 dark:bg-blue-950">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">3</span>
                    </div>
                    <div>
                      <div className="font-medium">PCR Amplification</div>
                      <div className="text-sm text-muted-foreground">Target genes amplified</div>
                    </div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">4</span>
                    </div>
                    <div>
                      <div className="font-medium">Sequencing</div>
                      <div className="text-sm text-muted-foreground">High-throughput sequencing</div>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <div>
                      <div className="font-medium">Bioinformatics</div>
                      <div className="text-sm text-muted-foreground">Species identification</div>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>

                <Progress value={60} className="w-full" />
                <p className="text-sm text-muted-foreground">Overall progress: 60% complete</p>
              </CardContent>
            </Card>

            {/* Analysis Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Parameters</CardTitle>
                <CardDescription>Configure sequencing and analysis settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label>Target Gene Regions</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="coi" defaultChecked className="rounded" />
                        <Label htmlFor="coi" className="text-sm">COI</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="16s" defaultChecked className="rounded" />
                        <Label htmlFor="16s" className="text-sm">16S rRNA</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="12s" className="rounded" />
                        <Label htmlFor="12s" className="text-sm">12S rRNA</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="18s" className="rounded" />
                        <Label htmlFor="18s" className="text-sm">18S rRNA</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Quality Thresholds</Label>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Min. sequence length:</span>
                        <div>150 bp</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quality score:</span>
                        <div>Q30+</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Identity threshold:</span>
                        <div>97%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Coverage:</span>
                        <div>80%</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Database Selection</Label>
                    <div className="space-y-2">
                      {referenceDatabases.slice(0, 2).map((db) => (
                        <div key={db.name} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm font-medium">{db.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">{db.sequences}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Microscope className="h-4 w-4 mr-2" />
                    Start Analysis
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Species Detection Results
              </CardTitle>
              <CardDescription>Environmental DNA species identification and abundance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{detectionResults.length}</div>
                    <div className="text-sm text-muted-foreground">Species Detected</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {detectionResults.reduce((sum, result) => sum + result.reads, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Reads</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {detectionResults.filter(r => r.status === 'confirmed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Confirmed Species</div>
                  </Card>
                </div>

                <div className="space-y-3">
                  {detectionResults.map((result, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium italic">{result.species}</div>
                          <div className="text-sm text-muted-foreground">
                            {result.reads.toLocaleString()} reads • {result.abundance} abundance
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={result.status === 'confirmed' ? 'default' : 'secondary'}>
                            {result.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Relative abundance</span>
                          <span>{((result.reads / detectionResults.reduce((sum, r) => sum + r.reads, 0)) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={(result.reads / detectionResults.reduce((sum, r) => sum + r.reads, 0)) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Export Results
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
                  <Button variant="outline" className="flex-1">
                    <GitCompare className="h-4 w-4 mr-2" />
                    Compare Samples
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="references" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reference Databases</CardTitle>
              <CardDescription>Connected molecular databases and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referenceDatabases.map((database) => (
                  <div key={database.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{database.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {database.sequences} sequences • {database.coverage} coverage
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={database.status === 'active' ? 'default' : 'outline'}>
                          {database.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Database className="h-4 w-4" />
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