import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewTodo, checkedTodo } from "../actions";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketNum: "",
      todoText: "",
      checkedTodoNum: null,
      sendTodoText: ""
    };
  }

  onCheckClickHandler = e => {
    console.log("clicked", e.target.value);
    this.setState(
      {
        bucketNum: this.props.selectedBucket,
        //checkedTodoNum: e.target.value,
        sendTodoText: e.target.value
      },
      () => this.props.checkedTodo(this.state)
    );
  };

  todoListRender() {
    return this.props.selectedBucket === null ||
      this.props.selectedBucket === -1 ||
      this.props.selectedBucket === 0 ? (
      <div></div>
    ) : (
      this.props.bucket
        .filter(bucketItem => bucketItem.num === this.props.selectedBucket)[0]
        .todoList.map((item, index) => (
          <div className="todo_item_style" key={index}>
            <span>
              <input
                type="checkbox"
                onChange={this.onCheckClickHandler}
                value={item.item}
              ></input>
            </span>
            {item.item}
          </div>
        ))
    );
  }
  onChangeHandler = e => {
    this.setState({
      todoText: e.target.value,
      bucketNum: this.props.selectedBucket
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.addNewTodo(this.state);
    this.setState({
      todoText: ""
    });
  };

  render() {
    //console.log(this.props);
    return (
      <div>
        <div className="todo_style">{this.todoListRender()}</div>
        <form onSubmit={this.onFormSubmit} id="add_text_style">
          <input
            type="text"
            className="newtodo_style"
            value={this.state.todoText}
            placeholder="Add a new Todo"
            onChange={this.onChangeHandler}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    bucket: state.bucket.slice(2),
    selectedBucket: state.selectBucket.selectedBucket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewTodo: todoText => {
      dispatch(addNewTodo(todoText));
    },
    checkedTodo: checkedText => {
      dispatch(checkedTodo(checkedText));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
