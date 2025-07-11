
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bell, Calendar, Download, MessageCircle, User, LogOut, Send, Clock, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Hello! I\'m your CampusBuddy assistant. How can I help you today?' }
  ]);

  const notifications = [
    { id: 1, title: 'Assignment Due Tomorrow', message: 'Your Math assignment is due tomorrow at 11:59 PM', time: '2 hours ago', type: 'urgent' },
    { id: 2, title: 'New Faculty Contact Added', message: 'Dr. Smith\'s contact information has been updated', time: '4 hours ago', type: 'info' },
    { id: 3, title: 'Exam Schedule Released', message: 'Mid-semester exam schedule is now available', time: '1 day ago', type: 'info' }
  ];

  const timetable = [
    { time: '9:00 AM', subject: 'Mathematics', room: 'Room 101', instructor: 'Dr. Johnson' },
    { time: '11:00 AM', subject: 'Physics', room: 'Room 205', instructor: 'Prof. Williams' },
    { time: '2:00 PM', subject: 'Chemistry', room: 'Lab A', instructor: 'Dr. Brown' },
    { time: '4:00 PM', subject: 'English', room: 'Room 301', instructor: 'Ms. Davis' }
  ];

  const previousPapers = [
    { subject: 'Mathematics', year: '2023', type: 'PDF', size: '2.5 MB' },
    { subject: 'Physics', year: '2023', type: 'PDF', size: '3.1 MB' },
    { subject: 'Chemistry', year: '2022', type: 'PDF', size: '2.8 MB' },
    { subject: 'English', year: '2023', type: 'PDF', size: '1.9 MB' }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatHistory(prev => [...prev, { type: 'user', message: chatMessage }]);
    setChatMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        message: 'I understand your query. For detailed assistance, please contact your faculty or check the announcements section.' 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Student Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-5 h-5" />
                <span>Welcome, Student!</span>
              </div>
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Notifications */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <span>Recent Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                        notification.type === 'urgent' 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timetable */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span>Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timetable.map((class_item, index) => (
                    <div key={index} className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{class_item.subject}</h3>
                          <span className="text-sm font-medium text-green-600">{class_item.time}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {class_item.room} • {class_item.instructor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Previous Year Papers */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span>Previous Year Question Papers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previousPapers.map((paper, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">{paper.subject}</h3>
                          <p className="text-sm text-gray-600">Year: {paper.year}</p>
                          <p className="text-sm text-gray-500">{paper.type} • {paper.size}</p>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chatbot Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span>CampusBuddy Assistant</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {chatHistory.map((chat, index) => (
                    <div 
                      key={index}
                      className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs p-3 rounded-lg ${
                          chat.type === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {chat.message}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
