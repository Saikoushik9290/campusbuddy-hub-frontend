import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, User, LogOut, Newspaper, Phone, Calendar, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [formData, setFormData] = useState({
    newsTitle: '',
    newsContent: '',
    facultyName: '',
    facultyPhone: '',
    facultyDepartment: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (type: string) => {
    // Simulate file upload
    alert(`${type} uploaded successfully!`);
  };

  const handleSubmitNews = () => {
    console.log('Publishing news:', formData);
    alert('News published successfully!');
    setFormData({ ...formData, newsTitle: '', newsContent: '' });
  };

  const handleSubmitFaculty = () => {
    console.log('Adding faculty contact:', formData);
    alert('Faculty contact added successfully!');
    setFormData({ ...formData, facultyName: '', facultyPhone: '', facultyDepartment: '' });
  };

  const tabs = [
    { id: 'news', label: 'Latest News', icon: Newspaper },
    { id: 'faculty', label: 'Faculty Contacts', icon: Phone },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'papers', label: 'Question Papers', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-5 h-5" />
                <span>Welcome, Admin!</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Admin Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          activeTab === tab.id 
                            ? "bg-gradient-to-r from-purple-600 to-blue-600" 
                            : "hover:bg-purple-50"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {tab.label}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'news' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Newspaper className="w-5 h-5 text-blue-600" />
                    <span>Upload Latest News</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="newsTitle">News Title</Label>
                    <Input
                      id="newsTitle"
                      name="newsTitle"
                      placeholder="Enter news title"
                      value={formData.newsTitle}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newsContent">News Content</Label>
                    <Textarea
                      id="newsContent"
                      name="newsContent"
                      placeholder="Enter news content"
                      value={formData.newsContent}
                      onChange={handleInputChange}
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                  <Button 
                    onClick={handleSubmitNews}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Publish News
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'faculty' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span>Upload Faculty Phone Numbers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facultyName">Faculty Name</Label>
                      <Input
                        id="facultyName"
                        name="facultyName"
                        placeholder="Enter faculty name"
                        value={formData.facultyName}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facultyPhone">Phone Number</Label>
                      <Input
                        id="facultyPhone"
                        name="facultyPhone"
                        placeholder="Enter phone number"
                        value={formData.facultyPhone}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facultyDepartment">Department</Label>
                    <Input
                      id="facultyDepartment"
                      name="facultyDepartment"
                      placeholder="Enter department"
                      value={formData.facultyDepartment}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                  <Button 
                    onClick={handleSubmitFaculty}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Add Faculty Contact
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'timetable' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <span>Upload Time Table</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Click to upload timetable image or PDF
                    </p>
                    <Button 
                      onClick={() => handleFileUpload('Timetable')}
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    >
                      Choose File
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    Supported formats: JPG, PNG, PDF (Max size: 10MB)
                  </p>
                </CardContent>
              </Card>
            )}

            {activeTab === 'papers' && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <span>Upload Previous Year Question Papers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Click to upload question papers
                    </p>
                    <Button 
                      onClick={() => handleFileUpload('Question Papers')}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Choose Files
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    Supported formats: PDF, JPG, PNG, PPT (Max size: 25MB per file)
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
