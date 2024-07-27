import React from 'react';
import { Subject } from '../types/index';

interface SubjectListProps {
  subjects: Subject[];
  onAddSubject: () => void;
  onEditSubject: (subject: Subject) => void;
  onDeleteSubject: (subject: Subject) => void;
  onDeleteStudentFromSubject: (studentId: number) => void;
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects, onAddSubject, onEditSubject, onDeleteSubject, onDeleteStudentFromSubject }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-white">Subjects</h2>
      <button onClick={onAddSubject} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Subject</button>
      <div className="space-y-4 max-h-[60vh] overflow-auto custom-scrollbar pb-4">
        {subjects.map((subject) => (
          <div key={subject.id} className="mb-8 p-4 rounded bg-slate-600">
            <h3 className="text-xl font-bold mb-2 text-white">{subject.name}</h3>
            <ul className="space-y-2 max-h-40 overflow-auto custom-scrollbar pb-4">
              {subject.students.map(({ student }) => (
                <li key={student.id} className="border p-2 rounded flex justify-between bg-slate-500">
                  {student.name}
                  <button
                    onClick={() => onDeleteStudentFromSubject(student.id)}
                    className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <button
                onClick={() => onEditSubject(subject)}
                className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteSubject(subject)}
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SubjectList;
