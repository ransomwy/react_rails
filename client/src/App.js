import React, { Component } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

class App extends Component {
  state = { todos: []}

componentDidMount() {
  fetch('api/items')
   .then( res => res.json())
   .then( todos => this.setState({ todos }))
  //make a call to our rails server to get items

}

addItem = (name) => {
  const { todos } = this.state;
  const id = Math.floor(( 1 + Math.random()) * 0x100).toString()
  this.setState({ todos: [...todos, { id, name }] });
  //make api call to rails to add item
  //update state
}

updateTodo = (id) => {
  let todos = this.state.todos.map( t => {
    if (t.id === id )
    return { ...t, complete: !t.complete }
    return t;
  });

  this.setState({ todos });
  //make api call to upddate Todo
  //update state
}

deleteTodo = (id) => {
  //make api call to delte todos
  // remove from state
  const { todos } = this.state;
  this.setState({ todos: todos.filter( t => t.id !== id ) })
}

render() {
  return (
    <div className="container">
      <TodoForm addItem={this.addItem}/>
      <TodoList
        todos={this.state.todos}
        updateTodo={this.updateTodo}
        deleteTodo={this.deleteTodo}
      />
    </div>
  );
 }
}


export default App;
