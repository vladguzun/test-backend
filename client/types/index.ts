export interface Student {
    id: number;
    name: string;
  }
  
  export interface Subject {
    id: number;
    name: string;
    students: { student: Student }[];
  }
  
  export interface Mark {
    id: number;
    score: number;
    studentId: number;
    subjectId: number;
  }
  