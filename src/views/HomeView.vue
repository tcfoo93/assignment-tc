<template>
  <main>
    <input
				v-model="formData.message"
				class="task-new__input"
				type="text"
				placeholder="New task"
				autofocus
				@keyup.enter="insertTodo()"
    >
    <el-button @click="insertTodo()">Click Me</el-button>
    <ul>
     <li
				v-for="item in toDoList"
				:key="item.id"
				class="task-list__item"
			>
      <el-checkbox :checked="(item.status === Status.CHECKED)" @change="(value) => {updateTodo(item.id, (value) ? Status.CHECKED : Status.UNCHECKED )}"/>
        <p>
          {{ item.message }}
        </p>
        <el-button @click="updateTodo(item.id, Status.DELETED)">Delete Me</el-button>
		</li>
    </ul>
  </main>
</template>
<script lang="ts">
  import { mapGetters, mapActions } from "vuex";
  import type { IPostToDoItemRequestBody, IPatchToDoItemRequestBody } from "@/main.interfaces";
  import { Status } from "@/main.constants"

  export default {
    name: 'toDoList',
    data() {
			return {
				formData: {
					message: '',
				}
			};
		},
    computed: {
      ...mapGetters(["toDoList"])
    },
    created() {
      this.fetchToDoList();
      this.Status = Status;
    },
    methods: {
      ...mapActions(["fetchToDoList", "addToDoItem", "updateToDoItem"]),
      insertTodo() {
				const message = this.formData.message.trim();

				if (message) {
          const requestBody: IPostToDoItemRequestBody = {
            message
          };
					this.addToDoItem(requestBody);
          this.cleanFields();
				}
			},
      updateTodo(id:string, status: string){
				if (status) {
          console.log(status)
          const requestBody: IPatchToDoItemRequestBody = {
            id,
            status
          };
					this.updateToDoItem(requestBody);
				}
      },
      cleanFields() {
				this.formData.message = '';
			},
    }
  }
</script>