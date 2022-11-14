<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="22" :offset="1">
        <el-card class="box-card" shadow="never">
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
          <div v-for="item in toDoList" :key="item.id" class="text item">
            <el-row :gutter="20">
              <el-col :span="1">
                <el-checkbox 
                  :checked="(item.status === Status.CHECKED)" 
                  @change="(value) => {
                    updateTodo(item.id, (value) 
                      ? Status.CHECKED 
                      : Status.UNCHECKED 
                    )
                  }"
                />
              </el-col>
              <el-col :span="21">
                <p>
                  {{ item.message }}
                </p>
              </el-col>
              <el-col :span="2">
                <div @click="updateTodo(item.id, Status.DELETED)">
                  <i class="el-icon-close"/>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
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
<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

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