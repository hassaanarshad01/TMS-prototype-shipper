import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Package,
  MapPin,
  Truck,
  CheckCircle,
  Clock,
  Navigation,
} from 'lucide-react';

export default function Tracking() {
  const [selectedLoadId, setSelectedLoadId] = useState('LD-12042');

  const loads = [
    { id: 'LD-12042', status: 'in-transit', origin: 'Miami, FL', destination: 'Atlanta, GA' },
    { id: 'LD-12041', status: 'dispatched', origin: 'Seattle, WA', destination: 'Portland, OR' },
    { id: 'LD-12040', status: 'delivered', origin: 'Houston, TX', destination: 'Denver, CO' },
  ];

  const trackingEvents = [
    {
      id: 1,
      status: 'dispatched',
      title: 'Load Dispatched',
      description: 'Carrier assigned and en route to pickup location',
      location: 'Miami, FL',
      timestamp: '2026-01-18 08:00 AM',
      completed: true,
    },
    {
      id: 2,
      status: 'picked-up',
      title: 'Cargo Picked Up',
      description: 'Load successfully picked up from origin',
      location: 'Miami, FL',
      timestamp: '2026-01-18 10:30 AM',
      completed: true,
    },
    {
      id: 3,
      status: 'in-transit',
      title: 'In Transit',
      description: 'Shipment currently in transit toward destination',
      location: 'Southern Florida Region',
      timestamp: '2026-01-18 02:45 PM',
      completed: true,
      current: true,
    },
    {
      id: 4,
      status: 'arriving',
      title: 'Arriving Soon',
      description: 'Expected arrival at destination',
      location: 'Atlanta, GA',
      timestamp: '2026-01-20 11:00 AM',
      estimated: true,
      completed: false,
    },
    {
      id: 5,
      status: 'delivered',
      title: 'Delivered',
      description: 'Load delivered and signed for',
      location: 'Atlanta, GA',
      timestamp: 'Pending',
      completed: false,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl mb-2">Shipment Tracking</h2>
        <p className="text-muted-foreground">Real-time tracking of your loads</p>
      </div>

      {/* Load Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Load to Track</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedLoadId} onValueChange={setSelectedLoadId}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {loads.map((load) => (
                <SelectItem key={load.id} value={load.id}>
                  {load.id} - {load.origin} → {load.destination}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Location</CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Navigation className="w-3 h-3 mr-1" />
                In Transit
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300 h-[400px] flex items-center justify-center">
              <div className="text-center space-y-3">
                <MapPin className="w-16 h-16 mx-auto text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Live Map View</h3>
                <p className="text-sm text-blue-600 max-w-md">
                  Shipment location is updated in real time by carrier systems
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>ETA: Jan 20, 2026 at 11:00 AM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipment Handling (No Driver Exposure) */}
        <Card>
          <CardHeader>
            <CardTitle>Shipment Handling</CardTitle>
            <CardDescription>Managed by carrier operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Carrier Assigned</div>
                <div className="text-sm text-muted-foreground">
                  Driver details are managed internally
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              For security, compliance, and contractual reasons, direct driver information is not
              shared with customers.
            </p>

            <Button variant="outline" className="w-full" disabled>
              Contact Carrier Support
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Shipment Timeline</CardTitle>
          <CardDescription>Tracking history and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-8">
              {trackingEvents.map((event) => {
                const Icon =
                  event.status === 'dispatched'
                    ? Package
                    : event.status === 'picked-up'
                    ? CheckCircle
                    : event.status === 'in-transit'
                    ? Truck
                    : event.status === 'arriving'
                    ? Navigation
                    : CheckCircle;

                return (
                  <div key={event.id} className="relative flex gap-6">
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                        event.completed
                          ? 'bg-green-100 text-green-700'
                          : event.current
                          ? 'bg-blue-100 text-blue-700 ring-4 ring-blue-50'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 pb-8">
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
