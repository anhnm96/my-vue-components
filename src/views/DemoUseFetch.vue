<template>
  <div ref="zxc">
    <input
      v-model="searchTerms"
      class="border border-black"
      type="text"
    >
    <button @click="search">
      Search
    </button>
    <p v-if="results">
      results: {{ results }}
    </p>
    <p>loading: {{ loading }}</p>
    <p>errors: {{ hasErrors }}</p>
    <p>v1: {{ v1 }}</p>
    <p>v2: {{ v2 }}</p>
  </div>
</template>

<script>
import useFetch from '@/hooks/useFetch'
import useEvent from '@/hooks/useEvent'
import {ref} from 'vue'
export default {
  setup() {
    const { results, loading, hasErrors, execute } = useFetch()
    const v1 = ref([])
    const v2 = ref([])
    const zxc = ref(null)
    useEvent(zxc, 'click', (e) => console.log(e))
    const searchTerms = ref('')
    async function search() {
      await execute(`https://jsonplaceholder.typicode.com/todos/${searchTerms.value}`)
      if (searchTerms.value === '1') v1.value = results.value
      else v2.value = results.value
      console.log('v1', v1.value, 'v2', v2.value)
    }
    // useEvent(document, 'click', (e) => console.log(e))
    // const {loading: loading2} = useFetch
    return {zxc, searchTerms, search, results, loading, v1,v2, hasErrors}
  }
}
</script>

<style>

</style>