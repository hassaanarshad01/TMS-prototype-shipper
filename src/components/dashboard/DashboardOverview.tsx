import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  FileText,
  MessageSquare,
} from 'lucide-react';

interface DashboardOverviewProps {
  onNavigate: (view: string) => void;
}

export default function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const stats = [
    {
      title: 'Active Loads',
      value: '12',
      change: '+3 from last week',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending Approval',
      value: '5',
      change: 'Awaiting dispatcher',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'In Transit',
      value: '8',
      change: 'On schedule',
      icon: Truck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Completed',
      value: '147',
      change: 'This month',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Dispatcher approval pending',
      message: 'Load #12045 - 35 minutes left',
      time: '35 min left',
    },
    {
      id: 2,
      type: 'info',
      title: 'Document upload required',
      message: 'Load #12043 - Final documents needed',
      time: '2 hours ago',
    },
    {
      id: 3,
      type: 'success',
      title: 'Load approved and locked',
      message: 'Load #12042 - Ready for dispatch',
      time: '3 hours ago',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'load',
      title: 'Load #12045 created',
      description: 'Chicago, IL → Dallas, TX',
      time: '45 minutes ago',
      icon: Package,
    },
    {
      id: 2,
      type: 'negotiation',
      title: 'Negotiation updated',
      description: 'Load #12044 - Price revised to $2,450',
      time: '1 hour ago',
      icon: MessageSquare,
    },
    {
      id: 3,
      type: 'document',
      title: 'Document approved',
      description: 'Load #12043 - Bill of lading verified',
      time: '2 hours ago',
      icon: FileText,
    },
    {
      id: 4,
      type: 'load',
      title: 'Load #12042 dispatched',
      description: 'Driver assigned - ETA Jan 20',
      time: '3 hours ago',
      icon: Truck,
    },
    {
      id: 5,
      type: 'document',
      title: 'Document rejected',
      description: 'Load #12041 - Please resubmit with corrections',
      time: '4 hours ago',
      icon: AlertCircle,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Overview of your shipments and activities</p>
        </div>
        <Button onClick={() => onNavigate('create-load')}>
          <Package className="w-4 h-4 mr-2" />
          Create New Load
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>Important updates requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div
                  className={`mt-0.5 ${
                    alert.type === 'warning'
                      ? 'text-orange-600'
                      : alert.type === 'success'
                      ? 'text-green-600'
                      : 'text-blue-600'
                  }`}
                >
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{alert.title}</h4>
                    <Badge
                      variant={
                        alert.type === 'warning'
                          ? 'destructive'
                          : alert.type === 'success'
                          ? 'default'
                          : 'secondary'
                      }
                      className="text-xs"
                    >
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => onNavigate('active-loads')}>
              View All Loads
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center gap-2 py-6"
              onClick={() => onNavigate('create-load')}
            >
              <Package className="w-6 h-6" />
              <span className="text-sm">Create Load</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center gap-2 py-6"
              onClick={() => onNavigate('negotiations')}
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm">Negotiations</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center gap-2 py-6"
              onClick={() => onNavigate('tracking')}
            >
              <Truck className="w-6 h-6" />
              <span className="text-sm">Track Shipment</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center gap-2 py-6"
              onClick={() => onNavigate('documents')}
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm">Documents</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
