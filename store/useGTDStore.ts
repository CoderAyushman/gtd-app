import AsyncStorage from '@react-native-async-storage/async-storage'
import { create, type StoreApi, type UseBoundStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
type TaskType = 'inbox' | 'next_action' | 'project'

type Task = {
  id: string
  title: string
  notes: string
  isCompleted: boolean
  type: TaskType
  context?: string // e.g., @home, @laptop
  projectId?: string
}


type Project = {
  id: string
  title: string
  description?: string
  isCompleted: boolean
  tasks: Task[]
}

type Context = {
  id: string
  name: string
}

type GTDStore = {
  tasks: Task[]
  projects: Project[]
  contexts: Context[]

  // Actions
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
  markTaskDone: (id: string) => void
  deleteAllTasks: () => void
  addProject: (project: Project) => void
  addContext: (context: Context) => void
  updateContext: (context: Context) => void
  deleteContext: (id: string) => void
}


export const useGTDStore: UseBoundStore<StoreApi<GTDStore>> = create(
  persist(
    (set) => ({
      tasks: [],
      projects: [],
      contexts: [],

      addTask: (task) =>
        set((state) => ({ tasks: [task, ...state.tasks] })),

      deleteAllTasks:()=>set(() => ({tasks: []})),
      updateTask: (updated) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updated.id ? updated : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      markTaskDone: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
          ),
        })),

      addProject: (project) =>
        set((state) => ({ projects: [project, ...state.projects] })),

      addContext: (context) =>
        set((state) => ({ contexts: [context, ...state.contexts] })),
      updateContext: (updated:any) =>
        set((state) => ({
          contexts: state.contexts.map((context) =>
            context.id === updated.id ? updated : context
          ),
        })),
        deleteContext: (id:any) =>
          set((state)=>({
            contexts: state.contexts.filter((context) => context.id !== id)
          }))
    }),
    {
      name: 'gtd-stores',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)