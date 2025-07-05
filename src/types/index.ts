export interface User {
  id: string;
  email: string;
  role: 'super_admin' | 'college_admin' | 'faculty' | 'staff';
  full_name: string;
  college_id?: string;
  created_at: string;
  updated_at: string;
}

export interface College {
  id: string;
  name: string;
  short_name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo_url?: string;
  primary_color: string;
  secondary_color: string;
  admin_user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: string;
  college_id: string;
  name: string;
  short_name: string;
  head_faculty_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  department_id: string;
  name: string;
  code: string;
  duration_years: number;
  total_semesters: number;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  course_id: string;
  name: string;
  code: string;
  semester: number;
  credits: number;
  lecture_hours: number;
  practical_hours: number;
  tutorial_hours: number;
  created_at: string;
  updated_at: string;
}

export interface Faculty {
  id: string;
  college_id: string;
  department_id: string;
  employee_id: string;
  full_name: string;
  email: string;
  phone: string;
  designation: string;
  specialization?: string;
  max_hours_per_week: number;
  preferred_time_slots?: string[];
  unavailable_time_slots?: string[];
  created_at: string;
  updated_at: string;
}

export interface Classroom {
  id: string;
  college_id: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  type: 'lecture_hall' | 'lab' | 'tutorial_room' | 'seminar_hall';
  facilities: string[];
  created_at: string;
  updated_at: string;
}

export interface TimeSlot {
  id: string;
  college_id: string;
  name: string;
  start_time: string;
  end_time: string;
  day_of_week: number; // 0-6 (Sunday-Saturday)
  slot_type: 'lecture' | 'practical' | 'tutorial' | 'break';
  created_at: string;
  updated_at: string;
}

export interface TimetableEntry {
  id: string;
  college_id: string;
  subject_id: string;
  faculty_id: string;
  classroom_id: string;
  time_slot_id: string;
  academic_year: string;
  semester: number;
  batch?: string;
  session_type: 'lecture' | 'practical' | 'tutorial';
  created_at: string;
  updated_at: string;
}

export interface TimetableConflict {
  type: 'faculty_conflict' | 'classroom_conflict' | 'student_conflict';
  message: string;
  entries: TimetableEntry[];
}