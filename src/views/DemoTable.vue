<template>
  <div style="height: 1000px">
    <!-- @keydown.stop to prevent storybook behavior in demo -->
    <DataTable
      v-model:items="items"
      :columns="columns"
      @keydown.stop
      @onInput="onInput"
    >
      <template #cell-input-origin="{ cell, onInput }">
        <v-autocomplete
          :input="cell"
          :options="countries"
          @update:input="onInput"
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
    <v-autocomplete
      v-model:selected="selected"
      :option-adapter="
        (val) => ({ id: val.id, label: val.user['first_name'], value: val })
      "
      :options="nameList"
      class="border border-gray-400 border-solid"
      arial-label="select name"
    />
    selected name: {{ selected }} <br>
    <label>
      Select country
      <v-autocomplete
        v-model:input="val"
        class="border border-gray-400 border-solid"
        :options="countries"
      />
    </label>
  </div>
  <div
    class="w-full h-5 bg-green"
    :tabindex="0"
    @paste="test"
  />
</template>

<script>
import nameList from './name'
import { items as dataItems, countries } from './items'
import DataTable from '@/components/DataTable'
import VAutocomplete from '@/components/VAutocomplete'
import { ref, reactive } from 'vue'
export default {
  components: { DataTable, VAutocomplete },
  setup() {
    const columns = ref([
      { name: 'cutpot' },
      { name: 'origin' },
      { name: 'family', required: true, rules: 'required' },
      { name: 'variety', required: true, rules: 'required' },
      { name: 'color' },
      {
        name: 'quantity',
        required: true,
        rules: 'required',
        type: 'number',
        help: 'Sll',
      },
      { name: 'unit', help: 'Bn cay' },
      { name: 'grade' },
      { name: 'price', required: true, rules: 'required', help: 'Gia' },
      { name: 'note', help: 'Note ne' },
    ])
    const items = ref(dataItems)
    const onInput = ({ rowIndex, column, value }) => {
      console.log('update', items.value.length, rowIndex)
      items.value[rowIndex][column.name] = value
    }
    const val = ref('')
    const arr = ref(['Vue', 'ReactiveX', 'Angular', 'Vue 3'])

    const insertRow = (rowIndex, context) => {
      items.value.splice(rowIndex, 0, dumpItem)
      context.show = false
    }
    const selected = ref([])
    function test(e) {
      console.log('paste', e)
    }
    return {
      test,
      countries,
      nameList,
      columns,
      items,
      onInput,
      val,
      arr,
      insertRow,
      reactive,
      selected,
    }
  },
}

const dumpItem = {
  color: '',
  cutpot: 'cut',
  family: '',
  grade: '',
  id: `${Math.random()}`,
  note: null,
  origin: '',
  price: null,
  product_id: '',
  quantity: null,
  unit: '',
  variety: '',
  $errors: {},
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
