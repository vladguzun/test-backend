import React from 'react';
import { Subject, Mark } from '../types/index';

interface MarkListProps {
  subjects: Subject[];
  marks: Mark[];
  onAddMark: (subjectId: number, studentId: number) => void;
  onEditMark: (mark: Mark) => void;
}

const MarkList: React.FC<MarkListProps> = ({ subjects, marks, onAddMark, onEditMark }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-white">Marks</h2>
      <div className="space-y-4 max-h-[60vh] overflow-auto custom-scrollbar pb-4">
        {subjects.map((subject) => (
          <div key={subject.id} className="mb-8 p-4 rounded bg-slate-600">
            <h3 className="text-xl font-bold mb-4 text-center text-white">{subject.name}</h3>
            <table className="min-w-full bg-slate-500 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Student Name</th>
                  <th className="py-2 px-4 border-b">Mark</th>
                </tr>
              </thead>
              <tbody>
                {subject.students.map(({ student }) => {
                  const mark = marks.find((m) => m.studentId === student.id && m.subjectId === subject.id);
                  return (
                    <tr key={student.id} className="hover:bg-slate-400">
                      <td className="py-2 px-4 border-b">{student.name}</td>
                      <td
                        className="py-2 px-4 border-b cursor-pointer"
                        onClick={() => {
                          if (mark) {
                            onEditMark(mark);
                          } else {
                            onAddMark(subject.id, student.id);
                          }
                        }}
                      >
                        {mark ? mark.score : 'N/A'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

export default MarkList;
