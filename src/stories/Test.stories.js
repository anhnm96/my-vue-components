import { storiesOf } from '@storybook/vue3';
import {h} from 'vue'
import Test2 from './Test2.vue'
storiesOf('Test2', module).add('App', () => ({
    render: () => h(Test2)
  }));