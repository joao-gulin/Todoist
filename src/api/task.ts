import axios from 'axios'
import apiClient from './apiClient'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

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
}

const taskAPI = new TaskAPI()
export default taskAPI