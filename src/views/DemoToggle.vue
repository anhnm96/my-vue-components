<template>
  <div>
    <!-- <button @click="click" type="button" id="toggle" role="switch" aria-checked="true">
        <span>on</span><span>off</span>  
    </button> -->
    <toggle-button v-model="state" :labels="{checked: 'zxc', unchecked: 'asd'}" />
    <toggle-button v-model="state" active-color="#bb99cc" width="100px" :labels="{checked: 'only left label', unchecked: ''}" />
    <label id="lb" dir="rtl">
      <toggle-button aria-labelledby="lb btn" id="btn" v-model="state" class="test" active-color="#fe877b" in-active-color="#be3e61" width="200px" height="40px" :labels="{checked: 'Holdd the door?', unchecked: 'Hodor'}" />
      Hodor or not
    </label>
    <toggle-button :modelValue="state" @update:modelValue="test" class="test" active-color="linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6)" margin="6px" in-active-color="linear-gradient(to left, #0cebeb, #20e3b2, #29ffc6)" width="200px" height="40px" :labels="{checked: 'Holdd the door?', unchecked: 'Hodor'}" />
    <toggle-button v-model="state" disabled>
    </toggle-button>
  </div>
</template>

<script>
import ToggleButton from '@/components/ToggleButton/index'
import {ref} from 'vue'
export default {
  components: {ToggleButton},
  setup() {
    const state = ref(false)
    const test = (val) => {
      const ans = confirm('want update')
      if (ans) state.value = val
      console.log('update', val)
    }
    return {state, test}
  }
}
</script>

<style>
.toggle-button.test span {
  font-size: 100%;
}
</style>