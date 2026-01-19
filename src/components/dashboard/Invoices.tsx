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
import { Search, Download, Eye, FileText, Calendar, DollarSign } from 'lucide-react';

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const invoices = [
    {
      id: 'INV-2026-0015',
      loadId: 'LD-12042',
      date: '2026-01-18',
      dueDate: '2026-02-17',
      amount: '$1,650.00',
      status: 'paid',
      paidDate: '2026-01-20',
    },
    {
      id: 'INV-2026-0014',
      loadId: 'LD-12041',
      date: '2026-01-17',
      dueDate: '2026-02-16',
      amount: '$750.00',
      status: 'sent',
      paidDate: null,
    },
    {
      id: 'INV-2026-0013',
      loadId: 'LD-12040',
      date: '2026-01-16',
      dueDate: '2026-02-15',
      amount: '$3,200.00',
      status: 'paid',
      paidDate: '2026-01-18',
    },
    {
      id: 'INV-2026-0012',
      loadId: 'LD-12039',
      date: '2026-01-15',
      dueDate: '2026-02-14',
      amount: '$2,100.00',
      status: 'overdue',
      paidDate: null,
    },
    {
      id: 'INV-2026-0011',
      loadId: 'LD-12038',
      date: '2026-01-14',
      dueDate: '2026-02-13',
      amount: '$1,450.00',
      status: 'paid',
      paidDate: '2026-01-16',
    },
    {
      id: 'INV-2026-0010',
      loadId: 'LD-12037',
      date: '2026-01-13',
      dueDate: '2026-02-12',
      amount: '$890.00',
      status: 'sent',
      paidDate: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Paid
          </Badge>
        );
      case 'sent':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            Sent
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            Overdue
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            Draft
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.loadId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredInvoices.reduce(
    (sum, inv) => sum + parseFloat(inv.amount.replace('$', '').replace(',', '')),
    0
  );

  const paidAmount = filteredInvoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '').replace(',', '')), 0);

  const pendingAmount = totalAmount - paidAmount;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl mb-2">Invoices</h2>
        <p className="text-muted-foreground">View and download your shipment invoices</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Invoiced
            </CardTitle>
            <DollarSign className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredInvoices.length} invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Paid Amount
            </CardTitle>
            <DollarSign className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">
              ${paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredInvoices.filter((inv) => inv.status === 'paid').length} invoices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Amount
            </CardTitle>
            <DollarSign className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-orange-600">
              ${pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {filteredInvoices.filter((inv) => inv.status !== 'paid').length} invoices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice ID or load ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
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
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Load ID</TableHead>
                  <TableHead>Invoice Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.loadId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {invoice.date}
                        </div>
                      </TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="font-semibold">{invoice.amount}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {invoice.paidDate || '—'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" title="View invoice">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Download PDF">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                      No invoices found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Showing {filteredInvoices.length} of {invoices.length} invoices
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

      {/* Info Note */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-base">Read-Only Access</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-900">
            As a shipper, you have read-only access to invoices. For payment-related inquiries,
            please contact your carrier's billing department or use your organization's payment
            system.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
