-- Seed Data for Courses
-- This file contains sample courses for the KKU Course Registration System
-- Run this SQL script in your Supabase SQL Editor after creating the tables

-- Insert sample courses
INSERT INTO public.courses (course_code, name, level, credit_hours, major) VALUES
-- Level 1 Courses
('CS101', 'Introduction to Computer Science', 1, 3, 'Computer Science'),
('MATH101', 'Calculus I', 1, 4, 'Mathematics'),
('ENG101', 'English Composition I', 1, 3, 'General'),
('PHYS101', 'General Physics I', 1, 4, 'Physics'),
('IS101', 'Introduction to Information Systems', 1, 3, 'Information Systems'),

-- Level 2 Courses
('CS201', 'Data Structures and Algorithms', 2, 4, 'Computer Science'),
('MATH201', 'Calculus II', 2, 4, 'Mathematics'),
('ENG201', 'English Composition II', 2, 3, 'General'),
('IS201', 'Database Systems', 2, 3, 'Information Systems'),
('STAT201', 'Statistics for Business', 2, 3, 'Statistics'),

-- Level 3 Courses
('CS301', 'Object-Oriented Programming', 3, 4, 'Computer Science'),
('IS301', 'Systems Analysis and Design', 3, 3, 'Information Systems'),
('IS302', 'Web Development', 3, 3, 'Information Systems'),
('MGT301', 'Principles of Management', 3, 3, 'Management'),
('ACC301', 'Financial Accounting', 3, 3, 'Accounting'),

-- Level 4 Courses
('CS401', 'Software Engineering', 4, 4, 'Computer Science'),
('IS401', 'Enterprise Systems', 4, 3, 'Information Systems'),
('IS402', 'Information Security', 4, 3, 'Information Systems'),
('MGT401', 'Strategic Management', 4, 3, 'Management'),
('MKT401', 'Marketing Principles', 4, 3, 'Marketing'),

-- Level 5 Courses
('IS501', 'Business Intelligence', 5, 3, 'Information Systems'),
('IS502', 'E-Commerce Systems', 5, 3, 'Information Systems'),
('CS501', 'Advanced Algorithms', 5, 4, 'Computer Science'),
('MGT501', 'Operations Management', 5, 3, 'Management'),
('FIN501', 'Corporate Finance', 5, 3, 'Finance'),

-- Level 6 Courses
('IS601', 'IT Project Management', 6, 3, 'Information Systems'),
('IS602', 'Cloud Computing', 6, 3, 'Information Systems'),
('IS603', 'Data Analytics', 6, 3, 'Information Systems'),
('MGT601', 'Leadership and Change', 6, 3, 'Management'),
('ENT601', 'Entrepreneurship', 6, 3, 'Entrepreneurship'),

-- Level 7 Courses
('IS701', 'IT Strategy', 7, 3, 'Information Systems'),
('IS702', 'Advanced Database Systems', 7, 3, 'Information Systems'),
('IS703', 'Mobile Application Development', 7, 3, 'Information Systems'),
('MGT701', 'International Business', 7, 3, 'Management'),
('RES701', 'Research Methods', 7, 3, 'General'),

-- Level 8 Courses
('IS801', 'Capstone Project', 8, 6, 'Information Systems'),
('IS802', 'IT Governance', 8, 3, 'Information Systems'),
('IS803', 'Emerging Technologies', 8, 3, 'Information Systems'),
('MGT801', 'Business Ethics', 8, 3, 'Management'),
('GRAD801', 'Graduation Project', 8, 6, 'General')
ON CONFLICT (course_code) DO NOTHING;

