import { useState } from 'react';
import { Dashboard } from './components/dashboard';
import { DataIntegration } from './components/data-integration';
import { Visualization } from './components/visualization';
import { Taxonomy } from './components/taxonomy';
import { EdnaModule } from './components/edna';
import { Analysis } from './components/analysis';
import { Collaboration } from './components/collaboration';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from './components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { BarChart3, Database, Map, TreePine, Dna, Brain, Users, Waves, Menu, Bot, Globe } from 'lucide-react';

const navigationItems = [
  { id: 'data-integration', label: 'Data Integration', icon: Database, description: 'Upload & validate datasets' },
  { id: 'visualization', label: 'Interactive Visualization', icon: Map, description: 'Ocean maps & timeline analysis' },
  { id: 'taxonomy', label: 'Taxonomy & Otolith Morphology', icon: TreePine, description: 'Species classification & 3D analysis' },
  { id: 'edna', label: 'Molecular & eDNA Data', icon: Dna, description: 'DNA sequence analysis' },
  { id: 'analysis', label: 'Cross-Disciplinary Analysis', icon: Brain, description: 'AI-driven insights' },
  { id: 'collaboration', label: 'Collaboration Hub', icon: Users, description: 'Role-based team sharing' },
];

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleModuleChange = (moduleId: string) => {
    setActiveModule(moduleId);
    setIsSheetOpen(false); // Auto-close the sheet
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'data-integration':
        return <DataIntegration />;
      case 'visualization':
        return <Visualization />;
      case 'taxonomy':
        return <Taxonomy />;
      case 'edna':
        return <EdnaModule />;
      case 'analysis':
        return <Analysis />;
      case 'collaboration':
        return <Collaboration />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800">
      <main className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <header className="h-20 border-b border-border/40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm">
          <div className="h-full flex items-center justify-between px-6">
            {/* Left Section - Logo and Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <Waves className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Blue Nexus
                  </h1>
                  <p className="text-xs text-muted-foreground">where ocean data sparks global action</p>
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Live Data Stream</span>
              </div>
            </div>

            {/* Center Section - Brand */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
              <div className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Marine Analytics Platform
              </div>
              <div className="text-xs text-muted-foreground italic">
                Advanced Ocean Research & Analytics
              </div>
            </div>

            {/* Right Section - Navigation and User */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-sm text-muted-foreground">
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
              </div>
              
              {/* Hamburger Menu */}
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Menu className="h-4 w-4" />
                    Modules
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-80 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-800 text-white border-l border-border/20 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="text-white">Platform Modules</SheetTitle>
                    <SheetDescription className="text-blue-200">
                      Advanced Marine Analytics
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-1.5 mt-4 pb-6">
                    <Button
                      onClick={() => handleModuleChange('dashboard')}
                      variant={activeModule === 'dashboard' ? 'default' : 'ghost'}
                      className={`w-full justify-start gap-3 p-3 h-auto ${
                        activeModule === 'dashboard'
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                          : 'text-blue-100 hover:bg-blue-900/50 hover:text-white'
                      }`}
                    >
                      <BarChart3 className="h-4 w-4 flex-shrink-0" />
                      <div className="text-left">
                        <div className="text-sm font-medium">Dashboard</div>
                        <div className="text-xs opacity-70">Real-time oceanographic monitoring</div>
                      </div>
                    </Button>
                    
                    {navigationItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Button
                          key={item.id}
                          onClick={() => handleModuleChange(item.id)}
                          variant={activeModule === item.id ? 'default' : 'ghost'}
                          className={`w-full justify-start gap-3 p-3 h-auto ${
                            activeModule === item.id
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                              : 'text-blue-100 hover:bg-blue-900/50 hover:text-white'
                          }`}
                        >
                          <IconComponent className="h-4 w-4 flex-shrink-0" />
                          <div className="text-left">
                            <div className="text-sm font-medium">{item.label}</div>
                            <div className="text-xs opacity-70">{item.description}</div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <span className="text-sm font-medium text-white">DR</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 max-w-7xl">
            {renderActiveModule()}
          </div>
        </div>
      </main>

      {/* AI Chatbot - Fixed Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
          <Button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
            <div className="relative flex items-center justify-center">
              <Bot className="h-8 w-8 text-white group-hover:scale-110 transition-transform drop-shadow-sm" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
            </div>
          </Button>
          
          <DialogContent className="w-80 h-96 p-0 overflow-hidden">
            <DialogHeader className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <DialogTitle className="flex items-center gap-2 text-white">
                <Bot className="h-5 w-5" />
                Ocean AI Assistant
              </DialogTitle>
              <DialogDescription className="text-blue-100">
                Your intelligent marine research companion
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p><strong>AI Assistant:</strong> Welcome to Blue Nexus! I can help you with:</p>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• Data analysis guidance</li>
                  <li>• Species identification tips</li>
                  <li>• Platform navigation</li>
                  <li>• Research methodology</li>
                </ul>
              </div>
              
              <div className="bg-primary/10 p-3 rounded-lg text-sm">
                <p><strong>You:</strong> How can I start analyzing my oceanographic data?</p>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p><strong>AI Assistant:</strong> Great question! Start with the Data Integration module to upload your datasets, then use Interactive Visualization for preliminary analysis. Would you like specific guidance on data formats?</p>
              </div>
            </div>
            
            <div className="p-4 border-t border-border/40">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about marine data analysis..."
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background"
                />
                <Button size="sm" className="px-3">
                  Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}