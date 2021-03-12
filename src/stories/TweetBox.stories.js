import TweetBox from '@/components/TweetBox'
import {ref} from 'vue'
export default {
    title: 'TweetBox',
    component: TweetBox
}

const Template = () => ({
    // Components used in your story `template` are defined in the `components` object
    components: { TweetBox },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      // Story args can be spread into the returned object
      const val = ref('')
      return { val };
    },
    // Then, the spread values can be accessed directly in the template
    template: '<TweetBox v-model="val" />',
  });
  
  export const Sample = Template.bind({});