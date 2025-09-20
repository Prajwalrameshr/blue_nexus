import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Users, MessageSquare, Share2, Download, FileText, Lock, Globe, UserCheck, Clock, Bell } from 'lucide-react';
import { useState } from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'Marine Biologist',
    institution: 'Woods Hole Oceanographic Institution',
    permissions: 'Admin',
    lastActive: '2 hours ago',
    avatar: 'SC',
  },
  {
    id: 2,
    name: 'Prof. Miguel Rodriguez',
    role: 'Oceanographer',
    institution: 'University of Barcelona',
    permissions: 'Scientist',
    lastActive: '1 day ago',
    avatar: 'MR',
  },
  {
    id: 3,
    name: 'Dr. Yuki Tanaka',
    role: 'Molecular Biologist',
    institution: 'Tokyo University of Marine Science',
    permissions: 'Scientist',
    lastActive: '3 hours ago',
    avatar: 'YT',
  },
  {
    id: 4,
    name: 'James Patterson',
    role: 'Policy Advisor',
    institution: 'NOAA Fisheries',
    permissions: 'Policy Maker',
    lastActive: '5 hours ago',
    avatar: 'JP',
  },
];

const recentComments = [
  {
    id: 1,
    author: 'Dr. Sarah Chen',
    avatar: 'SC',
    content: 'The temperature correlation analysis shows significant seasonal variations. We should expand the temporal coverage to include the last 5 years.',
    timestamp: '2 hours ago',
    dataset: 'Pacific Temperature Survey',
    replies: 2,
  },
  {
    id: 2,
    author: 'Prof. Miguel Rodriguez',
    avatar: 'MR',
    content: 'Excellent work on the eDNA analysis! The species detection results align well with our traditional survey methods.',
    timestamp: '1 day ago',
    dataset: 'Mediterranean Biodiversity Study',
    replies: 0,
  },
  {
    id: 3,
    author: 'Dr. Yuki Tanaka',
    avatar: 'YT',
    content: 'I notice some outliers in the COI sequence data. Should we review the quality filtering parameters?',
    timestamp: '2 days ago',
    dataset: 'Molecular Database',
    replies: 1,
  },
];

const sharedReports = [
  {
    id: 1,
    title: 'Climate Impact Assessment 2024',
    type: 'Analysis Report',
    shared: 'Public',
    downloads: 847,
    views: 3420,
    created: '2024-12-10',
    author: 'Dr. Sarah Chen',
  },
  {
    id: 2,
    title: 'Mediterranean Biodiversity Trends',
    type: 'Visualization Dashboard',
    shared: 'Team Only',
    downloads: 156,
    views: 892,
    created: '2024-12-08',
    author: 'Prof. Miguel Rodriguez',
  },
  {
    id: 3,
    title: 'eDNA Species Detection Protocol',
    type: 'Methodology Paper',
    shared: 'Institution',
    downloads: 234,
    views: 1247,
    created: '2024-12-05',
    author: 'Dr. Yuki Tanaka',
  },
];

const exportFormats = [
  { format: 'PDF Report', description: 'Comprehensive analysis report with visualizations' },
  { format: 'Excel Dataset', description: 'Raw data in spreadsheet format' },
  { format: 'JSON API', description: 'Structured data for applications' },
  { format: 'Interactive Dashboard', description: 'Shareable web-based dashboard' },
];

