import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download, TrendingUp, TrendingDown, Package, DollarSign, Clock, CheckCircle } from 'lucide-react';

export default function Analytics() {
  const loadsPerMonth = [
    { month: 'Aug', loads: 42, completed: 38, pending: 4 },
    { month: 'Sep', loads: 51, completed: 48, pending: 3 },
    { month: 'Oct', loads: 48, completed: 45, pending: 3 },
    { month: 'Nov', loads: 56, completed: 52, pending: 4 },
    { month: 'Dec', loads: 62, completed: 58, pending: 4 },
    { month: 'Jan', loads: 68, completed: 60, pending: 8 },
  ];

  const costTrends = [
    { month: 'Aug', avgCost: 1850, totalCost: 77700 },
    { month: 'Sep', avgCost: 1920, totalCost: 97920 },
    { month: 'Oct', avgCost: 1880, totalCost: 90240 },
    { month: 'Nov', avgCost: 1950, totalCost: 109200 },
    { month: 'Dec', avgCost: 2010, totalCost: 124620 },
    { month: 'Jan', avgCost: 1990, totalCost: 135320 },
  ];

  const deliveryPerformance = [
    { name: 'On Time', value: 85, color: '#10b981' },
    { name: 'Delayed', value: 12, color: '#f59e0b' },
    { name: 'Early', value: 3, color: '#3b82f6' },
  ];

  const cargoTypes = [
    { name: 'Dry Goods', loads: 45, percentage: 45 },
    { name: 'Refrigerated', loads: 28, percentage: 28 },
    { name: 'Fragile', loads: 15, percentage: 15 },
    { name: 'Oversized', loads: 8, percentage: 8 },
    { name: 'Hazmat', loads: 4, percentage: 4 },
  ];

  const topRoutes = [
    { route: 'Chicago, IL → Dallas, TX', loads: 18, avgCost: '$2,300' },
    { route: 'Los Angeles, CA → Phoenix, AZ', loads: 15, avgCost: '$1,850' },
    { route: 'New York, NY → Boston, MA', loads: 12, avgCost: '$950' },
    { route: 'Miami, FL → Atlanta, GA', loads: 10, avgCost: '$1,650' },
    { route: 'Seattle, WA → Portland, OR', loads: 9, avgCost: '$750' },
  ];

  const kpis = [
    {
      title: 'Total Loads',
      value: '147',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Spending',
      value: '$292,450',
      change: '+8.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Avg Cost per Load',
      value: '$1,990',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'On-Time Delivery',
      value: '85%',
      change: '+3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl mb-2">Analytics & Reports</h2>
          <p className="text-muted-foreground">
            Comprehensive insights into your shipping operations
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendIcon className={`w-3 h-3 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  {kpi.change} from last period
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="loads" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="loads">Loads Overview</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="routes">Top Routes</TabsTrigger>
        </TabsList>

        <TabsContent value="loads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loads Per Month</CardTitle>
              <CardDescription>Monthly load volume and completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={loadsPerMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cargo Types Distribution</CardTitle>
                <CardDescription>Load breakdown by cargo type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cargoTypes.map((type, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium">{type.name}</span>
                        <span className="text-muted-foreground">
                          {type.loads} loads ({type.percentage}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${type.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
                <CardDescription>On-time delivery rate analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={deliveryPerformance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deliveryPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs">
          <Card>
            <CardHeader>
              <CardTitle>Cost Trends</CardTitle>
              <CardDescription>Average and total shipping costs over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={costTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="avgCost"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Avg Cost per Load"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="totalCost"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Total Monthly Cost"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Performance Breakdown</CardTitle>
                <CardDescription>Detailed delivery statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {deliveryPerformance.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span className="text-2xl font-semibold">{item.value}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Average Transit Time</span>
                  <span className="text-xl font-semibold">2.3 days</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">On-Time Pickup Rate</span>
                  <span className="text-xl font-semibold">92%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Document Approval Rate</span>
                  <span className="text-xl font-semibold">96%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-muted-foreground">Successful Negotiations</span>
                  <span className="text-xl font-semibold">88%</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Customer Satisfaction</span>
                  <span className="text-xl font-semibold">4.7/5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="routes">
          <Card>
            <CardHeader>
              <CardTitle>Top Routes</CardTitle>
              <CardDescription>Most frequently used shipping routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRoutes.map((route, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{route.route}</div>
                      <div className="text-sm text-muted-foreground">{route.loads} loads</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Avg Cost</div>
                      <div className="font-semibold">{route.avgCost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
