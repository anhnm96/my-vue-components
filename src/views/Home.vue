<template>
  <div class="min-h-screen">
    <div class="flex flex-wrap mt-2 ml-2 space-x-2">
      <BaseButton
        variant="blue"
        @click="showToastSuccess"
      >
        Primary
      </BaseButton>
      <BaseButton
        variant="red"
        @click="showToastDanger"
      >
        Danger
      </BaseButton>
      <BaseButton
        as="router-link"
        to="/table"
        variant="link"
      >
        Link
      </BaseButton>
      <BaseButton>Default</BaseButton>
      <BaseButton
        variant="purple"
        class="rounded-full"
        @click="showCustomNoti"
      >
        Custom Button
      </BaseButton>
      <BaseButton
        disabled
        variant="red"
      >
        Disabeld
      </BaseButton>
      <BaseButton disabled>
        Default
      </BaseButton>
      <BaseButton
        disabled
        class="rounded-full"
      >
        +
      </BaseButton>
    </div>
    <div class="mt-2 space-x-2">
      <BaseTag>Badge</BaseTag>
      <BaseTag color="red">
        Badge
      </BaseTag>
      <BaseTag
        color="yellow"
        size="lg"
      >
        Badge
      </BaseTag>
      <BaseTag
        color="green"
        size="lg"
      >
        Badge
      </BaseTag>
      <BaseTag
        color="indigo"
        class="px-2.5"
      >
        <svg
          class="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle
            cx="4"
            cy="4"
            r="3"
          />
        </svg>
        Small
      </BaseTag>
      <BaseTag
        color="indigo"
        size="lg"
        class="px-2.5"
      >
        <svg
          class="-ml-1 mr-1.5 h-2 w-2 text-indigo-400"
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle
            cx="4"
            cy="4"
            r="3"
          />
        </svg>
        Large
      </BaseTag>
      <BaseTag class="pl-2 pr-0.5">
        Small
        <button
          type="button"
          class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
        >
          <span class="sr-only">Remove small option</span>
          <svg
            class="w-2 h-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              stroke-linecap="round"
              stroke-width="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      </BaseTag>
      <BaseTag
        size="lg"
        color="indigo"
        class="pl-2.5 pr-1"
      >
        Large
        <button
          type="button"
          class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
        >
          <span class="sr-only">Remove large option</span>
          <svg
            class="w-2 h-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              stroke-linecap="round"
              stroke-width="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      </BaseTag>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseTag from '@/components/BaseTag.vue'
import { show } from '@/components/Notifications'
import FriendRequestNoti from '@/components/Notifications/FriendRequestNoti.vue'

export default {
  name: 'Home',
  components: { BaseButton, BaseTag },
  setup() {
    async function showToastDanger() {
      show({
        position: 'bottom-right',
        type: 'danger',
        timeout: 0,
        title: 'Attention!',
      })
    }

    async function showToastSuccess() {
      show({
        position: 'top-right',
        type: 'warn',
        title: 'Warning',
        description: 'It might has side effect',
      })
    }

    async function showCustomNoti() {
      const result = await show(undefined, FriendRequestNoti)
      show({
        position: 'top-right',
        type: 'info',
        title: 'Notification Title',
        description: `Friend request ${result}`
      })
    }

    return { showToastDanger, showToastSuccess, showCustomNoti }
  },
}
</script>
<style module>
</style>
