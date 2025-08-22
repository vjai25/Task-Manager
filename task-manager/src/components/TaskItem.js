import React, { useState, useRef, useEffect } from 'react';
import useTaskStore from '../store/useTaskStore';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskItem = ({ task }) => {
  const {
    toggleTask,
    deleteTask,
    editTask,
    setTaskPriority,
    setTaskDueDate,
  } = useTaskStore();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const editInputRef = useRef(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (newTitle.trim()) {
      editTask(task.id, newTitle);
    } else {
      setNewTitle(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setNewTitle(task.title);
      setIsEditing(false);
    }
  };

  const priorityClasses = {
    low: 'bg-green-600',
    medium: 'bg-yellow-600',
    high: 'bg-red-600',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-gray-800 p-4 rounded-lg shadow-md mb-2 flex items-center gap-4"
    >
      <button {...listeners} className="cursor-move p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
      />
      <div className="flex-grow">
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="bg-gray-700 text-white rounded-md p-1 w-full"
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className={`px-2 py-1 text-xs font-bold rounded-full text-white ${priorityClasses[task.priority]}`}>
        {task.priority}
      </div>

      <input
        type="date"
        value={task.dueDate || ''}
        onChange={(e) => setTaskDueDate(task.id, e.target.value)}
        className="bg-gray-700 text-white rounded-md p-1 border border-gray-600"
      />

      <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default TaskItem;
