import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Todo } from "@/components/TodoApp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data - in a real app, this would come from a database or localStorage
const generateMockData = (days: number = 30) => {
  const data: Todo[] = [];
  const now = new Date();
  
  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * days);
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    
    // Create a proper date object
    const createdAt = new Date(now);
    createdAt.setDate(now.getDate() - daysAgo);
    createdAt.setHours(hours, minutes, 0, 0);
    
    data.push({
      id: `task-${i}`,
      text: `Task ${i}`,
      completed: Math.random() > 0.4,
      createdAt
    });
  }
  
  return data;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Analytics = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [timeRange, setTimeRange] = useState<'7' | '14' | '30' | '90'>('30');

  useEffect(() => {
    // In a real app, you would fetch this data from an API or localStorage
    const data = generateMockData(parseInt(timeRange));
    console.log("Generated mock data:", data.length, "todos");
    setTodos(data);
  }, [timeRange]);

  // Process data for daily completion chart
  const dailyCompletionData = React.useMemo(() => {
    const daysMap = new Map<string, { date: string; completed: number; total: number }>();
    
    const timeRangeNum = parseInt(timeRange);
    const now = new Date();
    
    // Initialize all days in the range
    for (let i = 0; i < timeRangeNum; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      daysMap.set(dateStr, { date: dateStr, completed: 0, total: 0 });
    }
    
    // Populate with actual data
    todos.forEach(todo => {
      const dateStr = todo.createdAt.toISOString().split('T')[0];
      if (daysMap.has(dateStr)) {
        const dayData = daysMap.get(dateStr)!;
        dayData.total += 1;
        if (todo.completed) {
          dayData.completed += 1;
        }
        daysMap.set(dateStr, dayData);
      }
    });
    
    // Convert to array and sort by date
    return Array.from(daysMap.values())
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(item => ({
        ...item,
        completionRate: item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0,
      }));
  }, [todos, timeRange]);

  // Process data for weekday completion chart
  const weekdayData = React.useMemo(() => {
    const weekdayMap = new Map<number, { name: string; completed: number; total: number }>();
    
    // Initialize all days of the week
    for (let i = 0; i < 7; i++) {
      weekdayMap.set(i, { name: DAYS_OF_WEEK[i], completed: 0, total: 0 });
    }
    
    // Populate with actual data
    todos.forEach(todo => {
      const dayOfWeek = todo.createdAt.getDay();
      const dayData = weekdayMap.get(dayOfWeek)!;
      dayData.total += 1;
      if (todo.completed) {
        dayData.completed += 1;
      }
      weekdayMap.set(dayOfWeek, dayData);
    });
    
    // Convert to array
    return Array.from(weekdayMap.values())
      .map(item => ({
        ...item,
        completionRate: item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0,
      }));
  }, [todos]);

  // Calculate summary statistics
  const completedTasks = todos.filter(todo => todo.completed).length;
  const totalTasks = todos.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Data for completion status pie chart
  const statusData = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: totalTasks - completedTasks },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Task Analytics Dashboard
        </h1>
        
        {/* Time range selector */}
        <div className="flex justify-end mb-6">
          <Select
            value={timeRange}
            onValueChange={(value: '7' | '14' | '30' | '90') => setTimeRange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card key="total-tasks" className="shadow-md border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalTasks}</p>
            </CardContent>
          </Card>
          
          <Card key="completed-tasks" className="shadow-md border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Completed Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{completedTasks}</p>
            </CardContent>
          </Card>
          
          <Card key="completion-rate" className="shadow-md border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{completionRate}%</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="daily">Daily Completion</TabsTrigger>
            <TabsTrigger value="weekday">Weekday Analysis</TabsTrigger>
            <TabsTrigger value="status">Completion Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Daily Task Completion</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailyCompletionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      }}
                    />
                    <YAxis yAxisId={0} />
                    <YAxis yAxisId={1} orientation="right" domain={[0, 100]} />
                    <RechartsTooltip
                      formatter={(value, name) => {
                        if (name === 'completionRate') return [`${value}%`, 'Completion Rate'];
                        return [value, name === 'completed' ? 'Completed' : 'Total'];
                      }}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name="Total Tasks"
                      yAxisId={0}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#82ca9d" 
                      name="Completed Tasks"
                      yAxisId={0}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completionRate" 
                      stroke="#ff7300" 
                      name="Completion Rate (%)" 
                      yAxisId={1}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="weekday">
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Task Completion by Day of Week</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weekdayData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip 
                      formatter={(value, name) => {
                        if (name === 'completionRate') return [`${value}%`, 'Completion Rate'];
                        return [value, name === 'completed' ? 'Completed' : 'Total'];
                      }}
                    />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" name="Total Tasks" />
                    <Bar dataKey="completed" fill="#82ca9d" name="Completed Tasks" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="status">
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Task Completion Status</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value, name) => [value, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Productivity insights */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle>Productivity Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completionRate > 70 ? (
                <p className="text-green-600 dark:text-green-400">
                  Great job! Your task completion rate is excellent at {completionRate}%.
                </p>
              ) : completionRate > 40 ? (
                <p className="text-yellow-600 dark:text-yellow-400">
                  You're making progress with a {completionRate}% completion rate. Keep it up!
                </p>
              ) : (
                <p className="text-red-600 dark:text-red-400">
                  Your task completion rate is {completionRate}%. Consider breaking tasks into smaller steps.
                </p>
              )}
              
              {weekdayData.length > 0 && (
                <>
                  <p>
                    <span className="font-semibold">Most productive day:</span>{" "}
                    {weekdayData
                      .filter(day => day.total > 0)
                      .reduce((prev, current) => 
                        (prev.completionRate > current.completionRate) ? prev : current,
                        weekdayData[0]
                      ).name}
                  </p>
                  
                  <p>
                    <span className="font-semibold">Least productive day:</span>{" "}
                    {weekdayData
                      .filter(day => day.total > 0)
                      .reduce((prev, current) => 
                        (prev.completionRate < current.completionRate) ? prev : current,
                        weekdayData[0]
                      ).name}
                  </p>
                </>
              )}
              
              <p>
                <span className="font-semibold">Tip:</span> Based on your patterns, consider scheduling important tasks for your most productive days.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
