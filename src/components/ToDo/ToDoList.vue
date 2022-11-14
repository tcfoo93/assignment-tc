<template>
    <div v-if="toDoList.length">
        <div v-for="(item, index) in toDoList" :key="item.id" v-bind:class="getTodoDataRowClass(index)">
            <el-row :gutter="20" class="todo-data-row">
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
                <el-col :span="20">
                    <span class="word-break-all">
                    {{ item.message }}
                    </span>
                </el-col>
                <el-col :span="2">
                    <div @click="updateTodo(item.id, Status.DELETED)">
                    <i class="el-icon-close delete-icon"/>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
    <el-row v-else :gutter="20" class="todo-data-row">
        <p class="no-item-text">No Items</p>
    </el-row>
</template>
<script lang="ts">
  import { mapGetters, mapActions } from "vuex";
  import type { IPatchToDoItemRequestBody } from "@/main.interfaces";
  import { Status } from "@/main.constants"

  export default {
    name: 'ToDoList',
    computed: {
        ...mapGetters(["toDoList"])
    },
    created() {
        this.fetchToDoList();
        this.Status = Status;
    },
    methods: {
        ...mapActions(["fetchToDoList", "updateToDoItem"]),
        updateTodo(id:string, status: string){
            if (status) {
                const requestBody: IPatchToDoItemRequestBody = {
                    id,
                    status
                };
                this.updateToDoItem(requestBody);
            }
        },
        getTodoDataRowClass(index: number){
            return {
                'item': true,
                'top-border-1': (index !== 0)
            }
        }
    }
}
</script>
<style scoped>
.item {
  height: 60px;
  padding-left: 12px;
  font-size: 14px;
}

.el-icon-close {
  display: none;
}
.item:hover .el-icon-close {
  display: inline-block;
}

.item:hover {
  background-color: #DEE6F1;
}

.todo-data-row{
  line-height: 60px;
  margin-left: 0!important;
  margin-right: 0!important;
}

.delete-icon {
  font-size: 20px;
  color: #4875B3;
  -webkit-text-stroke: 0.05rem #4875B3;
}

.no-item-text {
    text-align: center;
    color: #C7BAB0;
}
</style>