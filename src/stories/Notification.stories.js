
import {h} from 'vue'

export default {
    title: 'Notification'
}

import NotificationComp from '@/views/DemoNotification/DemoNoti'
export const Notification = () => ({
  render: () => h(NotificationComp)
})
