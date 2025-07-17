-- Create academic_data table for storing branch-specific information
CREATE TABLE public.academic_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  branch TEXT NOT NULL CHECK (branch IN ('IT', 'CSE', 'CSD', 'CSM', 'MECH', 'CIVIL', 'EEE', 'ECE')),
  year TEXT NOT NULL CHECK (year IN ('1st Year', '2nd Year', '3rd Year', '4th Year')),
  section TEXT NOT NULL CHECK (section IN ('A', 'B', 'C')),
  hod_name TEXT NOT NULL,
  timetable_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(branch, year, section)
);

-- Create pyqs table for storing previous year question papers
CREATE TABLE public.pyqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  branch TEXT NOT NULL CHECK (branch IN ('IT', 'CSE', 'CSD', 'CSM', 'MECH', 'CIVIL', 'EEE', 'ECE')),
  year TEXT NOT NULL CHECK (year IN ('1st Year', '2nd Year', '3rd Year', '4th Year')),
  section TEXT NOT NULL CHECK (section IN ('A', 'B', 'C')),
  subject_name TEXT NOT NULL,
  paper_url TEXT NOT NULL,
  paper_year TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.academic_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pyqs ENABLE ROW LEVEL SECURITY;

-- Create policies for academic_data
CREATE POLICY "Anyone can view academic data" ON public.academic_data
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert academic data" ON public.academic_data
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );

CREATE POLICY "Only admins can update academic data" ON public.academic_data
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );

-- Create policies for pyqs
CREATE POLICY "Anyone can view pyqs" ON public.pyqs
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert pyqs" ON public.pyqs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for academic_data
CREATE TRIGGER update_academic_data_updated_at
  BEFORE UPDATE ON public.academic_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.academic_data (branch, year, section, hod_name, timetable_url) VALUES
  ('CSE', '1st Year', 'A', 'Dr. Rajesh Kumar', 'https://example.com/cse-1a-timetable.pdf'),
  ('CSE', '2nd Year', 'A', 'Dr. Rajesh Kumar', 'https://example.com/cse-2a-timetable.pdf'),
  ('IT', '1st Year', 'A', 'Dr. Priya Sharma', 'https://example.com/it-1a-timetable.pdf'),
  ('MECH', '1st Year', 'A', 'Dr. Suresh Reddy', 'https://example.com/mech-1a-timetable.pdf');

INSERT INTO public.pyqs (branch, year, section, subject_name, paper_url, paper_year) VALUES
  ('CSE', '1st Year', 'A', 'Mathematics', 'https://example.com/cse-math-2023.pdf', '2023'),
  ('CSE', '1st Year', 'A', 'Physics', 'https://example.com/cse-physics-2023.pdf', '2023'),
  ('IT', '1st Year', 'A', 'Programming Fundamentals', 'https://example.com/it-prog-2023.pdf', '2023'),
  ('MECH', '1st Year', 'A', 'Engineering Mechanics', 'https://example.com/mech-em-2023.pdf', '2023');