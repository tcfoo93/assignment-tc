<template>
  <el-main id="todo-main">
    <ToDoPanel />
  </el-main>
</template>
<script lang="ts">
  import ToDoPanel from '@/components/ToDo/ToDoPanel.vue'

  export default {
    components: {
      ToDoPanel
    }
  }
</script>