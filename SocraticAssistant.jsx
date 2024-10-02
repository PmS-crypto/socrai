import React, { useState } from 'react';
import { MessageSquare, Code, Play, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const initialCode = `def bubble_sort(arr):
    n = len(arr)
    # Add your sorting logic here
    return arr

# Test the function
test_array = [64, 34, 25, 12, 22, 11, 90]
sorted_array = bubble_sort(test_array)
print(sorted_array)`;

export default function SocraticAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your DSA teaching assistant. Let's learn about sorting algorithms together. Would you like to start with Bubble Sort?" }
  ]);
  const [code, setCode] = useState(initialCode);
  
  return (
    <div className="flex flex-col h-screen max-h-[600px] p-4 gap-4">
      <div className="flex gap-4 h-full">
        {/* Left Panel - Chat Interface */}
        <Card className="w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Discussion
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto bg-gray-50 p-4 rounded-md">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'assistant' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input 
                className="flex-1 p-2 border rounded-md"
                placeholder="Type your response..."
              />
              <Button>Send</Button>
            </div>
          </div>
        </Card>

        {/* Right Panel - Code Editor and Visualization */}
        <Card className="w-1/2 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Code Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <div className="flex-1 bg-gray-900 text-white p-4 rounded-md font-mono overflow-y-auto">
              <pre>{code}</pre>
            </div>
            <div className="flex gap-2">
              <Button className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Run Code
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visualization Area */}
      <Card className="h-1/3">
        <CardHeader>
          <CardTitle>Algorithm Visualization</CardTitle>
        </CardHeader>
        <CardContent className="h-full bg-gray-50 rounded-md">
          {/* Visualization will be implemented here */}
          <div className="flex items-center justify-center h-full text-gray-500">
            Algorithm visualization will appear here during sorting...
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
