import React, { Component } from "react";
import { connect } from "react-redux";
import { selectBucket, newBucket } from "../actions";

class NewBucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionBucket: null
    };
  }

  zeroBucket() {
    return <option value="Create new Bucket">Create new Bucket</option>;
  }
  someBucket() {
    return this.props.bucket.map(item => (
      <option key={item.num} value={item.num}>
        {item.name}
      </option>
    ));
  }
  newBucket() {
    if (this.state.optionBucket === 0) {
      var newName = prompt("Please enter new bucket name:");
      this.props.newBucket(newName);
    }
  }
  renderOption() {
    //console.log(this.props.bucket);
    return this.props.bucket.length <= 2
      ? this.zeroBucket()
      : this.someBucket();
  }
  selectBucket = e => {
    console.log(e.target.value);
    this.setState(
      {
        optionBucket: Number(e.target.value)
      },
      () => this.newBucket()
    );
    this.props.selectBucket(Number(e.target.value));
  };
  render() {
    //console.log(this.props);
    return (
      <div>
        <div className="new_bucket_button">
          <select onChange={this.selectBucket}>{this.renderOption()}</select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    bucket: state.bucket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectBucket: num => {
      dispatch(selectBucket(num));
    },
    newBucket: bucketName => {
      dispatch(newBucket(bucketName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewBucket);
