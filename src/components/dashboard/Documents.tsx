import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Upload, FileText, Download, Eye, CheckCircle, XCircle, Clock, Scan } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function Documents() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ocrData, setOcrData] = useState({
    loadId: 'LD-12045',
    origin: 'Chicago, IL',
    destination: 'Dallas, TX',
    weight: '5,000 lbs',
    date: '2026-01-20',
  });

  const documents = [
    {
      id: 'DOC-1001',
      loadId: 'LD-12045',
      type: 'Invoice',
      uploadDate: '2026-01-18',
      status: 'pending',
      uploadedBy: 'You',
    },
    {
      id: 'DOC-1002',
      loadId: 'LD-12044',
      type: 'Invoice',
      uploadDate: '2026-01-17',
      status: 'approved',
      uploadedBy: 'You',
    },
    {
      id: 'DOC-1003',
      loadId: 'LD-12043',
      type: 'Bill of Lading',
      uploadDate: '2026-01-16',
      status: 'rejected',
      uploadedBy: 'You',
      rejectionReason: 'Missing signature',
    },
    {
      id: 'DOC-1004',
      loadId: 'LD-12042',
      type: 'Invoice',
      uploadDate: '2026-01-15',
      status: 'approved',
      uploadedBy: 'You',
    },
    {
      id: 'DOC-1005',
      loadId: 'LD-12041',
      type: 'Invoice',
      uploadDate: '2026-01-14',
      status: 'approved',
      uploadedBy: 'You',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success('File selected', {
        description: 'OCR processing will begin after submission.',
      });
    }
  };

  const handleSubmitDocument = () => {
    if (selectedFile) {
      toast.success('Document submitted for approval', {
        description: 'Dispatcher will review within 1 hour.',
      });
      setSelectedFile(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2">Documents</h2>
          <p className="text-muted-foreground">
            Upload and manage shipping documents with OCR support
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Load Document</DialogTitle>
              <DialogDescription>
                Upload a PDF or image. Our OCR will extract data automatically.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="upload" className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload File</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              </TabsList>
              <TabsContent value="upload" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="document">Document File</Label>
                  <Input
                    id="document"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                  <p className="text-sm text-muted-foreground">
                    Supported formats: PDF, JPG, PNG (Max 10MB)
                  </p>
                </div>

                {selectedFile && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Scan className="w-5 h-5 text-blue-600" />
                        <CardTitle className="text-base">OCR Preview</CardTitle>
                      </div>
                      <CardDescription>
                        Extracted data - Please verify accuracy
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ocrLoadId">Load ID</Label>
                          <Input
                            id="ocrLoadId"
                            value={ocrData.loadId}
                            onChange={(e) =>
                              setOcrData({ ...ocrData, loadId: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ocrDate">Date</Label>
                          <Input
                            id="ocrDate"
                            type="date"
                            value={ocrData.date}
                            onChange={(e) =>
                              setOcrData({ ...ocrData, date: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ocrOrigin">Origin</Label>
                          <Input
                            id="ocrOrigin"
                            value={ocrData.origin}
                            onChange={(e) =>
                              setOcrData({ ...ocrData, origin: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ocrDestination">Destination</Label>
                          <Input
                            id="ocrDestination"
                            value={ocrData.destination}
                            onChange={(e) =>
                              setOcrData({ ...ocrData, destination: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ocrWeight">Weight</Label>
                          <Input
                            id="ocrWeight"
                            value={ocrData.weight}
                            onChange={(e) =>
                              setOcrData({ ...ocrData, weight: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <Label htmlFor="docType">Document Type</Label>
                  <Select>
                    <SelectTrigger id="docType">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bol">Bill of Lading</SelectItem>
                      <SelectItem value="pod">Proof of Delivery</SelectItem>
                      <SelectItem value="invoice">Invoice</SelectItem>
                      <SelectItem value="packing">Packing List</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full"
                  onClick={handleSubmitDocument}
                  disabled={!selectedFile}
                >
                  Send to Dispatcher for Approval
                </Button>
              </TabsContent>
              <TabsContent value="manual" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manualLoadId">Load ID</Label>
                    <Input id="manualLoadId" placeholder="LD-12045" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manualDocType">Document Type</Label>
                    <Select>
                      <SelectTrigger id="manualDocType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bol">Bill of Lading</SelectItem>
                        <SelectItem value="pod">Proof of Delivery</SelectItem>
                        <SelectItem value="invoice">Invoice</SelectItem>
                        <SelectItem value="packing">Packing List</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manualOrigin">Origin</Label>
                    <Input id="manualOrigin" placeholder="Chicago, IL" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manualDestination">Destination</Label>
                    <Input id="manualDestination" placeholder="Dallas, TX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manualWeight">Weight</Label>
                    <Input id="manualWeight" placeholder="5,000 lbs" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manualDate">Date</Label>
                    <Input id="manualDate" type="date" />
                  </div>
                </div>
                <Button className="w-full" onClick={handleSubmitDocument}>
                  Submit Document
                </Button>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Document History</CardTitle>
          <CardDescription>All uploaded documents and their approval status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document ID</TableHead>
                  <TableHead>Load ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.id}</TableCell>
                    <TableCell>{doc.loadId}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>
                      {getStatusBadge(doc.status)}
                      {doc.status === 'rejected' && doc.rejectionReason && (
                        <div className="text-xs text-destructive mt-1">
                          {doc.rejectionReason}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" title="View">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Download">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
