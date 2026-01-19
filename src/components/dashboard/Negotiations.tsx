import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Send, User, Package, MapPin, Clock, DollarSign, CheckCircle, X } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner@2.0.3';

export default function Negotiations() {
  const [selectedLoadId, setSelectedLoadId] = useState('LD-12044');
  const [message, setMessage] = useState('');

  const activeNegotiations = [
    {
      id: 'LD-12044',
      origin: 'Los Angeles, CA',
      destination: 'Phoenix, AZ',
      currentPrice: '$1,850',
      lastMessage: 'Counter offer: $1,850',
      unread: 2,
      status: 'active',
    },
    {
      id: 'LD-12045',
      origin: 'Chicago, IL',
      destination: 'Dallas, TX',
      currentPrice: '$2,300',
      lastMessage: 'Waiting for your response',
      unread: 1,
      status: 'pending',
    },
    {
      id: 'LD-12043',
      origin: 'New York, NY',
      destination: 'Boston, MA',
      currentPrice: '$950',
      lastMessage: 'Price accepted',
      unread: 0,
      status: 'accepted',
    },
  ];

  const currentLoad = activeNegotiations.find((load) => load.id === selectedLoadId) || activeNegotiations[0];

  const negotiationHistory = [
    {
      id: 1,
      sender: 'dispatcher',
      name: 'Sarah Johnson',
      message: 'Initial quote for the route is $2,100',
      timestamp: '2026-01-18 10:30 AM',
      type: 'message',
    },
    {
      id: 2,
      sender: 'shipper',
      name: 'You',
      message: 'Can we negotiate down to $1,800?',
      timestamp: '2026-01-18 11:15 AM',
      type: 'message',
    },
    {
      id: 3,
      sender: 'dispatcher',
      name: 'Sarah Johnson',
      message: 'I understand your budget constraints. How about we meet in the middle at $1,950?',
      timestamp: '2026-01-18 02:45 PM',
      type: 'message',
    },
    {
      id: 4,
      sender: 'system',
      message: 'Counter offer: $1,950',
      timestamp: '2026-01-18 02:45 PM',
      type: 'price-update',
      price: '$1,950',
    },
    {
      id: 5,
      sender: 'shipper',
      name: 'You',
      message: 'That still seems high. Can you do $1,850?',
      timestamp: '2026-01-18 03:20 PM',
      type: 'message',
    },
    {
      id: 6,
      sender: 'dispatcher',
      name: 'Sarah Johnson',
      message: 'Alright, I can agree to $1,850 for this shipment. Deal?',
      timestamp: '2026-01-18 04:10 PM',
      type: 'message',
    },
    {
      id: 7,
      sender: 'system',
      message: 'Final offer: $1,850',
      timestamp: '2026-01-18 04:10 PM',
      type: 'price-update',
      price: '$1,850',
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      toast.success('Message sent successfully');
      setMessage('');
    }
  };

  const handleAcceptOffer = () => {
    toast.success('Offer accepted!', {
      description: 'Load has been locked and ready for documentation.',
    });
  };

  const handleRejectOffer = () => {
    toast.info('Offer rejected', {
      description: 'You can continue negotiating.',
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl mb-2">Negotiations</h2>
        <p className="text-muted-foreground">Communicate with dispatchers about pricing and terms</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Negotiations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Active Negotiations</CardTitle>
            <CardDescription>{activeNegotiations.length} ongoing discussions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {activeNegotiations.map((load) => (
                <button
                  key={load.id}
                  onClick={() => setSelectedLoadId(load.id)}
                  className={`w-full text-left p-4 hover:bg-accent transition-colors ${
                    selectedLoadId === load.id ? 'bg-accent' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold">{load.id}</div>
                    {load.unread > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {load.unread}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {load.origin} → {load.destination}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{load.currentPrice}</span>
                    {load.status === 'accepted' && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        Accepted
                      </Badge>
                    )}
                    {load.status === 'pending' && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{load.lastMessage}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Negotiation Thread */}
        <div className="lg:col-span-2 space-y-6">
          {/* Load Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{currentLoad.id}</CardTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  In Negotiation
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Route:</span>
                  <span className="font-medium">
                    {currentLoad.origin} → {currentLoad.destination}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Current Offer:</span>
                  <span className="font-semibold text-lg">{currentLoad.currentPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Message Thread */}
          <Card>
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
              <CardDescription>Negotiate pricing and logistics details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {negotiationHistory.map((item) => {
                    if (item.type === 'price-update') {
                      return (
                        <div key={item.id} className="flex justify-center">
                          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            {item.message}: <span className="font-semibold">{item.price}</span>
                          </div>
                        </div>
                      );
                    }

                    const isShipper = item.sender === 'shipper';
                    return (
                      <div
                        key={item.id}
                        className={`flex gap-3 ${isShipper ? 'flex-row-reverse' : ''}`}
                      >
                        <Avatar className="flex-shrink-0">
                          <AvatarFallback className={isShipper ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
                            {isShipper ? 'Y' : item.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`flex-1 ${isShipper ? 'text-right' : ''}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{item.name}</span>
                            <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                          </div>
                          <div
                            className={`inline-block rounded-lg px-4 py-2 ${
                              isShipper
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            {item.message}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              {/* Action Buttons */}
              {currentLoad.status === 'active' && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleRejectOffer}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject Offer
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleAcceptOffer}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept $1,850
                  </Button>
                </div>
              )}

              {/* Message Input */}
              <div className="flex gap-3">
                <Textarea
                  placeholder="Type your message or counter offer..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
