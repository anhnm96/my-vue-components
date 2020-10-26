<template>
  <div>
    <DataTable :items="items" :columns="columns" @on-input="onInput">
      <template #cell-input-cutpot="{ cell }">
        <span style="background-color: green">{{ cell }}asd</span>
      </template>
    </DataTable>
  </div>
</template>

<script>
import {items as dataItems, search} from './items'
import DataTable from '@/components/DataTable'
import {ref, reactive} from 'vue'
import cursor from '@/hooks/useCursor'
export default {
  components: {DataTable},
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
    return { columns, items, onInput }
  }
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