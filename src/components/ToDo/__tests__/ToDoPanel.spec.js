import Vuex from 'vuex'
import Vue from 'vue'
import {shallowMount} from '@vue/test-utils'
import ToDoPanel from '@/components/ToDo/ToDoPanel.vue'

Vue.use(Vuex)
describe('ToDoPanel', () => {
  const store = () =>{
    return new Vuex.Store({
      actions
    })
  }
  let actions = {
    addToDoItem: jest.fn(),
  }
  const insertTodo = jest.fn()
  const cleanFields = jest.fn()
  it('renders required components upon pageload', () => {
      const wrapper = shallowMount(ToDoPanel, {
        store
      })
      const todoInput = wrapper.find('#todo-input')
      const addButton = wrapper.find('#add-button')
      expect(todoInput.exists()).toBe(true)
      expect(addButton.exists()).toBe(true)
  })
  it('add methods was called upon add button onclick.', async() => {
    const wrapper = shallowMount(ToDoPanel, {
      store,
      methods: { insertTodo }
    })
    const addButton = wrapper.find('#add-button')
    addButton.trigger('click');
    expect(insertTodo.mock.calls.length).toBe(1)
  })

  it('add actions was called upon add button onclick.', async() => {
    let message = "Interview at 3PM"
    const wrapper = shallowMount(ToDoPanel, {
      store,
      data() {
        return{
          formData: {
            message,
          }
        };
      },
      methods: {
        cleanFields
      }
    })
    const addButton = wrapper.find('#add-button')
    addButton.trigger('click');
    expect(actions.addToDoItem).toHaveBeenCalled()
    expect(cleanFields).toHaveBeenCalled()
  })

  it('add methods was called upon enter pressed.', async() => {
    const wrapper = shallowMount(ToDoPanel, {
      store,
      methods: { insertTodo }
    })
    let value = "Interview at 3PM"
    const todoInput = wrapper.find('#todo-input')
    expect(todoInput.exists()).toBe(true)
    todoInput.element.value = value
    todoInput.trigger('keyup.enter')
    expect(insertTodo).toHaveBeenCalled()
  })
})