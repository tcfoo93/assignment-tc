import {shallowMount} from '@vue/test-utils';
import Home from "@/pages/Home.vue";

describe('Home', () => {
  it('pageload successfully', () => {
      const wrapper = shallowMount(Home)
      const main = wrapper.find('#todo-main')
      expect(main.exists()).toBe(true)
  })
})