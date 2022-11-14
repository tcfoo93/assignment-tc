<template>
    <el-row :gutter="20">
        <el-col :span="22" :offset="1">
          <el-card class="box-card" shadow="never" :body-style="{padding: '0'}">
            <div slot="header" class="clearfix">
              <el-row :gutter="20">
                <el-col :span="20">
                  <el-input
                    v-model="formData.message"
                    class="task-new__input"
                    type="text"
                    placeholder="New task"
                    autofocus
                    @keyup.enter="insertTodo()"
                  />
                </el-col>
                <el-col :span="4">
                  <el-button  
                    type="primary" 
                    @click="insertTodo()" 
                  >
                    Add
                  </el-button>
                </el-col>
              </el-row>
            </div>
            <ToDoList />
          </el-card>
        </el-col>
    </el-row>
</template>
<script lang="ts">
  import ToDoList from "./ToDoList.vue";
  import { mapActions } from "vuex";
  import type { IPostToDoItemRequestBody } from "@/main.interfaces";

  export default {
    name: 'ToDoPanel',
    data() {
			return {
				formData: {
					message: '',
				}
			};
		},
    computed: {},
    created() {},
    components: {
      ToDoList
    },
    methods: {
      ...mapActions(["addToDoItem"]),
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
      cleanFields() {
				this.formData.message = '';
			}
    }
  }
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 50%;
  margin: 0 auto 3rem;
  border: 1px solid #D5DEED!important;
}

@media (min-width: 768px) and (max-width: 1024px) {
  .box-card {
    width: 80%;
    max-width: inherit;
  }
}

@media (max-width: 767px) {
  .box-card {
    width: 100%;
    max-width: inherit;
  }
}
</style>