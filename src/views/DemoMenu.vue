<template>
  <div class="h-screen bg-gray-300">
    <Dropdown
      triggerClass="relative inline-flex items-center focus:outline-none"
    >
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
        <button class="block px-4 py-2 hover:bg-indigo-500 hover:text-white">
          test
        </button>
        <button class="block px-4 py-2 hover:bg-indigo-500 hover:text-white">
          test
        </button>
        <button class="block px-4 py-2 hover:bg-indigo-500 hover:text-white">
          test
        </button>
      </template>
    </Dropdown>
    <context-menu>
      <template #default>
        <li>test</li>
        <li>test</li>
        <li>test</li>
      </template>
    </context-menu>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import ContextMenu from '@/components/ContextMenu'
export default {
  components: {Dropdown, ContextMenu}
}
</script>

<style>
</style>