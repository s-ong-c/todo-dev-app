import apiClient from './apiClient';

export interface IItem {
  todo: Todo[];
}

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  status: number;
  createdAt: string;
  updatedAt: string;
  assoicates: [Assoicate];
}

export interface Assoicate {
  assoicateId: number;
  parentId: number;
  todoId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Create {
  title: string;
  id?: number;
}
export const getTodoList = async () => {
  const data = await apiClient.get<IItem>('/all');
  return data.data;
};
export const crateTodo = async ({ todo }: { todo: Create }) =>
  await apiClient.post<Create>('/create', todo);

export const toggleTodo = async (id: number, isCompleted: boolean) =>
  await apiClient.put(`/toggle/${id}`, { isCompleted });

export const deleteTodo = async (id: number) =>
  await apiClient.post(`/delete/${id}`);

export const isRefCompleted = async (id: number) => {
  const { data } = await apiClient.get(`/refer/${id}`);
  return data.isCompleted;
};
