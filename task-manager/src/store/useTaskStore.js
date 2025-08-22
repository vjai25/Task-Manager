import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: uuidv4(), completed: false, ...task },
          ],
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      reorderTasks: (tasks) => set({ tasks }),
      editTask: (id, title) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, title } : task
          ),
        })),
      setTaskPriority: (id, priority) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, priority } : task
          ),
        })),
      setTaskDueDate: (id, dueDate) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, dueDate } : task
          ),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);

export default useTaskStore;
