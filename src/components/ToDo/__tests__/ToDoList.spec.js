import Vuex from 'vuex'
import Vue from 'vue'
import {shallowMount} from '@vue/test-utils'
import ToDoList from '@/components/ToDo/ToDoList.vue'

Vue.use(Vuex)
describe('ToDoList', () => {
  const store = (empty = false) =>{
    return new Vuex.Store({
      getters: {
        "toDoList": () => (empty) 
        ? []
        : [
          {
            "id": "c31b97ab-8f42-4d47-817d-7e9c34a40c22",
            "message": "asd",
            "sequence": 1,
            "status": "CHECKED"
          },
          {
            "id": "a2a30d8d-458e-4173-a9e0-24e305dce566",
            "message": "asd",
            "sequence": 2,
            "status": "ADDED"
          }
        ]
      },
      actions
    })
  }
  let actions = {
    "fetchToDoList": jest.fn(), 
    "updateToDoItem": jest.fn()
  }
  const updateTodo = jest.fn()
  it('renders two todo items upon pageload', async() => {
      const wrapper = shallowMount(ToDoList, {
        store
      })
      await wrapper.vm.$nextTick() 
      expect(actions.fetchToDoList).toHaveBeenCalled()
      const todos = wrapper.findAll('.item')
      expect(todos.length).toBe(2)
  })
  it('renders no items when todolist is empty', () => {
      const wrapper = shallowMount(ToDoList, {
        store: store(true)
      })
      expect(actions.fetchToDoList).toHaveBeenCalled()
      const todos = wrapper.findAll('.no-item-text')
      expect(todos.length).toBe(1)
  })

  it('update methods was called upon delete icon onclick.', async() => {
    const wrapper = shallowMount(ToDoList, {
      store,
      methods: { updateTodo }
    })
    const deleteIcon = wrapper.find('#delete-icon')
    deleteIcon.trigger('click');
    expect(updateTodo.mock.calls.length).toBe(1)
  })

  it('update actions was called upon delete icon onclick.', async() => {
    const wrapper = shallowMount(ToDoList, {
      store
    })
    const deleteIcon = wrapper.find('#delete-icon')
    deleteIcon.trigger('click');
    expect(actions.updateToDoItem).toHaveBeenCalled()
  })

  it('update methods was called upon checkbox onclick.', async() => {
    const wrapper = shallowMount(ToDoList, {
      store,
      methods: { updateTodo }
    })
    const toDoCheckBox = wrapper.find('#todo-checkbox')
    toDoCheckBox.trigger('click'); 
    expect(updateTodo.mock.calls.length).toBe(1)
  })

  it('update action was called upon checkbox onclick.', async() => {
    const wrapper = shallowMount(ToDoList, {
      store
    })
    const toDoCheckBox = wrapper.find('#todo-checkbox')
    toDoCheckBox.trigger('click');
    expect(actions.updateToDoItem).toHaveBeenCalled()
  })
})