import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Search, Eye, MessageSquare, MapPin, Filter } from 'lucide-react';

interface ActiveLoadsProps {
  onNavigate: (view: string) => void;
}

export default function ActiveLoads({ onNavigate }: ActiveLoadsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loads = [
    {
      id: 'LD-12045',
      origin: 'Chicago, IL',
      destination: 'Dallas, TX',
      cargo: 'Dry Goods',
      weight: '5,000 lbs',
      pickupDate: '2026-01-20',
      deliveryDate: '2026-01-23',
      status: 'pending-approval',
      price: '$2,300',
      dispatcher: 'John Smith',
    },
    {
      id: 'LD-12044',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      cargo: 'Refrigerated',
      weight: '8,500 lbs',
      pickupDate: '2026-01-21',
      deliveryDate: '2026-01-22',
      status: 'negotiation',
      price: '$1,850',
      dispatcher: 'Sarah Johnson',
    },
    {
      id: 'LD-12043',
      origin: 'New York, NY',
      destination: 'Boston, MA',
      cargo: 'Fragile',
      weight: '3,200 lbs',
      pickupDate: '2026-01-19',
      deliveryDate: '2026-01-20',
      status: 'document-pending',
      price: '$950',
      dispatcher: 'Mike Davis',
    },
    {
      id: 'LD-12042',
      origin: 'Miami, FL',
      destination: 'Atlanta, GA',
      cargo: 'Dry Goods',
      weight: '6,700 lbs',
      pickupDate: '2026-01-18',
      deliveryDate: '2026-01-20',
      status: 'in-transit',
      price: '$1,650',
      dispatcher: 'Emily Brown',
    },
    {
      id: 'LD-12041',
      origin: 'Seattle, WA',
      destination: 'Portland, OR',
      cargo: 'Electronics',
      weight: '4,100 lbs',
      pickupDate: '2026-01-22',
      deliveryDate: '2026-01-23',
      status: 'locked',
      price: '$750',
      dispatcher: 'David Wilson',
    },
    {
      id: 'LD-12040',
      origin: 'Houston, TX',
      destination: 'Denver, CO',
      cargo: 'Oversized',
      weight: '12,000 lbs',
      pickupDate: '2026-01-25',
      deliveryDate: '2026-01-28',
      status: 'negotiation',
      price: '$3,200',
      dispatcher: 'Lisa Anderson',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending-approval':
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            Pending Approval
          </Badge>
        );
      case 'negotiation':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            In Negotiation
          </Badge>
        );
      case 'document-pending':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            Document Pending
          </Badge>
        );
      case 'locked':
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            Locked
          </Badge>
        );
      case 'in-transit':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            In Transit
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredLoads = loads.filter((load) => {
    const matchesSearch =
      load.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      load.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || load.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl mb-2">Active Loads</h2>
        <p className="text-muted-foreground">Manage and monitor your shipments</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by load ID, origin, or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending-approval">Pending Approval</SelectItem>
                  <SelectItem value="negotiation">In Negotiation</SelectItem>
                  <SelectItem value="document-pending">Document Pending</SelectItem>
                  <SelectItem value="locked">Locked</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Load ID</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Pickup Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoads.length > 0 ? (
                  filteredLoads.map((load) => (
                    <TableRow key={load.id}>
                      <TableCell className="font-medium">{load.id}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{load.origin}</div>
                          <div className="text-muted-foreground">→ {load.destination}</div>
                        </div>
                      </TableCell>
                      <TableCell>{load.cargo}</TableCell>
                      <TableCell>{load.weight}</TableCell>
                      <TableCell>{load.pickupDate}</TableCell>
                      <TableCell>{getStatusBadge(load.status)}</TableCell>
                      <TableCell className="font-semibold">{load.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View details"
                            onClick={() => onNavigate('tracking')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {(load.status === 'negotiation' ||
                            load.status === 'pending-approval') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Negotiate"
                              onClick={() => onNavigate('negotiations')}
                            >
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          )}
                          {load.status === 'in-transit' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Track"
                              onClick={() => onNavigate('tracking')}
                            >
                              <MapPin className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                      No loads found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Showing {filteredLoads.length} of {loads.length} loads
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
