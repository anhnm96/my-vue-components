import { Ref, InjectionKey } from 'vue'

interface TabsContext {
  activeId: Ref<string>
  activateTab: (id: string) => any
}

export const TabsKey: InjectionKey<TabsContext> = Symbol('Tabs')
