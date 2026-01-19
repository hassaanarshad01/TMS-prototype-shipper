import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function CreateLoad() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Load Details
    originCity: '',
    originState: '',
    destinationCity: '',
    destinationState: '',
    cargoType: '',
    weight: '',
    volume: '',
    pickupDate: '',
    deliveryDate: '',
    specialInstructions: '',
    // Preferences
    contactMethod: 'in-app',
    priorityLevel: 'standard',
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast.success('Load request created successfully!', {
      description: 'Load #12046 has been sent to dispatchers for review.',
    });
    // Reset form
    setCurrentStep(1);
    setFormData({
      originCity: '',
      originState: '',
      destinationCity: '',
      destinationState: '',
      cargoType: '',
      weight: '',
      volume: '',
      pickupDate: '',
      deliveryDate: '',
      specialInstructions: '',
      contactMethod: 'in-app',
      priorityLevel: 'standard',
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl mb-4">Origin & Destination</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="originCity">Origin City</Label>
                  <Input
                    id="originCity"
                    placeholder="Chicago"
                    value={formData.originCity}
                    onChange={(e) =>
                      setFormData({ ...formData, originCity: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originState">Origin State</Label>
                  <Input
                    id="originState"
                    placeholder="IL"
                    value={formData.originState}
                    onChange={(e) =>
                      setFormData({ ...formData, originState: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destinationCity">Destination City</Label>
                  <Input
                    id="destinationCity"
                    placeholder="Dallas"
                    value={formData.destinationCity}
                    onChange={(e) =>
                      setFormData({ ...formData, destinationCity: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destinationState">Destination State</Label>
                  <Input
                    id="destinationState"
                    placeholder="TX"
                    value={formData.destinationState}
                    onChange={(e) =>
                      setFormData({ ...formData, destinationState: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl mb-4">Cargo Information</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cargoType">Cargo Type</Label>
                  <Select
                    value={formData.cargoType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, cargoType: value })
                    }
                  >
                    <SelectTrigger id="cargoType">
                      <SelectValue placeholder="Select cargo type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dry-goods">Dry Goods</SelectItem>
                      <SelectItem value="refrigerated">Refrigerated</SelectItem>
                      <SelectItem value="hazmat">Hazardous Materials</SelectItem>
                      <SelectItem value="oversized">Oversized</SelectItem>
                      <SelectItem value="fragile">Fragile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="5000"
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume (cu ft)</Label>
                    <Input
                      id="volume"
                      type="number"
                      placeholder="200"
                      value={formData.volume}
                      onChange={(e) =>
                        setFormData({ ...formData, volume: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl mb-4">Pickup & Delivery Schedule</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) =>
                      setFormData({ ...formData, pickupDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                placeholder="Enter any special handling requirements, delivery instructions, or other notes..."
                rows={5}
                value={formData.specialInstructions}
                onChange={(e) =>
                  setFormData({ ...formData, specialInstructions: e.target.value })
                }
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl mb-4">Communication Preferences</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contactMethod">Preferred Contact Method</Label>
                  <Select
                    value={formData.contactMethod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, contactMethod: value })
                    }
                  >
                    <SelectTrigger id="contactMethod">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-app">In-App Messaging</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priorityLevel">Priority Level</Label>
                  <Select
                    value={formData.priorityLevel}
                    onValueChange={(value) =>
                      setFormData({ ...formData, priorityLevel: value })
                    }
                  >
                    <SelectTrigger id="priorityLevel">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="expedited">Expedited</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Review Summary */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h4 className="font-semibold">Review Your Load Request</h4>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Route:</span>
                  <span className="font-medium">
                    {formData.originCity}, {formData.originState} →{' '}
                    {formData.destinationCity}, {formData.destinationState}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cargo:</span>
                  <span className="font-medium">{formData.cargoType || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="font-medium">{formData.weight} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pickup:</span>
                  <span className="font-medium">{formData.pickupDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery:</span>
                  <span className="font-medium">{formData.deliveryDate}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">Create Load Request</h2>
        <p className="text-muted-foreground">
          Fill out the details to create a new load request
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>
              Step {currentStep} of {totalSteps}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {currentStep === 1 && 'Load Details'}
              {currentStep === 2 && 'Schedule & Instructions'}
              {currentStep === 3 && 'Preferences & Review'}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-8">
          {renderStep()}

          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep === totalSteps ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Load Request
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
