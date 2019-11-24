import React, { Component } from "react";
import { connect } from "react-redux";
import { changeBucketName } from "../actions";

export class Bucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: "",
      selectedBucket: null
    };
  }

  onClickHandler = () => {
    var oldName = this.props.buckets[this.props.selectedBucket + 1].name;
    var newName = prompt("Please enter new bucket name:", oldName);
    if (newName !== oldName) {
      console.log(newName, oldName);
      this.setState(
        {
          newName: newName,
          selectedBucket: this.props.selectedBucket
        },
        () => this.props.changeBucketName(this.state)
      );
    }
  };

  renderBucket() {
    //console.log(this.props.bucket, this.props.selectedBucket);
    return this.props.selectedBucket === null ||
      this.props.selectedBucket === -1 ||
      this.props.selectedBucket === 0 ? (
      <div></div>
    ) : (
      this.props.bucket.filter(
        bucketItem => bucketItem.num === this.props.selectedBucket
      )[0].name
    );
  }
  render() {
    return (
      <div className="bucket_style">
        <div>Bucket: {this.renderBucket()}</div>
        <button onClick={this.onClickHandler}>Rename Bucket</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    bucket: state.bucket.slice(2),
    selectedBucket: state.selectBucket.selectedBucket,
    buckets: state.selectBucket.bucket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeBucketName: newName => {
      dispatch(changeBucketName(newName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bucket);
