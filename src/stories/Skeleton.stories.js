import VSkeleton from '@/components/SkeletonBox'
import {h} from 'vue'

export default {
    title: 'Skeleton',
    component: VSkeleton
}

import SkeletonComp from '@/views/DemoSkeleton'
export const Skeleton = () => ({
  render: () => h(SkeletonComp)
})
