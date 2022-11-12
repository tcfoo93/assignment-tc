export interface IToDoState {
  toDoList: Array<IToDoItem>;
}

export interface IToDoItem {
  id: string;
  sequence: number;
  message: string;
  status: string;
}

export interface IPostToDoItemRequestBody {
  message: string;
}

export interface IPatchToDoItemRequestBody {
  id: string;
  status: string;
}