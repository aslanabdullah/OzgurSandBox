import React from "react";
import ReactDOM from "react-dom";
import Footer from "./footer";

import "./styles.css";

class Header extends React.Component {
  render() {
    return (
      <header id="header">
        <h1>todos</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.onSubmit();
          }}
        >
          <input
            id="new-todo"
            placeholder="What needs to be done?"
            autofocus
            onChange={e => this.props.onChange(e.target.value)}
            value={this.props.value}
          />
        </form>
      </header>
    );
  }
}

class Todo extends React.Component {
  render() {
    return (
      <li>
        <pre> {false && JSON.stringify(this.props.item.durum, null, 2)}</pre>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={this.props.item.tamamlandiMi}
            onChange={e => this.props.toggle(this.props.item.id)}
          />
          <label>{this.props.item.tanim}</label>
          <button
            className="destroy"
            onClick={() => this.props.destroy(this.props.item.id)}
          />
        </div>
        <input className="edit" defaultValue={this.props.item.tanim} />
      </li>
    );
  }
}

class TodoList extends React.Component {
  render() {
    /*const tosViews = [];

    for (let i = 0; i < this.props.item.length; i++) {
      tosViews.push(<Todo item={this.props.item[i]} />);
    }*/

    return (
      <ul id="todo-list">
        <pre> {false && JSON.stringify(this.props, null, 2)}</pre>
        {this.props.item.map(todo => (
          <Todo
            key={todo.id}
            item={todo}
            toggle={this.props.toggleTodo}
            destroy={this.props.destroyTodo}
          />
        ))}
      </ul>
    );
  }
}

class AppModelBase {
  _subscribers = [];

  subscribe(haberalmaFn) {
    this._subscribers.push(haberalmaFn);
  }
  informSubcribe() {
    this._subscribers.forEach(subscribe => {
      subscribe();
    });
  }

  getState() {
    return this.state;
  }

  setState(degisikler) {
    this.state = { ...this.state, ...degisikler };
  }
}

export class TodoAppModel extends AppModelBase {
  state = {
    todos: [
      { id: 1, tanim: "Domates", durum: "aktif", tamamlandiMi: true },
      { id: 2, tanim: "Biber", durum: "aktif", tamamlandiMi: false },
      { id: 3, tanim: "Patlıcan", durum: "aktif", tamamlandiMi: true },
      { id: 4, tanim: "Havuc", durum: "aktif", tamamlandiMi: false },
      { id: 5, tanim: "Soğan", durum: "aktif", tamamlandiMi: true },
      { id: 6, tanim: "Patates", durum: "pasif", tamamlandiMi: true }
    ],
    secici: "aktif",
    tempTodo: "Marul",
    sayac: 7
  };

  getVisibleTodo() {
    let todo;

    if (this.state.secici === "tumu") {
      todo = this.state.todos;
    } else if (this.state.secici === "aktif") {
      todo = this.state.todos.filter(todo => todo.durum === "aktif");
    } else if (this.state.secici === "pasif") {
      todo = this.state.todos.filter(todo => todo.durum === "pasif");
    }

    return todo;
  }

  toggleTodo(id) {
    const todosToggle = this.state.todos;

    //forEach dizi üzerinde değişikli yapar biz dizinin aslını korumak istiyoruz
    //map kullanıp yeni dizil
    const todoV2 = todosToggle.map(todo => {
      if (id === todo.id) {
        return { ...todo, tamamlandiMi: !todo.tamamlandiMi };
      } else {
        return { ...todo };
      }
    });

    this.setState({ todos: todoV2 });
  }

  destroyTodo(id) {
    const todosToggle = this.state.todos;

    //forEach dizi üzerinde değişikli yapar biz dizinin aslını korumak istiyoruz
    //map kullanıp yeni dizil
    const todoV2 = todosToggle.filter(todo => todo.id !== id);

    this.setState({ todos: todoV2 });
  }

  setTempTodo(tempTodo) {
    //this.setState({ tempTodo: tempTodo });
    this.setState({ tempTodo });
  }

  setSecici(secici) {
    //her zaman obje alır
    this.setState({ secici });
    alert("s");
  }

  insertTodo() {
    if (
      this.state.todos.filter(todo => todo.tanim === this.state.tempTodo)
        .length > 0
    ) {
      return;
    }
    const newTodo = {
      id: this.state.sayac,
      tanim: this.state.tempTodo,
      durum: "aktif",
      tamamlandiMi: false
    };
    const todoV2 = [newTodo, ...this.state.todos];
    this.setState(
      { sayac: this.state.sayac + 1, todos: todoV2, tempTodo: "" },
      function() {
        console.log(this.state.tempTodo);
      }
    );
  }
}

class TodoApp extends React.Component {
  render() {
    const nItemsLeft = this.state.todos.filter(item => !item.tamamlandiMi)
      .length;

    return (
      <section id="todoapp">
        <pre> {JSON.stringify(this.state, null, 2)}</pre>
        <Header
          value={this.state.tempTodo}
          onChange={this.setTempTodo.bind(this)}
          onSubmit={this.insertTodo.bind(this)}
        />
        <section id="main" style={{ display: "block" }}>
          <button onClick={() => this.toggleTodo(1)}> Toogle Button</button>
          <br />
          <button onClick={() => this.destroyTodo(1)}>
            destroyTodo Button
          </button>
          <input id="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            item={this.getVisibleTodo()}
            toggleTodo={this.toggleTodo.bind(this)}
            destroyTodo={this.destroyTodo.bind(this)}
          />
        </section>

        <Footer
          count={nItemsLeft}
          secici={this.state.secici}
          setSecici={this.setSecici.bind(this)}
        />
      </section>
    );
  }
}

function App() {
  return <TodoApp />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
