import axios from "axios";
import type { IPatchToDoItemRequestBody, IPostToDoItemRequestBody, IToDoItem, IToDoState } from "@/main.interfaces";
import { Status } from "@/main.constants";
import type { ActionContext, Module } from "vuex"; 
import { uuid } from 'vue-uuid';

const ToDoModules: Module<IToDoState, IToDoState> = {
    state: ():IToDoState => ({
        toDoList: [] as Array<IToDoItem>,
    }),
    mutations: {
        setToDoList: (state: IToDoState, toDoList: Array<IToDoItem>) => (
            state.toDoList = toDoList.filter((toDoItem: IToDoItem) => toDoItem.status !== Status.DELETED)
        ),
        addToDoItem: (state: IToDoState, toDoItem: IToDoItem) => (
            state.toDoList.unshift(toDoItem)
        ),
        removeToDoItem: (state: IToDoState, id: string) => (
            state.toDoList = state.toDoList.filter((toDoItem: IToDoItem) => toDoItem.id !== id)
        )
    },
    getters:{
        toDoList: (state: IToDoState) => {
            return state.toDoList.sort((a:IToDoItem, b:IToDoItem) => a.sequence - b.sequence)
        },
    },
    actions:{
        async fetchToDoList({ commit }: ActionContext<IToDoState, IToDoState>) {
            const response = await axios.get("http://localhost:3001/toDoList?_sort=sequence&_order=asc");
            commit("setToDoList", response.data);
        },
        async addToDoItem({ commit, state }: ActionContext<IToDoState, IToDoState>, toDoItem: IPostToDoItemRequestBody) {
            let requestBody = {
                id: uuid.v4(),
                message: toDoItem.message,
                sequence: state.toDoList.length + 1,
                status: Status.ADDED 
            }
            const response = await axios.post("http://localhost:3001/toDoList", requestBody);
            commit("addToDoItem", response.data);
        },
        async updateToDoItem({ commit }: ActionContext<IToDoState, IToDoState>, toDoItem: IPatchToDoItemRequestBody) {
            let requestBody = {
                status: toDoItem.status
            }
            await axios.patch(`http://localhost:3001/toDoList/${toDoItem.id}`, requestBody);
            if(toDoItem.status === Status.DELETED)
                commit("removeToDoItem", toDoItem.id);
        },
    }
}

export default ToDoModules;