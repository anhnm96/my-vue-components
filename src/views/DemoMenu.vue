<template>
  <div class="h-screen bg-gray-300">
    <Dropdown triggerClass="btn bg-purple-500 text-white">
      <template #trigger>
        <span class="ml-2 font-medium">Adam Wathan</span>
        <svg
          class="w-5 h-5 ml-1 text-gray-700 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
          />
        </svg>
      </template>
      <template #dropdown>
        <button @click="test" class="item">test</button>
        <button @click="test" class="item">test</button>
        <button @click="test" class="item">test</button>
      </template>
    </Dropdown>
    <Dropdown
      triggerClass="px-2 btn bg-blue-500 text-white"
      :triggers="['hover']"
    >
      <template #trigger>
        <span class="ml-2 font-medium">Adam Wathan</span>
      </template>
      <template #dropdown>
        <button @click="test" class="item">test</button>
        <button @click="test" class="item">test</button>
        <button @click="test" class="item">test</button>
      </template>
    </Dropdown>
    <Dropdown triggerClass="px-2 btn bg-blue-500 text-white" :disabled="true">
      <template #trigger>
        <span class="font-medium">Disabled button</span>
      </template>
      <template #dropdown>
        <button @click="test" class="item">test</button>
        <button @click="test" class="item">test</button>
      </template>
    </Dropdown>
    <Dropdown
      triggerClass="px-2 btn bg-blue-500 text-white"
      :triggers="['contextmenu']"
    >
      <template #trigger>
        <span class="font-medium">Right click</span>
      </template>
      <template #dropdown>
        <button @click="test" class="item">test</button>
        <button @click="test" class="item">test</button>
      </template>
    </Dropdown>
    <Dropdown triggerClass="px-2 btn bg-blue-500 text-white">
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
            />
          </label>
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
      <p>item should have attribute</p>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import ContextMenu from '@/components/ContextMenu'
export default {
  components: {Dropdown},
  methods: {
    test() {
      console.log('test')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .btn {
  @apply py-2 relative inline-flex items-center rounded-md;
}
.item {
  @apply block w-full px-4 py-2 text-left;
  &:hover {
    @apply bg-indigo-500 text-white;
  }
}
</style>