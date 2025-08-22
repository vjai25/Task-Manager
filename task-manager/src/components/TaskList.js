import React, { useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import TaskItem from './TaskItem';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const reorderTasks = useTaskStore((state) => state.reorderTasks);
  const [filter, setFilter] = useState('all');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      reorderTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const getFilterButtonClasses = (buttonFilter) => {
    return filter === buttonFilter
      ? 'bg-blue-600 text-white'
      : 'bg-gray-700 hover:bg-gray-600 text-white';
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`font-bold py-2 px-4 rounded-md transition duration-300 ${getFilterButtonClasses('all')}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`font-bold py-2 px-4 rounded-md transition duration-300 ${getFilterButtonClasses('active')}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`font-bold py-2 px-4 rounded-md transition duration-300 ${getFilterButtonClasses('completed')}`}
        >
          Completed
        </button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={filteredTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
            {filteredTasks.length === 0 && (
              <p className="text-center text-gray-500">No tasks to show.</p>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TaskList;
