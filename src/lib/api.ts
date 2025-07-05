import { supabase } from '../config/supabase';
import type { 
  College, 
  Department, 
  Course, 
  Subject, 
  Faculty, 
  Classroom, 
  TimeSlot,
  TimetableEntry,
  TimetableConflict 
} from '../types';

export const api = {
  // College management
  async createCollege(college: Omit<College, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('colleges')
      .insert(college)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getCollege(id: string) {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Department management
  async createDepartment(department: Omit<Department, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('departments')
      .insert(department)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getDepartments(collegeId: string) {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('college_id', collegeId)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  // Faculty management
  async createFaculty(faculty: Omit<Faculty, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('faculty')
      .insert(faculty)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getFaculty(collegeId: string) {
    const { data, error } = await supabase
      .from('faculty')
      .select(`
        *,
        department:departments(name)
      `)
      .eq('college_id', collegeId)
      .order('full_name');
    
    if (error) throw error;
    return data;
  },

  // Subject management
  async createSubject(subject: Omit<Subject, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('subjects')
      .insert(subject)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getSubjects(courseId: string) {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('course_id', courseId)
      .order('semester', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Classroom management
  async createClassroom(classroom: Omit<Classroom, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('classrooms')
      .insert(classroom)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getClassrooms(collegeId: string) {
    const { data, error } = await supabase
      .from('classrooms')
      .select('*')
      .eq('college_id', collegeId)
      .order('building', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Time slot management
  async createTimeSlot(timeSlot: Omit<TimeSlot, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('time_slots')
      .insert(timeSlot)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getTimeSlots(collegeId: string) {
    const { data, error } = await supabase
      .from('time_slots')
      .select('*')
      .eq('college_id', collegeId)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Timetable management
  async createTimetableEntry(entry: Omit<TimetableEntry, 'id' | 'created_at' | 'updated_at'>) {
    // Check for conflicts before creating
    const conflicts = await this.checkTimetableConflicts(entry);
    if (conflicts.length > 0) {
      throw new Error(`Conflicts detected: ${conflicts.map(c => c.message).join(', ')}`);
    }

    const { data, error } = await supabase
      .from('timetable_entries')
      .insert(entry)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getTimetableEntries(collegeId: string, academicYear: string, semester: number) {
    const { data, error } = await supabase
      .from('timetable_entries')
      .select(`
        *,
        subject:subjects(name, code),
        faculty:faculty(full_name),
        classroom:classrooms(name, building),
        time_slot:time_slots(name, start_time, end_time, day_of_week)
      `)
      .eq('college_id', collegeId)
      .eq('academic_year', academicYear)
      .eq('semester', semester);
    
    if (error) throw error;
    return data;
  },

  async checkTimetableConflicts(entry: Omit<TimetableEntry, 'id' | 'created_at' | 'updated_at'>): Promise<TimetableConflict[]> {
    const conflicts: TimetableConflict[] = [];

    // Check faculty conflict
    const { data: facultyConflicts } = await supabase
      .from('timetable_entries')
      .select('*')
      .eq('faculty_id', entry.faculty_id)
      .eq('time_slot_id', entry.time_slot_id)
      .eq('academic_year', entry.academic_year)
      .eq('semester', entry.semester);

    if (facultyConflicts && facultyConflicts.length > 0) {
      conflicts.push({
        type: 'faculty_conflict',
        message: 'Faculty is already assigned to another class at this time',
        entries: facultyConflicts as TimetableEntry[]
      });
    }

    // Check classroom conflict
    const { data: classroomConflicts } = await supabase
      .from('timetable_entries')
      .select('*')
      .eq('classroom_id', entry.classroom_id)
      .eq('time_slot_id', entry.time_slot_id)
      .eq('academic_year', entry.academic_year)
      .eq('semester', entry.semester);

    if (classroomConflicts && classroomConflicts.length > 0) {
      conflicts.push({
        type: 'classroom_conflict',
        message: 'Classroom is already booked at this time',
        entries: classroomConflicts as TimetableEntry[]
      });
    }

    return conflicts;
  },

  // Generate optimal timetable using AI
  async generateOptimalTimetable(collegeId: string, academicYear: string, semester: number) {
    // This would integrate with OpenAI API for intelligent scheduling
    // For now, we'll implement basic conflict-free scheduling
    
    const subjects = await supabase
      .from('subjects')
      .select(`
        *,
        course:courses(department_id)
      `)
      .eq('semester', semester);

    const faculty = await this.getFaculty(collegeId);
    const classrooms = await this.getClassrooms(collegeId);
    const timeSlots = await this.getTimeSlots(collegeId);

    if (!subjects.data || !faculty || !classrooms || !timeSlots) {
      throw new Error('Missing required data for timetable generation');
    }

    // Implement basic scheduling algorithm
    const generatedEntries: Omit<TimetableEntry, 'id' | 'created_at' | 'updated_at'>[] = [];
    
    // This is a simplified version - a real implementation would use
    // constraint satisfaction algorithms or AI optimization
    
    return generatedEntries;
  }
};