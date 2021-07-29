<template>
  <div class="min-h-screen">
    <div class="mx-auto w-60">
      <p>Single select</p>
      <Autocomplete
        class="w-full px-2 py-1 border border-gray-400 border-solid"
        placeholder="Select country"
        :options="countries"
        :use-filter="true"
      />
    </div>
    <div class="mx-auto mt-10 w-60">
      <p>Multiple select</p>
      <Autocomplete
        v-model:selected="selectedPeople"
        :option-adapter="peopleAdapter"
        :options="people"
        :multiple="true"
        :placeholder="selectedPeople.length ? `${selectedPeople.length} options selected` : 'Select member basic'"
        class="block w-full px-2 py-1 border border-gray-400"
      >
        <template #option="{item, isActive, select}">
          <div
            class="flex items-center px-4 py-2 space-x-4 truncate cursor-pointer select-none"
            :class="[isActive && 'opacity-50 bg-gray-200', item.selected && 'bg-blue-300 text-blue-500']"
            @click="select(item)"
          >
            <div class="w-5 h-5">
              <img
                class="rounded-full"
                :src="item.value.avatar"
                :alt="item.value.name"
              >
            </div>
            <div>
              <p>{{ item.value.name }}</p>
            </div>
          </div>
        </template>
      </Autocomplete>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Autocomplete from '@/components/VAutocomplete.vue'
import { countries } from './items'

export default defineComponent({
  components: { Autocomplete },
  setup() {
    // people
    const people = [
      {
        name: 'Sandra Adams',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      },
      {
        name: 'Ali Connors',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      },
      {
        name: 'Trevor Hansen',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      },
      {
        name: 'Tucker Smith',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      },
    ]
    function peopleAdapter(item) {
      return {
        id: item.name,
        label: item.name,
        value: item,
      }
    }
    const selectedPeople = ref([])

    return {
      people,
      selectedPeople,
      peopleAdapter,
      countries,
    }
  },
})
</script>
