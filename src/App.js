import 'semantic-ui-css/semantic.min.css'
import {
  Header,
  Container,
  Segment
} from 'semantic-ui-react'

import TodoList from './components/TodoList'

function App() {
  return (
    <div style={{ backgroundColor: '#f7f7f7', padding: '2rem' }}>
      <Header as='h1' content='Redux To Do List App' textAlign='center'  />
 
      <Container text>
        <Segment>
          <TodoList />
        </Segment>
      </Container>
    </div>
  );
}

export default App;
