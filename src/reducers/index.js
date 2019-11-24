import { combineReducers } from "redux";

const initialState = {
  selectedBucket: null,
  bucket: [
    {
      num: -1,
      name: "Create New Bucket or Select Existing Bucket",
      todoList: [],
      checkedList: []
    },
    {
      num: 0,
      name: "Create New Bucket",
      todoList: [],
      checkedList: []
    },
    {
      num: 1,
      name: "One",
      todoList: [
        { num: 1, item: "Milk" },
        { num: 2, item: "Eggs" },
        { num: 3, item: "Pen" }
      ],
      checkedList: [
        { num: 1, item: "Bread" },
        { num: 2, item: "Curd" }
      ]
    },
    {
      num: 2,
      name: "Two",
      todoList: [
        { num: 1, item: "Pillow" },
        { num: 2, item: "Chair" },
        { num: 3, item: "Sofa" }
      ],
      checkedList: [
        { num: 1, item: "Mobile" },
        { num: 2, item: "Cover" }
      ]
    }
  ]
};

// const selectedBucketReducer = () => {
//   return initialState.selectedBucket;
// };

const bucketReducer = () => {
  return initialState.bucket;
};

const newBucketReducer = (state = initialState, action) => {
  if (action.type === "NEW_BUCKET") {
    //console.log(action.payload);
    let num = state.bucket[state.bucket.length - 1].num + 1;
    const newState = { ...state };
    newState.bucket.push({
      num: num,
      name: action.payload,
      todoList: [],
      checkedList: []
    });
    console.log(newState);
    return newState;
  } else {
    return state;
  }
};

const selectBucketReducer = (state = initialState, action) => {
  if (action.type === "BUCKET_SELECTED") {
    //console.log("state=", state, "payload=", action.payload);
    //console.log(state, action);
    return { ...state, selectedBucket: action.payload };
  } else {
    return state;
  }
};

const addNewTodoReducer = (state = initialState, action) => {
  if (action.type === "ADD_NEW_TODO") {
    const newTodo = {
      num: state.bucket[action.payload.bucketNum + 1].todoList.length + 1,
      item: action.payload.todoText
    };
    return {
      ...state,
      bucket: [
        ...state.bucket,
        state.bucket[action.payload.bucketNum + 1].todoList.push(newTodo)
      ]
    };
  } else {
    return state;
  }
};

const checkedTodoReducer = (state = initialState, action) => {
  if (action.type === "CHECKED_TODO") {
    const newTodoList = [
      ...state.bucket[action.payload.bucketNum + 1].todoList
    ];
    const yesNewTodoList = newTodoList.filter(
      todoItem => todoItem.item !== action.payload.sendTodoText
    );
    const newCheckedList = [
      ...state.bucket[action.payload.bucketNum + 1].checkedList
    ];
    const yesNewCheckedList = [
      ...newCheckedList,
      {
        num: state.bucket[action.payload.bucketNum + 1].checkedList.length + 1,
        item: action.payload.sendTodoText
      }
    ];
    const newState = { ...state };
    newState.bucket[action.payload.bucketNum + 1].todoList = yesNewTodoList;
    newState.bucket[
      action.payload.bucketNum + 1
    ].checkedList = yesNewCheckedList;
    return newState;
  } else {
    return state;
  }
};

const todoCheckedReducer = (state = initialState, action) => {
  if (action.type === "TODO_CHECKED") {
    console.log(action.payload);
    const newCheckedList = [
      ...state.bucket[action.payload.bucketNum + 1].checkedList
    ];
    const yesNewCheckedList = newCheckedList.filter(
      checkedItem => checkedItem.item !== action.payload.sendCheckedText
    );
    console.log("yesNewCheckedList=", yesNewCheckedList);
    const newTodoList = [
      ...state.bucket[action.payload.bucketNum + 1].todoList
    ];
    //const maxNum = state.bucket[action.payload.bucketNum + 1].todoList.num
    const yesNewTodoList = [
      ...newTodoList,
      {
        num: state.bucket[action.payload.bucketNum + 1].todoList.length + 1,
        item: action.payload.sendCheckedText
      }
    ];
    console.log("yesNewTodoList=", yesNewTodoList);
    const newState = { ...state };
    newState.bucket[
      action.payload.bucketNum + 1
    ].checkedList = yesNewCheckedList;
    newState.bucket[action.payload.bucketNum + 1].todoList = yesNewTodoList;
    console.log(newState);
    return newState;
  } else {
    return state;
  }
};

const changeBucketNameReducer = (state = initialState, action) => {
  if (action.type === "CHANGE_BUCKET_NAME") {
    console.log(action.payload);
    const newState = { ...state };
    newState.bucket[action.payload.selectedBucket + 1].name =
      action.payload.newName;
    return newState;
  } else {
    return state;
  }
};

export default combineReducers({
  bucket: bucketReducer,
  selectBucket: selectBucketReducer,
  //selectedBucket: selectedBucketReducer,
  addNewTodo: addNewTodoReducer,
  checkedTodo: checkedTodoReducer,
  todoChecked: todoCheckedReducer,
  changeBucketName: changeBucketNameReducer,
  newBucket: newBucketReducer
});
