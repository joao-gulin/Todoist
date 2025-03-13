import axios from 'axios'
import apiClient from './apiClient'
import type { Task } from './types';

class TaskAPI {
  async getTasks(): Promise<Task[]> {
    try {
      const response = await apiClient.get<Task[]>('/task');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async postTask(title: string, description: string) {
    try {
      const response = await apiClient.post<Task>('/task', {
        title,
        description,
      })
      return response.data
    } catch (error) {
      console.error('Error posting new task:', error)
      throw error
    }
  }

  async deleteTask(taskId: number) {
    try {
      await apiClient.delete(`/task/${taskId}`)
    } catch (error) {
      console.error('Error deleting task:', error)
      throw error
    }
  }

  async completeTask(taskId: number) {
    try {
      await apiClient.put(`/task/${taskId}`)
    } catch (error) {
      console.error('Error completing task:', error)
      throw error
    }
  }
}

const taskAPI = new TaskAPI()
export default taskAPI