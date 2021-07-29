<template>
  <transition
    enter-active-class="transition duration-300 ease-out transform"
    enter-from-class="opacity-0 sm:translate-x-full"
    enter-to-class="opacity-100 sm:translate-x-0"
    leave-active-class="transition duration-200 ease-in transform"
    leave-from-class="opacity-100"
    leave-to-class="-translate-y-2 opacity-0 "
    appear
    @after-leave="onClose(payload)"
  >
    <div
      v-if="show"
      class="max-w-sm bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0 pt-0.5">
            <img
              class="w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
              alt="img"
            >
          </div>
          <div class="flex-1 ml-3">
            <p class="text-sm font-medium text-gray-900">
              Emilia Gates
            </p>
            <p class="mt-1 text-sm text-gray-500">
              Sent you an invite to connect.
            </p>
            <div class="flex mt-4">
              <button
                type="button"
                class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="onSelect('accept')"
              >
                Accept
              </button>
              <button
                type="button"
                class="inline-flex items-center px-3 py-2 ml-3 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="onSelect('decline')"
              >
                Decline
              </button>
            </div>
          </div>
          <div class="flex flex-shrink-0 ml-4">
            <button
              class="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="onSelect('decline')"
            >
              <span class="sr-only">Close</span>
              <XIcon
                class="w-5 h-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from 'vue'
import { XIcon } from '@heroicons/vue/solid'

export default {
  name: 'FriendRequestNoti',
  components: {
    XIcon,
  },
  props: {
    onClose: {
      type: Function,
      default: () => { },
    },
  },
  setup() {
    const show = ref(true)
    const payload = ref()

    function onSelect(value) {
      payload.value = value
      show.value = false
    }

    return {
      show,
      onSelect,
      payload
    }
  }
}
</script>
