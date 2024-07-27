import React from 'react';
import { Student } from '../types/index';

interface StudentListProps {
  students: Student[];
  onAddStudent: () => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onAddStudent, onEditStudent, onDeleteStudent }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-white">Students</h2>
      <button onClick={onAddStudent} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Student</button>
      <ul className="space-y-2 max-h-[60vh] overflow-auto custom-scrollbar pb-4">
        {students.map((student) => (
          <li key={student.id} className="border p-2 rounded flex justify-between bg-slate-500">
            <span onClick={() => onEditStudent(student)} className="cursor-pointer">{student.name}</span>
            <button
              onClick={() => onDeleteStudent(student)}
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default StudentList;
