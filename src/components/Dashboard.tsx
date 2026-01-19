import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  List,
  MessageSquare,
  FileText,
  MapPin,
  Receipt,
  BarChart3,
  HelpCircle,
  Bell,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import DashboardOverview from './dashboard/DashboardOverview';
import CreateLoad from './dashboard/CreateLoad';
import ActiveLoads from './dashboard/ActiveLoads';
import Negotiations from './dashboard/Negotiations';
import Documents from './dashboard/Documents';
import Tracking from './dashboard/Tracking';
import Invoices from './dashboard/Invoices';
import Analytics from './dashboard/Analytics';

interface DashboardProps {
  onSignOut: () => void;
}

type View =
  | 'overview'
  | 'create-load'
  | 'active-loads'
  | 'negotiations'
  | 'documents'
  | 'tracking'
  | 'invoices'
  | 'analytics';

export default function Dashboard({ onSignOut }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create-load', label: 'Create Load', icon: Package },
    { id: 'active-loads', label: 'Active Loads', icon: List, badge: 12 },
    { id: 'negotiations', label: 'Negotiations', icon: MessageSquare, badge: 3 },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'tracking', label: 'Tracking', icon: MapPin },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardOverview onNavigate={setCurrentView} />;
      case 'create-load':
        return <CreateLoad />;
      case 'active-loads':
        return <ActiveLoads onNavigate={setCurrentView} />;
      case 'negotiations':
        return <Negotiations />;
      case 'documents':
        return <Documents />;
      case 'tracking':
        return <Tracking />;
      case 'invoices':
        return <Invoices />;
      case 'analytics':
        return <Analytics />;
      default:
        return <DashboardOverview onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 border-r bg-card">
        <div className="h-16 flex items-center gap-2 px-6 border-b">
          <Package className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold">SuperTransport LLC</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as View)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:translate-x-1'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant={isActive ? 'secondary' : 'default'} className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
        <div className="p-3 border-t">
          <button
            onClick={() => alert('Support contact')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:translate-x-1"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Support</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-64 border-r bg-card z-50 flex flex-col">
            <div className="h-16 flex items-center justify-between px-6 border-b">
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold">SuperTransport LLC</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-3">
              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id as View);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:translate-x-1'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant={isActive ? 'secondary' : 'default'} className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>
            <div className="p-3 border-t">
              <button
                onClick={() => alert('Support contact')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:translate-x-1"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Support</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Acme Logistics Inc.</h1>
              <p className="text-xs text-muted-foreground">Shipper Account</p>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <Button variant="ghost" size="icon" className="relative hover:bg-accent transition-all duration-200 hover:scale-110">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse" />
            </Button>
            <div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={(e) => {
                  setUserMenuOpen(!userMenuOpen);
                }}
                id="user-menu-button"
                className="hover:bg-accent transition-all duration-200 hover:scale-110"
              >
                <User className="w-5 h-5" />
              </Button>
              {userMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 animate-in fade-in duration-200" 
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div 
                    className="fixed w-56 bg-card border rounded-md shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                      top: 'calc(4rem + 0.5rem)',
                      right: '1.5rem'
                    }}
                  >
                    <div className="px-3 py-2 text-sm font-semibold border-b">My Account</div>
                    <button
                      className="w-full flex items-center px-3 py-2 text-sm hover:bg-accent transition-all duration-150 hover:translate-x-1"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </button>
                    <div className="border-t" />
                    <button
                      className="w-full flex items-center px-3 py-2 text-sm hover:bg-accent transition-all duration-150 hover:translate-x-1"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onSignOut();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-secondary/10 transition-opacity duration-300">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}