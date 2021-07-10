import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  Container,
  Form,
  List,
} from 'semantic-ui-react'
import TodoListItem from '../TodoListItem'
import { fetchTodos, addTodoAsync } from '../../store/slices/todosSlice'

export default function TodoList() {
  // const initialTodos = [
  //   {
  //     id: 1,
  //     completed: false,
  //     text: 'Learn React'
  //   },
  //   {
  //     id: 2,
  //     completed: false,
  //     text: 'Learn Redux'
  //   },
  // ]

  // const [todos, setTodos] = useState(initialTodos)
  const [todo, setTodo] = useState({})

  const todos = useSelector(state => state.todos.todos)
  const status = useSelector(state => state.todos.status)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(fetchTodos())
    // if (status === 'idle') {
    //   dispatch(fetchTodos('Learn Redux'))
    // }
  }, [dispatch])

  const handleChangeInput = (e) => {
    const todo = {
      // id: todos.length + 1,
      description: e.target.value,
      completed: false
    }
    setTodo(todo)
  }

  const handleKeyPress = async (e) => {
    if (e.which === 13) {
      try {
        console.log(todo)
        // setTodos((prev) => [...prev, todo])
        const result = await dispatch(addTodoAsync(todo))
        unwrapResult(result)
        setTodo({})
      } catch (err) {
        console.log('Error: ' + err)
      } finally {

      }
      console.log('enter pressionado')


    }
  }

  const todoListItems = () => todos.map((todo) => <TodoListItem key={todo.id} todo={todo} />)
  if (todos === undefined) {
    return <h4>Loading...</h4>
  }
  return (
    <Container >
      <Form autoComplete="off">

        <Form.Input
          type="text"
          name="todo"
          placeholder='What needs to be done?'
          onChange={handleChangeInput}
          onKeyDown={handleKeyPress}
        />

      </Form>

      <List divided verticalAlign='middle' >
        {todoListItems()}
      </List>

    </Container>
  )
}
