import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TodoList from './components/TodoList';
import EditTodo from './components/EditTodo';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TodoList/>}></Route>  
      <Route path="/edit/:taskid" element={<EditTodo/>}></Route>    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
