import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Upload, FileText, Database, CheckCircle, AlertCircle, Clock, Tag, FileSpreadsheet, Globe } from 'lucide-react';
import { useState } from 'react';

const uploadedDatasets = [
  {
    id: 1,
    name: 'Pacific Ocean Temperature Survey 2024',
    type: 'Structured',
    format: 'CSV',
    size: '245 MB',
    quality: 95,
    status: 'validated',
    uploadDate: '2024-12-15',
    tags: ['temperature', 'pacific', 'oceanographic'],
  },
  {
    id: 2,
    name: 'Marine Species Images - Deep Sea',
    type: 'Unstructured',
    format: 'Images',
    size: '1.2 GB',
    quality: 87,
    status: 'processing',
    uploadDate: '2024-12-14',
    tags: ['imagery', 'deep-sea', 'species'],
  },
  {
    id: 3,
    name: 'eDNA Samples - Coral Reef Study',
    type: 'Semi-structured',
    format: 'JSON',
    size: '89 MB',
    quality: 92,
    status: 'validated',
    uploadDate: '2024-12-13',
    tags: ['eDNA', 'coral-reef', 'biodiversity'],
  },
];

const dataStandards = [
  'OBIS - Ocean Biodiversity Information System',
  'GBIF - Global Biodiversity Information Facility',
  'CF - Climate and Forecast Metadata Conventions',
  'Darwin Core - Biodiversity Data Standard',
  'ICES - International Council for Exploration of the Sea',
];

export function DataIntegration() {
  const [selectedStandard, setSelectedStandard] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="mb-2">Data Integration Hub</h1>
        <p className="text-muted-foreground">Upload, validate, and standardize oceanographic and biodiversity datasets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Dataset Upload
            </CardTitle>
            <CardDescription>Upload new datasets for analysis and integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="dataset-name">Dataset Name</Label>
              <Input id="dataset-name" placeholder="Enter dataset name" />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="data-type">Data Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="structured">Structured (CSV, Database)</SelectItem>
                  <SelectItem value="semi-structured">Semi-structured (JSON, XML)</SelectItem>
                  <SelectItem value="unstructured">Unstructured (Images, Text)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="metadata-standard">Metadata Standard</Label>
              <Select value={selectedStandard} onValueChange={setSelectedStandard}>
                <SelectTrigger>
                  <SelectValue placeholder="Select international standard" />
                </SelectTrigger>
                <SelectContent>
                  {dataStandards.map((standard) => (
                    <SelectItem key={standard} value={standard}>
                      {standard}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the dataset, collection methods, and key parameters..."
                rows={3}
              />
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <Button variant="outline" onClick={handleFileUpload} disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Select Files'}
              </Button>
              
              {isUploading && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-xs text-muted-foreground mt-1">{uploadProgress}% complete</p>
                </div>
              )}
            </div>

            <Button className="w-full" disabled={isUploading}>
              <Database className="h-4 w-4 mr-2" />
              Upload & Process Dataset
            </Button>
          </CardContent>
        </Card>

        {/* Metadata Tagging */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Automated Metadata Tagging
            </CardTitle>
            <CardDescription>AI-powered metadata extraction and standardization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Geographic Coordinates</span>
                </div>
                <Badge variant="secondary">Auto-detected</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Temporal Coverage</span>
                </div>
                <Badge variant="secondary">Validated</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Parameter Units</span>
                </div>
                <Badge variant="secondary">Standardized</Badge>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium mb-2">Suggested Tags</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">oceanographic</Badge>
                <Badge variant="outline">temperature</Badge>
                <Badge variant="outline">salinity</Badge>
                <Badge variant="outline">pacific-ocean</Badge>
                <Badge variant="outline">2024</Badge>
                <Badge variant="outline">surface-water</Badge>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Quality Assessment</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completeness</span>
                  <span>95%</span>
                </div>
                <Progress value={95} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Accuracy</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Consistency</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Datasets */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Datasets</CardTitle>
          <CardDescription>Manage and monitor uploaded datasets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedDatasets.map((dataset) => (
              <div key={dataset.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-medium">{dataset.name}</h4>
                      {dataset.status === 'validated' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {dataset.status === 'processing' && (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                      <div>
                        <span className="font-medium">Type:</span> {dataset.type}
                      </div>
                      <div>
                        <span className="font-medium">Format:</span> {dataset.format}
                      </div>
                      <div>
                        <span className="font-medium">Size:</span> {dataset.size}
                      </div>
                      <div>
                        <span className="font-medium">Quality:</span> {dataset.quality}%
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {dataset.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={dataset.status === 'validated' ? 'secondary' : 'outline'}
                      className="capitalize"
                    >
                      {dataset.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
                
                <Progress value={dataset.quality} className="h-2 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}