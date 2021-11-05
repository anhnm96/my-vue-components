import { Ref, InjectionKey, ComponentInternalInstance, ComputedRef } from 'vue'

interface TabsContext {
  tabsId: string
  orientation: ComputedRef<'vertical' | 'horizontal'>
  tabs: ComponentInternalInstance[]
  panels: ComponentInternalInstance[]
  activeIndex: Ref<number>
  activateTab: (id: number) => void
}

export const TabsKey: InjectionKey<TabsContext> = Symbol('Tabs')
