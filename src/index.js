import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Title(props) {
  return(
    <div>
      <h1>{props.title}</h1>
    </div>
  );
}
function Todo(props) {
  return (
    <li>
      <span id={props.index}>{props.name} {props.content}</span>
      <button onClick={props.onClick}>delete</button>
    </li>
  );
}
  
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      value: '',
      todoList: new Array(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    let todoList = this.state.todoList.slice();
    todoList.push({name: this.state.name, value: this.state.value});
    this.setState({
      name: '',
      value: '',
      todoList: todoList,
    });

    event.preventDefault();
    console.log(todoList);
  }

  deleteTodo(index) {
    let todoList = this.state.todoList.slice();
    todoList.splice(index, 1);

    this.setState({
      name: '',
      value: '',
      todoList: todoList,
    });
  }

  render() {
    const todoList = this.state.todoList;
    return(
      <React.Fragment>
        <div>
          <ul>
            {todoList.map((todo, index) => {
                return <Todo name={todo.name} content={todo.value} key={index} index={index} onClick={this.deleteTodo.bind(this, index)} />
            })}
          </ul>
        </div>
        <div>
          <form onSubmit={this.handleSubmit} >
            <input type="text" name="name" id="input-todo" value={this.state.name} onChange={this.handleChange} />
            <input type="text" name="value" id="input-todo" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

function Board() {
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <div>
        <Title title="Todoリスト" />
        <Form />
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);
