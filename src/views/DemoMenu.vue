<template>
  <div class="h-screen bg-gray-300">
    <Dropdown
      trigger-class="text-white bg-purple-500 btn"
      container-style="max-height: 200px; overflow: auto"
      animation="scale"
    >
      <template #trigger>
        <span class="px-2 font-medium">Adam Wathan</span>
      </template>
      <template #dropdown>
        <button
          role="option"
          tabindex="1"
          class="item"
          @click="test"
        >
          test
        </button>
        <a
          role="option"
          tabindex="0"
        >asd</a>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
      </template>
    </Dropdown>
    <Dropdown
      trigger-class="px-2 text-white bg-blue-500 btn"
      :triggers="['hover']"
    >
      <template #trigger>
        <span class="ml-2 font-medium">Adam Wathan</span>
      </template>
      <template #dropdown>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
      </template>
    </Dropdown>
    <Dropdown
      trigger-class="px-2 text-white bg-blue-500 btn"
      :disabled="true"
    >
      <template #trigger>
        <span class="font-medium">Disabled button</span>
      </template>
      <template #dropdown>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
      </template>
    </Dropdown>
    <Dropdown
      trigger-class="px-2 text-white bg-blue-500 btn"
      :triggers="['contextmenu']"
    >
      <template #trigger>
        <span class="font-medium">Right click</span>
      </template>
      <template #dropdown>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
        <button
          role="menuitem"
          class="item"
          @click="test"
        >
          test
        </button>
      </template>
    </Dropdown>
    <Dropdown
      trigger-class="px-2 text-white bg-blue-500 btn"
      popup-role="listbox"
    >
      <template #trigger>
        <span class="font-medium">Form</span>
      </template>
      <template #dropdown>
        <div class="p-2">
          <label>
            Email:
            <input
              class="w-full border border-gray-400 border-solid"
              type="text"
            >
          </label>
        </div>
      </template>
    </Dropdown>
    <Dropdown
      trigger-class="px-2 text-white bg-purple-600 btn"
      popup-role="listbox"
    >
      <template #trigger>
        <span class="font-medium">{{ selected.value }}</span>
        <svg
          class="w-3 h-3 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </template>
      <template #dropdown="{ toggle }">
        <div
          v-for="i in list"
          :key="i.value"
          role="option"
          class="p-2 cursor-pointer select-none"
          :class="{
            'bg-purple-600': selected === i,
            'hover:bg-gray-400': selected !== i,
          }"
          tabindex="0"
          @click="
            selected = i;
            toggle();
          "
          @keyup.space="
            selected = i;
            toggle(false);
          "
        >
          <div>
            <h3>{{ i.value }}</h3>
            <small>{{ i.note }}</small>
          </div>
        </div>
      </template>
    </Dropdown>

    <Dropdown
      :multiple="true"
      trigger-class="px-2 text-white bg-purple-600 btn"
      popup-role="listbox"
    >
      <template #trigger>
        <span class="font-medium">Selected ({{ selected2.length }})</span>
        <svg
          class="w-3 h-3 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </template>
      <template #dropdown>
        <div
          v-for="i in options"
          :key="i"
          role="option"
          class="p-2 cursor-pointer select-none focused"
          :class="{
            'bg-purple-600': selected2.includes(i),
            'hover:bg-gray-400': !selected2.includes(i),
          }"
          tabindex="0"
          @keydown.space="safePush(i)"
          @keydown.enter="safePush(i)"
          @click="safePush(i)"
        >
          <h3>{{ i }}</h3>
        </div>
      </template>
    </Dropdown>
    <!-- <div class="h-16 bg-red-400">
      <context-menu>
        <template #default>
          <li>test</li>
          <li>test</li>
        </template>
      </context-menu>
    </div> -->
    <div>
      <p>
        item should have attribute aria-role in ['listitem', 'menuitem']
        correnpoding to dropdown-menu with popup-role=['listbox', 'menu']
      </p>
      <p>in select mode. add attributes role="option".</p>
      <a
        href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/listbox-collapsible.html"
      >W3 reference</a>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import ContextMenu from '@/components/ContextMenu'
export default {
  components: {Dropdown},
  data() {
    return {
      list: [{value: 'Public', note: 'Everyone can see'}, {value: 'Friends', note: 'Only friends can see'}],
      selected: null,
      options: ['opt1', 'opt2', 'opt3'],
      selected2: []
    }
  },
  created() {
    this.selected = this.list[0]
  },
  methods: {
    test() {
      console.log('test')
    },
    safePush(val) {
      if (this.selected2.includes(val)) {
        const index = this.selected2.findIndex((item) => item === val)
        this.selected2.splice(index, 1)
      } else {
        this.selected2.push(val)
      }
    }
  }
}
</script>

<style scoped>
:deep(.btn) {
  @apply py-2 relative inline-flex items-center rounded-md;
}
.item {
  @apply block w-full px-4 py-2 text-left;
}
.item:hover {
  @apply bg-indigo-500 text-white;
}
:deep(.dropdown-menu) {
  margin-top: 0;
}
.focused:focus {
  border: 1px solid red;
}
</style>
