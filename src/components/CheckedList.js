import React, { Component } from "react";
import { connect } from "react-redux";
import { todoChecked } from "../actions";

class CheckedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketNum: "",
      checkedText: "",
      todoCheckedNum: null,
      sendCheckedText: ""
    };
  }
  onCheckClickHandler = e => {
    console.log("clicked", e.target.value);
    this.setState(
      {
        bucketNum: this.props.selectedBucket,
        sendCheckedText: e.target.value
      },
      //() => console.log(this.state)
      () => this.props.todoChecked(this.state)
    );
  };
  checkedListRender() {
    return this.props.selectedBucket === null ||
      this.props.selectedBucket === -1 ||
      this.props.selectedBucket === 0 ? (
      <div></div>
    ) : (
      this.props.bucket
        .filter(bucketItem => bucketItem.num === this.props.selectedBucket)[0]
        .checkedList.map((item, index) => (
          <div className="checked_item_style" key={index}>
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
  render() {
    return <div className="checked_style">{this.checkedListRender()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    bucket: state.bucket.slice(2),
    selectedBucket: state.selectBucket.selectedBucket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    todoChecked: todoText => {
      dispatch(todoChecked(todoText));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckedList);
