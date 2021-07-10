import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  todos: [],
  status: 'idle'
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(`http://localhost:3004/todos`)
  return response.data
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async payload => {
  const response = await axios.post(`http://localhost:3004/todos`, {
    description: payload.description,
    completed: payload.completed,
  })
  const todo = response.data

  return todo
})

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodoAsync',
  async (payload) => {

    const response = await axios.put(`http://localhost:3004/todos/${payload.id}`, {
      description: payload.description,
      completed: !payload.completed
    })

    return response.data
  })

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (payload) => {
    const response = await axios.delete(`http://localhost:3004/todos/${payload.id}`)
    return payload
  }
)


export const todosReducer = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        // id: nanoid(),
        description: action.payload.description,
        completed: false,
      };
      state.push(todo);
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTodos.fulfilled]: (state, action) => {

      state.status = 'success'
      state.todos = action.payload
     
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.status = 'success'
      state.todos.push(action.payload)
    },
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id)
      state.todos[index].completed = action.payload.completed
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      const remainTodos = state.todos.filter((todo) => todo.id !== action.payload.id)
      state.todos = remainTodos
    }
  }
})

export const { todoAdded } = todosReducer.actions

export default todosReducer.reducer