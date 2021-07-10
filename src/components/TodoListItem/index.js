import React from 'react'
import {
  List,
  Button,
  Icon,
  Checkbox,
} from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { toggleTodoAsync, deleteTodoAsync} from '../../store/slices/todosSlice'

export default function TodoListItem({ todo }) {

  const dispatch = useDispatch()

  return (

    <List.Item>

      <List.Content floated='left'>
        <Checkbox
          label=""
          onChange={() => dispatch(toggleTodoAsync(todo))}
          defaultChecked={todo.completed} />
      </List.Content>

      <List.Content floated='right' >
        <Button
          onClick={() => dispatch(deleteTodoAsync(todo)) }
          size="mini" >
          <Icon name="trash" />
        </Button>

      </List.Content>

      <List.Content>{todo.description}</List.Content>
    </List.Item>
  )
}
