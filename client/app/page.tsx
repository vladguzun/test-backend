'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from '../components/Modal';
import StudentList from '../components/StudentsList';
import SubjectList from '../components/SubjectList';
import MarkList from '../components/MarkList';
import LoginModal from '../components/LoginModal';
import { Student, Subject, Mark } from "../types/index";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showJWTWarningModal, setShowJWTWarningModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showEditSubjectModal, setShowEditSubjectModal] = useState(false);
  const [showEditMarkModal, setShowEditMarkModal] = useState(false);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);
  const [showDeleteSubjectModal, setShowDeleteSubjectModal] = useState(false);
  const [showDeleteMarkModal, setShowDeleteMarkModal] = useState(false);
  const [showSubjectWarningModal, setShowSubjectWarningModal] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [name, setName] = useState<string>('');
  const [subjectForm, setSubjectForm] = useState<{ name: string; studentIds: number[] }>({ name: '', studentIds: [] });
  const [editStudentForm, setEditStudentForm] = useState<{ id: number; name: string }>({ id: 0, name: '' });
  const [editSubjectForm, setEditSubjectForm] = useState<{ id: number; name: string; studentIds: number[] }>({ id: 0, name: '', studentIds: [] });
  const [markForm, setMarkForm] = useState<{ score: string; studentId: string; subjectId: string }>({ score: '', studentId: '', subjectId: '' });
  const [form, setForm] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const [isRegister, setIsRegister] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{ type: string, id: number } | null>(null);
  const [activeTab, setActiveTab] = useState('students');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      fetchStudents(token);
      fetchSubjects(token);
      fetchMarks(token);
    } else {
      setIsAuthenticated(false);
      setShowLoginModal(true);
    }
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401 || error.response.status === 403) {
          setIsAuthenticated(false);
          setShowJWTWarningModal(true);
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const fetchStudents = async (token: string) => {
    try {
      const response = await axios.get<Student[]>('http://localhost:5000/students', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchSubjects = async (token: string) => {
    try {
      const response = await axios.get<Subject[]>('http://localhost:5000/subjects', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchMarks = async (token: string) => {
    try {
      const response = await axios.get<Mark[]>('http://localhost:5000/marks', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setMarks(response.data);
    } catch (error) {
      console.error('Error fetching marks:', error);
    }
  };

  const handleAddStudent = async () => {
    const token = Cookies.get('token');
    if (!token) return;
    try {
      await axios.post('http://localhost:5000/students', { name }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchStudents(token);
      setShowStudentModal(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleAddSubject = async () => {
    const token = Cookies.get('token');
    if (!token) return;
    if (subjectForm.studentIds.length === 0) {
      setShowSubjectWarningModal(true);
      return;
    }
    try {
      await axios.post('http://localhost:5000/subjects', subjectForm, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchSubjects(token);
      setShowSubjectModal(false);
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  const handleAddMark = async () => {
    const token = Cookies.get('token');
    if (!token) return;
    try {
      await axios.post('http://localhost:5000/marks', markForm, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchMarks(token);
      setShowMarkModal(false);
    } catch (error) {
      console.error('Error adding mark:', error);
    }
  };

  const handleEditStudent = async () => {
    const token = Cookies.get('token');
    if (!token) return;
    try {
      await axios.put(`http://localhost:5000/students/${editStudentForm.id}`, { name: editStudentForm.name }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchStudents(token);
      setShowEditStudentModal(false);
    } catch (error) {
      console.error('Error editing student:', error);
    }
  };

  const handleEditSubject = async () => {
    const token = Cookies.get('token');
    if (!token) return;
    try {
      await axios.put(`http://localhost:5000/subjects/${editSubjectForm.id}`, { name: editSubjectForm.name, studentIds: editSubjectForm.studentIds }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchSubjects(token);
      setShowEditSubjectModal(false);
    } catch (error) {
      console.error('Error editing subject:', error);
    }
  };

  const handleEditMark = async () => {
    const token = Cookies.get('token');
    if (!token) return;
    try {
      await axios.put(`http://localhost:5000/marks`, markForm, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchMarks(token);
      setShowEditMarkModal(false);
    } catch (error) {
      console.error('Error editing mark:', error);
    }
  };

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true });
      Cookies.set('token', response.data.token, { expires: 1 });
      setIsAuthenticated(true);
      setShowLoginModal(false);
      fetchStudents(response.data.token);
      fetchSubjects(response.data.token);
      fetchMarks(response.data.token);
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const handleRegister = async (email: string, password: string): Promise<boolean> => {
    try {
      await axios.post('http://localhost:5000/register', { email, password });
      return await handleLogin(email, password);
    } catch (error) {
      console.error('Error during registration:', error);
      return false;
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setShowLoginModal(true);
    setStudents([]);
    setSubjects([]);
    setMarks([]);
  };

  const handleDelete = async () => {
    const token = Cookies.get('token');
    if (!token || !deleteItem) return;

    try {
      if (deleteItem.type === 'student') {
        await axios.delete(`http://localhost:5000/students/${deleteItem.id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setStudents((prev) => prev.filter((student) => student.id !== deleteItem.id));
        setSubjects((prev) =>
          prev.map((subject) => ({
            ...subject,
            students: subject.students.filter(({ student }) => student.id !== deleteItem.id),
          }))
        );
        setMarks((prev) => prev.filter((mark) => mark.studentId !== deleteItem.id));
      } else if (deleteItem.type === 'subject') {
        await axios.delete(`http://localhost:5000/subjects/${deleteItem.id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setSubjects((prev) => prev.filter((subject) => subject.id !== deleteItem.id));
        setMarks((prev) => prev.filter((mark) => mark.subjectId !== deleteItem.id));
      } else if (deleteItem.type === 'mark') {
        await axios.delete(`http://localhost:5000/marks/${deleteItem.id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setMarks((prev) => prev.filter((mark) => mark.id !== deleteItem.id));
      }

      setDeleteItem(null);
      setShowDeleteStudentModal(false);
      setShowDeleteSubjectModal(false);
      setShowDeleteMarkModal(false);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleStudentAction = (student: Student) => {
    setEditStudentForm(student);
    setShowEditStudentModal(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return (
          <StudentList
            students={students}
            onAddStudent={() => setShowStudentModal(true)}
            onEditStudent={handleStudentAction}
            onDeleteStudent={(student) => {
              setDeleteItem({ type: 'student', id: student.id });
              setShowDeleteStudentModal(true);
            }}
          />
        );
      case 'subjects':
        return (
          <SubjectList
            subjects={subjects}
            onAddSubject={() => setShowSubjectModal(true)}
            onEditSubject={(subject) => {
              setEditSubjectForm({ id: subject.id, name: subject.name, studentIds: subject.students.map(({ student }) => student.id) });
              setShowEditSubjectModal(true);
            }}
            onDeleteSubject={(subject) => {
              setDeleteItem({ type: 'subject', id: subject.id });
              setShowDeleteSubjectModal(true);
            }}
            onDeleteStudentFromSubject={(studentId) => {
              setDeleteItem({ type: 'student', id: studentId });
              setShowDeleteStudentModal(true);
            }}
          />
        );
      case 'marks':
        return (
          <MarkList
            subjects={subjects}
            marks={marks}
            onAddMark={(subjectId, studentId) => {
              setMarkForm({ score: '', studentId: studentId.toString(), subjectId: subjectId.toString() });
              setShowMarkModal(true);
            }}
            onEditMark={(mark) => {
              setMarkForm({ score: mark.score.toString(), studentId: mark.studentId.toString(), subjectId: mark.subjectId.toString() });
              setShowEditMarkModal(true);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-600 overflow-hidden">
      <LoginModal
        isRegister={isRegister}
        onToggleRegister={() => setIsRegister(!isRegister)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        isVisible={showLoginModal}
      />

      {isAuthenticated && (
        <>
          <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          <h1 className="text-4xl font-bold mb-4">Teacher Dashboard</h1>
          <div className="flex space-x-4 mb-8">
            <div className="bg-slate-700 p-6 rounded-lg shadow-lg w-[40vw] h-[70vh] overflow-hidden">
              {renderContent()}
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[20vw] h-[60vh] overflow-hidden">
              <h2 className="text-2xl font-bold mb-4">Options</h2>
              <ul>
                <li className="mb-2">
                  <button
                    onClick={() => setActiveTab('students')}
                    className={`w-full text-left px-4 py-2 rounded ${activeTab === 'students' ? 'bg-slate-700 text-white' : 'text-gray-300'}`}
                  >
                    Students
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => setActiveTab('subjects')}
                    className={`w-full text-left px-4 py-2 rounded ${activeTab === 'subjects' ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
                  >
                    Subjects
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => setActiveTab('marks')}
                    className={`w-full text-left px-4 py-2 rounded ${activeTab === 'marks' ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
                  >
                    Marks
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <Modal isVisible={showStudentModal} onClose={() => setShowStudentModal(false)} width="30vw" height="30vh">
            <h2 className="text-2xl font-bold mb-4 text-white">Add Student</h2>
            <input
              type="text"
              placeholder="Student Name"
              className="w-full mb-2 p-2 border border-gray-300 rounded text-black"
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleAddStudent} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
          </Modal>

          <Modal isVisible={showSubjectModal} onClose={() => setShowSubjectModal(false)} width="40vw" height="70vh">
            <h2 className="text-2xl font-bold mb-4 text-white">Add Subject</h2>
            <input
              type="text"
              placeholder="Subject Name"
              className="w-full mb-2 p-2 border border-gray-300 rounded text-black"
              onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
            />
            <div className="mb-4">
              <label className="block mb-2 text-white">Assign Students</label>
              {students.map((student) => (
                <div key={student.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={subjectForm.studentIds.includes(student.id)}
                    onChange={() => {
                      setSubjectForm({
                        ...subjectForm,
                        studentIds: subjectForm.studentIds.includes(student.id)
                          ? subjectForm.studentIds.filter((id) => id !== student.id)
                          : [...subjectForm.studentIds, student.id],
                      });
                    }}
                    className="mr-2"
                  />
                  {student.name}
                </div>
              ))}
            </div>
            <button onClick={handleAddSubject} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
          </Modal>

          <Modal isVisible={showMarkModal} onClose={() => setShowMarkModal(false)} width="40vw" height="70vh">
            <h2 className="text-2xl font-bold mb-4 text-white">Add Mark</h2>
            <input
              type="number"
              placeholder="Score"
              className="w-full mb-2 p-2 border border-gray-300 rounded text-black"
              value={markForm.score}
              onChange={(e) => setMarkForm({ ...markForm, score: e.target.value })}
            />
            <button onClick={handleAddMark} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
          </Modal>

          <Modal isVisible={showEditStudentModal} onClose={() => setShowEditStudentModal(false)} width="30vw" height="30vh">
            <h2 className="text-2xl font-bold mb-4 text-white">Edit Student</h2>
            <input
              type="text"
              placeholder="Student Name"
              className="w-full mb-2 p-2 border border-gray-300 rounded text-black"
              value={editStudentForm.name}
              onChange={(e) => setEditStudentForm({ ...editStudentForm, name: e.target.value })}
            />
            <button onClick={handleEditStudent} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button
              onClick={() => {
                setDeleteItem({ type: 'student', id: editStudentForm.id });
                setShowDeleteStudentModal(true);
                setShowEditStudentModal(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Delete
            </button>
          </Modal>

          <Modal isVisible={showEditSubjectModal} onClose={() => setShowEditSubjectModal(false)} width="40vw" height="70vh">
            <h2 className="text-2xl font-bold mb-4 text-white">Edit Subject</h2>
            <input
              type="text"
              placeholder="Subject Name"
              className="w-full mb-2 p-2 border border-gray-300 rounded text-black"
              value={editSubjectForm.name}
              onChange={(e) => setEditSubjectForm({ ...editSubjectForm, name: e.target.value })}
            />
            <div className="mb-4">
              <label className="block mb-2 text-white">Assign Students</label>
              {students.map((student) => (
                <div key={student.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={editSubjectForm.studentIds.includes(student.id)}
                    onChange={() => {
                      setEditSubjectForm({
                        ...editSubjectForm,
                        studentIds: editSubjectForm.studentIds.includes(student.id)
                          ? editSubjectForm.studentIds.filter((id) => id !== student.id)
                          : [...editSubjectForm.studentIds, student.id],
                      });
                    }}
                    className="mr-2"
                  />
                  {student.name}
                </div>
              ))}
            </div>
            <button onClick={handleEditSubject} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button
              onClick={() => {
                setDeleteItem({ type: 'subject', id: editSubjectForm.id });
                setShowDeleteSubjectModal(true);
                setShowEditSubjectModal(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Delete
            </button>
          </Modal>

          <Modal isVisible={showEditMarkModal} onClose={() => setShowEditMarkModal(false)} width="30vw" height="30vh">
            <h2 className="text-2xl font-bold mb-4 text-white">Edit Mark</h2>
            <input
              type="number"
              placeholder="Score"
              className="w-full mb-2 p-2 border border-gray-300 rounded text-black"
              value={markForm.score}
              onChange={(e) => setMarkForm({ ...markForm, score: e.target.value })}
            />
            <button onClick={handleEditMark} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button
              onClick={() => {
                const mark = marks.find(m => m.studentId.toString() === markForm.studentId && m.subjectId.toString() === markForm.subjectId);
                if (mark) {
                  setDeleteItem({ type: 'mark', id: mark.id });
                  setShowDeleteMarkModal(true);
                  setShowEditMarkModal(false);
                }
              }}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Delete
            </button>
          </Modal>

          <Modal isVisible={showDeleteStudentModal && deleteItem?.type === 'student'} onClose={() => setShowDeleteStudentModal(false)} width="30vw" height="20vh">
            <h2 className="text-2xl font-bold mb-4 text-white">Delete Student</h2>
            <p>Are you sure you want to delete this student?</p>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Delete</button>
          </Modal>

          <Modal isVisible={showDeleteSubjectModal && deleteItem?.type === 'subject'} onClose={() => setShowDeleteSubjectModal(false)} width="30vw" height="20vh">
            <h2 className="text-2xl font-bold mb-4 text-white">Delete Subject</h2>
            <p>Are you sure you want to delete this subject?</p>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Delete</button>
          </Modal>

          <Modal isVisible={showDeleteMarkModal && deleteItem?.type === 'mark'} onClose={() => setShowDeleteMarkModal(false)} width="30vw" height="20vh">
            <h2 className="text-2xl font-bold mb-4 text-white">Delete Mark</h2>
            <p>Are you sure you want to delete this mark?</p>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Delete</button>
          </Modal>

          <Modal isVisible={showSubjectWarningModal} onClose={() => setShowSubjectWarningModal(false)} width="30vw" height="27vh">
            <h2 className="text-2xl font-bold mb-4 text-white">Warning</h2>
            <p className="text-white">Cannot create a subject without students. Please assign students to the subject.</p>
          </Modal>
        </>
      )}

      <Modal isVisible={showJWTWarningModal} onClose={() => setShowJWTWarningModal(false)} width="30vw" height="20vh">
        <h2 className="text-2xl font-bold mb-4 text-white">Session Expired</h2>
        <p>Your session has expired or the token has been modified. Please log in again.</p>
        <button
          onClick={() => setShowLoginModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Log In
        </button>
      </Modal>
    </div>
  );
};

export default Home;
