import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, User, LogOut, Newspaper, Phone, Calendar, FileText, Shield, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('academic');
  const [formData, setFormData] = useState({
    newsTitle: '',
    newsContent: '',
    facultyName: '',
    facultyPhone: '',
    facultyDepartment: ''
  });
  
  // Academic data management state
  const [academicForm, setAcademicForm] = useState({
    branch: '',
    year: '',
    section: '',
    hodName: '',
    timetableUrl: ''
  });
  const [pyqForm, setPyqForm] = useState({
    branch: '',
    year: '',
    section: '',
    subjectName: '',
    paperUrl: '',
    paperYear: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const branches = ['IT', 'CSE', 'CSD', 'CSM', 'MECH', 'CIVIL', 'EEE', 'ECE'];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const sections = ['A', 'B', 'C'];

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

  const handleAcademicInputChange = (field: string, value: string) => {
    setAcademicForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePyqInputChange = (field: string, value: string) => {
    setPyqForm(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateAcademicData = async () => {
    if (!academicForm.branch || !academicForm.year || !academicForm.section || !academicForm.hodName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('academic_data')
        .upsert({
          branch: academicForm.branch,
          year: academicForm.year,
          section: academicForm.section,
          hod_name: academicForm.hodName,
          timetable_url: academicForm.timetableUrl || null
        }, {
          onConflict: 'branch,year,section'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Academic data updated successfully"
      });
      
      setAcademicForm({
        branch: '',
        year: '',
        section: '',
        hodName: '',
        timetableUrl: ''
      });
    } catch (error) {
      console.error('Error updating academic data:', error);
      toast({
        title: "Error",
        description: "Failed to update academic data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddPyq = async () => {
    if (!pyqForm.branch || !pyqForm.year || !pyqForm.section || !pyqForm.subjectName || !pyqForm.paperUrl || !pyqForm.paperYear) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('pyqs')
        .insert({
          branch: pyqForm.branch,
          year: pyqForm.year,
          section: pyqForm.section,
          subject_name: pyqForm.subjectName,
          paper_url: pyqForm.paperUrl,
          paper_year: pyqForm.paperYear
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "PYQ added successfully"
      });
      
      setPyqForm({
        branch: '',
        year: '',
        section: '',
        subjectName: '',
        paperUrl: '',
        paperYear: ''
      });
    } catch (error) {
      console.error('Error adding PYQ:', error);
      toast({
        title: "Error",
        description: "Failed to add PYQ",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'academic', label: 'Academic Data', icon: GraduationCap },
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
            {activeTab === 'academic' && (
              <div className="space-y-8">
                {/* Academic Data Management */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                      <span>Update Academic Data</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Branch</Label>
                        <Select value={academicForm.branch} onValueChange={(value) => handleAcademicInputChange('branch', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Branch" />
                          </SelectTrigger>
                          <SelectContent>
                            {branches.map((branch) => (
                              <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Year</Label>
                        <Select value={academicForm.year} onValueChange={(value) => handleAcademicInputChange('year', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Section</Label>
                        <Select value={academicForm.section} onValueChange={(value) => handleAcademicInputChange('section', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Section" />
                          </SelectTrigger>
                          <SelectContent>
                            {sections.map((section) => (
                              <SelectItem key={section} value={section}>{section}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>HOD Name</Label>
                      <Input
                        placeholder="Enter HOD name"
                        value={academicForm.hodName}
                        onChange={(e) => handleAcademicInputChange('hodName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Timetable URL (Optional)</Label>
                      <Input
                        placeholder="Enter timetable URL or file link"
                        value={academicForm.timetableUrl}
                        onChange={(e) => handleAcademicInputChange('timetableUrl', e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={handleUpdateAcademicData}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {loading ? 'Updating...' : 'Update Academic Data'}
                    </Button>
                  </CardContent>
                </Card>

                {/* PYQ Management */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <span>Add Previous Year Question Paper</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Branch</Label>
                        <Select value={pyqForm.branch} onValueChange={(value) => handlePyqInputChange('branch', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Branch" />
                          </SelectTrigger>
                          <SelectContent>
                            {branches.map((branch) => (
                              <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Year</Label>
                        <Select value={pyqForm.year} onValueChange={(value) => handlePyqInputChange('year', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Section</Label>
                        <Select value={pyqForm.section} onValueChange={(value) => handlePyqInputChange('section', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Section" />
                          </SelectTrigger>
                          <SelectContent>
                            {sections.map((section) => (
                              <SelectItem key={section} value={section}>{section}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Subject Name</Label>
                        <Input
                          placeholder="Enter subject name"
                          value={pyqForm.subjectName}
                          onChange={(e) => handlePyqInputChange('subjectName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Paper Year</Label>
                        <Input
                          placeholder="Enter paper year (e.g., 2023)"
                          value={pyqForm.paperYear}
                          onChange={(e) => handlePyqInputChange('paperYear', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Paper URL</Label>
                      <Input
                        placeholder="Enter paper URL or file link"
                        value={pyqForm.paperUrl}
                        onChange={(e) => handlePyqInputChange('paperUrl', e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={handleAddPyq}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {loading ? 'Adding...' : 'Add PYQ'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

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