export function Collaboration() {
  const [newComment, setNewComment] = useState('');
  const [selectedPermission, setSelectedPermission] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="mb-2">Collaboration & Sharing</h1>
        <p className="text-muted-foreground">Team collaboration, data sharing, and export capabilities for marine research</p>
      </div>

      <Tabs defaultValue="team" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="team">Team Management</TabsTrigger>
          <TabsTrigger value="comments">Comments & Annotations</TabsTrigger>
          <TabsTrigger value="sharing">Sharing & Permissions</TabsTrigger>
          <TabsTrigger value="exports">Export & APIs</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
                <CardDescription>Manage research team access and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                          <div className="text-xs text-muted-foreground">{member.institution}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={member.permissions === 'Admin' ? 'default' : member.permissions === 'Scientist' ? 'secondary' : 'outline'}>
                          {member.permissions}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{member.lastActive}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <Button className="w-full">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Invite Team Member
                </Button>
              </CardContent>
            </Card>

            {/* Role Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>Configure access levels for different user roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Admin</h4>
                      <Badge variant="default">Full Access</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Upload and manage all datasets</li>
                      <li>• Configure analysis parameters</li>
                      <li>• Manage team members</li>
                      <li>• Export all data and reports</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Scientist</h4>
                      <Badge variant="secondary">Research Access</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Upload datasets in assigned areas</li>
                      <li>• Run analysis and visualizations</li>
                      <li>• Comment and annotate data</li>
                      <li>• Export research results</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Policy Maker</h4>
                      <Badge variant="outline">View Access</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• View analysis results and reports</li>
                      <li>• Access summary dashboards</li>
                      <li>• Download approved reports</li>
                      <li>• Receive automated alerts</li>
                    </ul>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Modify Permissions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Team collaboration and data updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-medium">Dr. Sarah Chen</span> uploaded new dataset
                      <span className="font-medium"> "Pacific Temperature Survey 2024"</span>
                    </div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">YT</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-medium">Dr. Yuki Tanaka</span> completed eDNA analysis for
                      <span className="font-medium"> Mediterranean samples</span>
                    </div>
                    <div className="text-xs text-muted-foreground">5 hours ago</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">MR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-medium">Prof. Miguel Rodriguez</span> shared report
                      <span className="font-medium"> "Biodiversity Trends Analysis"</span>
                    </div>
                    <div className="text-xs text-muted-foreground">1 day ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add Comment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Add Annotation
                </CardTitle>
                <CardDescription>Comment on datasets or visualizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dataset-select">Select Dataset/Visualization</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose item to annotate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temp-analysis">Temperature Correlation Analysis</SelectItem>
                      <SelectItem value="edna-results">eDNA Species Detection</SelectItem>
                      <SelectItem value="biodiversity-map">Biodiversity Distribution Map</SelectItem>
                      <SelectItem value="otolith-study">Otolith Morphology Study</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment-text">Comment</Label>
                  <Textarea
                    id="comment-text"
                    placeholder="Add your observations, questions, or insights..."
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Annotation Type</Label>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="cursor-pointer">Observation</Badge>
                    <Badge variant="outline" className="cursor-pointer">Question</Badge>
                    <Badge variant="outline" className="cursor-pointer">Recommendation</Badge>
                    <Badge variant="outline" className="cursor-pointer">Issue</Badge>
                  </div>
                </div>

                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Post Comment
                </Button>
              </CardContent>
            </Card>

            {/* Recent Comments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Comments</CardTitle>
                <CardDescription>Latest team discussions and annotations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentComments.map((comment) => (
                    <div key={comment.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{comment.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm mb-2">{comment.content}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">{comment.dataset}</Badge>
                            <div className="flex items-center gap-2">
                              {comment.replies > 0 && (
                                <span className="text-xs text-muted-foreground">
                                  {comment.replies} replies
                                </span>
                              )}
                              <Button variant="ghost" size="sm">Reply</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sharing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Share Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share Settings
                </CardTitle>
                <CardDescription>Configure data and report sharing permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="share-item">Select Item to Share</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose item to share" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Main Dashboard</SelectItem>
                      <SelectItem value="analysis">Correlation Analysis</SelectItem>
                      <SelectItem value="dataset">Temperature Dataset</SelectItem>
                      <SelectItem value="report">Climate Impact Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sharing Level</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="private" name="sharing" value="private" className="rounded" />
                      <Label htmlFor="private" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Private - Team only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="institution" name="sharing" value="institution" className="rounded" />
                      <Label htmlFor="institution" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Institution - Your organization
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="public" name="sharing" value="public" className="rounded" />
                      <Label htmlFor="public" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Public - Anyone with link
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="permissions">Viewer Permissions</Label>
                  <Select value={selectedPermission} onValueChange={setSelectedPermission}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select permissions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">View Only</SelectItem>
                      <SelectItem value="comment">View & Comment</SelectItem>
                      <SelectItem value="download">View & Download</SelectItem>
                      <SelectItem value="edit">Full Edit Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="share-message">Share Message (Optional)</Label>
                  <Textarea
                    id="share-message"
                    placeholder="Add a message for recipients..."
                    rows={3}
                  />
                </div>

                <Button className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Generate Share Link
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">New Dataset Uploads</div>
                      <div className="text-sm text-muted-foreground">Get notified when team members upload data</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Analysis Completion</div>
                      <div className="text-sm text-muted-foreground">Alerts when automated analysis finishes</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Comments & Mentions</div>
                      <div className="text-sm text-muted-foreground">When someone comments or mentions you</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Data Quality Alerts</div>
                      <div className="text-sm text-muted-foreground">Issues with data validation or quality</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Weekly Summaries</div>
                      <div className="text-sm text-muted-foreground">Digest of team activity and insights</div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Notification Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue defaultValue="immediate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly digest</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                      <SelectItem value="weekly">Weekly digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shared Items */}
          <Card>
            <CardHeader>
              <CardTitle>Shared Reports & Dashboards</CardTitle>
              <CardDescription>Items shared with external collaborators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sharedReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{report.title}</div>
                        <div className="text-sm text-muted-foreground">{report.type} • Created by {report.author}</div>
                        <div className="text-xs text-muted-foreground">Created {report.created}</div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{report.views.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">views</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{report.downloads}</div>
                          <div className="text-xs text-muted-foreground">downloads</div>
                        </div>
                        <Badge variant={report.shared === 'Public' ? 'default' : report.shared === 'Team Only' ? 'secondary' : 'outline'}>
                          {report.shared}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Export Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export Data & Reports
                </CardTitle>
                <CardDescription>Download data in various formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Data to Export</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose dataset or analysis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temp-data">Temperature Dataset</SelectItem>
                      <SelectItem value="biodiversity">Biodiversity Records</SelectItem>
                      <SelectItem value="edna-sequences">eDNA Sequences</SelectItem>
                      <SelectItem value="analysis-results">Analysis Results</SelectItem>
                      <SelectItem value="all-data">Complete Dataset</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Export Format</Label>
                  {exportFormats.map((format) => (
                    <div key={format.format} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{format.format}</div>
                        <div className="text-sm text-muted-foreground">{format.description}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API Access */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  API Access
                </CardTitle>
                <CardDescription>Programmatic access to marine data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">REST API Endpoints</h4>
                  <div className="space-y-2 text-sm font-mono">
                    <div>/api/v1/oceanographic/temperature</div>
                    <div>/api/v1/biodiversity/species</div>
                    <div>/api/v1/edna/sequences</div>
                    <div>/api/v1/analysis/correlations</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="api-key" 
                      value="mk_live_abc123..." 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" size="sm">Copy</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rate Limits</Label>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Requests per hour:</span>
                      <div>1,000</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Data transfer:</span>
                      <div>10 GB/day</div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  API Documentation
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Exports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Exports</CardTitle>
              <CardDescription>Download history and generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Climate Impact Report 2024.pdf</div>
                    <div className="text-sm text-muted-foreground">Generated 2 hours ago • 4.2 MB</div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="default">Ready</Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Biodiversity_Dataset_2024.xlsx</div>
                    <div className="text-sm text-muted-foreground">Generated 1 day ago • 12.8 MB</div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="default">Ready</Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">eDNA_Sequences_Mediterranean.json</div>
                    <div className="text-sm text-muted-foreground">Generating... • Estimated 5 minutes</div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Processing</Badge>
                    <Button variant="ghost" size="sm" disabled>
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}