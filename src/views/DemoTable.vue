<template>
  <div style="height: 1000px">
    <div>
      {{ a.state[0].count }}
      <button class="p-2 ml-2 bg-gray-400" @click="a.state[0].count++">
        +
      </button>
      <button class="p-2 ml-2 bg-gray-400" @click="a.state[0].count--">
        -
      </button>
      {{ a.state[0].count2 }}
      <button class="p-2 ml-2 bg-gray-400" @click="a.state[0].count2++">
        +
      </button>
      <button class="p-2 ml-2 bg-gray-400" @click="a.state[0].count2--">
        -
      </button>
      {{ a.state[1].count }}
      <button class="p-2 ml-2 bg-gray-400" @click="a.state[1].count++">
        +
      </button>
      <button class="p-2 ml-2 bg-gray-400" @click="a.state[1].count--">
        -
      </button>
      {{ a.state[1].count2 }}
      <button class="p-2 ml-2 bg-gray-400" @click="a.state[1].count2++">
        +
      </button>
      <button class="p-2 ml-2 bg-gray-400" @click="a.state[1].count2--">
        -
      </button>
      <button
        class="p-2 ml-2 bg-gray-400 d"
        :class="{ 'cursor-not-allowed': !a.past.length }"
        @click="a.undo()"
        :disabled="!a.past.length"
      >
        undo {{ !a.past.length }}
      </button>
      <button
        class="p-2 ml-2 bg-gray-400 d"
        :class="{ 'cursor-not-allowed': !a.future.length }"
        @click="a.redo()"
        :disabled="!a.future.length"
      >
        redo {{ !a.future.length }}
      </button>
      <div>{{ a.current }}</div>
      <div>{{ a.past }}</div>
      <div>{{ a.future }}</div>
    </div>
    <DataTable v-model:items="items" :columns="columns" @on-input="onInput">
      <template #cell-input-cutpot="{ cell }">
        <span style="background-color: green">{{ cell }}asd</span>
      </template>
      <template #cell-input-origin="{ cell, onInput }">
        <v-autocomplete
          @update:input="onInput"
          :input="cell"
          :options="countries"
        />
      </template>
      <!-- <template #context-menu="{ cursor, context }">
        <p
          class="p-2 hover:bg-gray-400"
          @click="insertRow(cursor.rowIndex.value, context)"
        >
          Add row above
        </p>
        <p
          class="p-2 hover:bg-gray-400"
          @click="insertRow(cursor.rowIndex.value + 1, context)"
        >
          Add row below
        </p>
      </template> -->
    </DataTable>
    <!-- <v-autocomplete
      :optionAdapter="
        (val) => ({ id: val.id, label: val.user['first_name'], value: val })
      "
      v-model:selected="selected"
      :options="nameList"
    />
    <v-autocomplete v-model:input="val" :options="countries" /> -->
  </div>
</template>

<script>
import nameList from './name'
import {items as dataItems, countries} from './items'
import DataTable from '@/components/DataTable'
import VAutocomplete from '@/components/VAutocomplete'
import {ref, reactive} from 'vue'
import Tracker from '@/hooks/useTracker'
export default {
  components: {DataTable, VAutocomplete},
  setup() {
    const columns = ref([
                // {name: 'cutpot'},
                // {name: 'origin'},
                // {name: 'family', required: true, rules: 'required'},
                // {name: 'variety', required: true, rules: 'required'},
                {name: 'color'},
                {name: 'quantity', required: true, rules: 'required', type: 'number', help: 'Sll'},
                // {name: 'unit', help: 'Bn cay'},
                // {name: 'grade'},
                // {name: 'price', required: true, rules: 'required', help: 'Gia'},
                // {name: 'note', help: 'Note ne'}
            ])
            const newarr = dataItems.map(({color, quantity}) => ({ color, quantity})).slice(0, 2)
    const items = ref(newarr)
    const onInput = ({rowIndex, column, value}) => {
      console.log('update', value)
      items.value[rowIndex][column.name] = value
    }
    const val = ref('')
    const arr = ref(['Vue', 'ReactiveX', 'Angular', 'Vue 3'])

    const insertRow = (rowIndex, context) => {
      items.value.splice(rowIndex, 0, dumpItem)
      context.show = false
    }
    const a = new Tracker(reactive([{count: 0, count2: 0}, {count: 0, count2: 0}]))
    const selected = reactive({})
    return { countries, nameList, columns, items, onInput, val, arr, insertRow, a, reactive, selected }
  }
}

const dumpItem = {
  "color": "",
  "cutpot": "cut",
  "family": "",
  "grade": "",
  "id": `${Math.random()}`,
  "note": null,
  "origin": "",
  "price": null,
  "product_id": "",
  "quantity": null,
  "unit": "",
  "variety": "",
  "$errors": {}
}
</script>

<style scoped>
table {
  text-align: center;
  border-collapse: collapse;
  position: relative;
}

table,
th,
td {
  border: 1px solid gray;
}
</style>