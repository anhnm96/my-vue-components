<template>
  <div class="min-h-screen">
    <div class="flex flex-wrap mt-2 ml-2 space-x-2">
      <BaseButton
        variant="green"
        @click="showToastSuccess"
      >
        Success
      </BaseButton>
      <BaseButton
        variant="blue"
        @click="showToastInfo"
      >
        Info
      </BaseButton>
      <BaseButton
        variant="yellow"
        @click="showToastWarn"
      >
        Warning
      </BaseButton>
      <BaseButton
        variant="red"
        @click="showToastDanger"
      >
        Danger bottom-right
      </BaseButton>
      <BaseButton
        variant="purple"
        class="rounded-full"
        @click="showCustomNoti"
      >
        Custom Notification
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { show } from '@/components/Notifications'
import FriendRequestNoti from '@/components/Notifications/FriendRequestNoti.vue'

export default {
  name: 'DemoDefaultNotification',
  components: { BaseButton },
  setup() {
    function showToastDanger() {
      show({
        position: 'bottom-right',
        type: 'danger',
        timeout: 2000,
        title: 'Attention!',
      })
    }

    async function showToastSuccess() {
      await show({
        position: 'top-right',
        type: 'success',
        title: 'Successfully saved!',
        description: 'Anyone with a link can now view this file.',
      })
      console.log('noti closed')
    }

    function showToastInfo () {
      show({
        position: 'top-right',
        type: 'info',
        title: 'Notification Title',
        description: 'This is the content of the notification',
      })
    }

    function showToastWarn () {
      show({
        position: 'top-right',
        type: 'warn',
        title: 'Notification Title',
        description: 'This is the content of the notification'
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

    return { showToastDanger, showToastSuccess, showCustomNoti, showToastInfo, showToastWarn }
  },
}
</script>
<style module>
</style>
