import VAutocomplete from '@/components/VAutocomplete'

export default {
    title: 'Autocomplete',
    component: VAutocomplete
}

export const BasicSample = (args) => ({
  components: {VAutocomplete},
  template: `
    <div style="height:200px;margin-top:5rem">
      Select country
      <v-autocomplete
        class="border border-gray-400 border-solid"
        v-model:input="val"
        :options="countries"
      />
    </div>
  `,
  setup() {
    // Story args can be spread into the returned object
    return { ...args, countries: ["Afghanistan",
    "Aland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola"] };
  },
})

// export const MultipleSelect = (args) => ({
//   components: {VAutocomplete},
//   template: `
//     <div style="height:300px; margin-top: 10rem">
//       <v-autocomplete
//         :optionAdapter="
//           (val) => ({ id: val.id, label: val.user['first_name'], value: val })
//         "
//         v-model:selected="selected"
//         :options="nameList"
//         class="border border-gray-400 border-solid"
//         arialLabel="select name"
//       />
//     </div>
//   `,
//   setup() {
//     const nameList = [
//       { "id": 1, "user": { "first_name": "Jesse", "last_name": "Simmons" }, "date": "2016/10/15 13:43:27", "gender": "Male" },
//       { "id": 2, "user": { "first_name": "John", "last_name": "Jacobs" }, "date": "2016/12/15 06:00:53", "gender": "Male" },
//       { "id": 3, "user": { "first_name": "Tina", "last_name": "Gilbert" }, "date": "2016/04/26 06:26:28", "gender": "Female" }
//     ]
//     return { ...args, selected: [], nameList };
//   },
// })