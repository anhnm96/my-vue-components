<template>
  <div style="height: 1000px">
    <DataTable :items="items" :columns="columns" @on-input="onInput">
      <template #cell-input-cutpot="{ cell }">
        <span style="background-color: green">{{ cell }}asd</span>
      </template>
      <template #context-menu="{ cursor, context }">
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
      </template>
    </DataTable>
    <v-autocomplete :value="val" :items="arr" />
  </div>
</template>

<script>
import {items as dataItems, search} from './items'
import DataTable from '@/components/DataTable'
import VAutocomplete from '@/components/VAutocomplete'
import {ref, reactive} from 'vue'
export default {
  components: {DataTable, VAutocomplete},
  setup() {
    const columns = ref([
                {name: 'cutpot'},
                {name: 'origin'},
                {name: 'family', required: true, rules: 'required'},
                {name: 'variety', required: true, rules: 'required'},
                {name: 'color'},
                {name: 'quantity', required: true, rules: 'required', type: 'number', help: 'Sll'},
                {name: 'unit', help: 'Bn cay'},
                {name: 'grade'},
                {name: 'price', required: true, rules: 'required', help: 'Gia'},
                {name: 'note', help: 'Note ne'}
            ])
    const items = ref(dataItems)
    const onInput = ({rowIndex, column, value}) => {
      console.log(rowIndex, column.name, value)
      items.value[rowIndex][column.name] = value
    }
    const val = ref('')
    const arr = ref(['Vue', 'ReactiveX', 'Angular', 'Vue 3'])

    const insertRow = (rowIndex, context) => {
      items.value.splice(rowIndex, 0, dumpItem)
      context.show = false
    }
    return { columns, items, onInput, val, arr, insertRow }
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