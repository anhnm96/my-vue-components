<template>
  <div class="flex items-center justify-center">
    <div class="px-6 py-6 bg-white rounded-lg shadow-md">
      <h2
        class="pb-4 text-2xl font-semibold leading-tight text-gray-900 border-b-2 border-gray-200"
      >
        Delete account
      </h2>
      <p class="mt-4 text-gray-700">
        We'll cancel your subscription and remove all of your data from our
        servers.
      </p>
      <div class="mt-6">
        <button
          class="px-4 py-2 font-semibold text-white bg-red-500 border border-transparent rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
          @click="open = true"
        >
          Delete my account
        </button>
        <Modal
          v-model="open"
          aria-labelledby="dialog-title"
          :persistent="true"
        >
          <div class="w-full max-w-lg px-6 py-6 bg-white rounded-lg shadow-2xl">
            <h2
              id="dialog-title"
              class="pb-4 text-2xl font-semibold leading-tight text-gray-900 border-b-2 border-gray-200"
            >
              Delete account
            </h2>
            <p class="mt-4 text-gray-700">
              Are you absolutely sure you want to cancel your subscription and
              delete your account? This action cannot be undone.
            </p>
            <div class="mt-6">
              <button
                type="button"
                class="px-4 py-2 font-semibold text-white bg-red-500 border border-transparent rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
                @click="open = false"
              >
                Delete my account
              </button>
              <button
                class="px-4 py-2 ml-4 font-semibold text-gray-800 bg-white border rounded hover:bg-gray-100 focus:outline-none focus:shadow-outline"
                @click="open = false"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Dialog'
export default {
  components: {Modal},
  data() {
    return {
      open: false
    }
  },
  methods: {
    test() {
      this.open = false
      console.log('test')
    }
  }
}
</script>

<style>
</style>