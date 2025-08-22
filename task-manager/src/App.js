import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto p-4">
        <header className="text-center my-8">
          <h1 className="text-5xl font-bold">Task Manager</h1>
        </header>
        <main className="max-w-2xl mx-auto">
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </div>
  );
}

export default App;
