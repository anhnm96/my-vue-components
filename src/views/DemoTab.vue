<template>
  <div id="app">
    <TabGroup>
      <TabList class="flex p-1 space-x-1 bg-blue-900 bg-opacity-20 rounded-xl">
        <Tab
          v-for="(tab, index) in tabs"
          :key="index"
          v-slot="{ selected }"
          as="template"
        >
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white hover:text-white',
            ]"
          >
            {{ tab }}
          </button>
        </Tab>
      </TabList>
      <div class="section">
        <TabPanel>
          Home content
        </TabPanel>
        <TabPanel>
          Profile content
        </TabPanel>
        <TabPanel>
          Settings content
        </TabPanel>
      </div>
    </TabGroup>
  </div>
</template>

<script>
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanel } from '@/components/Tab2'
// import { Tabs, Tab, TabPanel } from '@/components/Tab'
export default {
  name: 'App',
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanel,
  },
  setup() {
    const tabs = ref(['Home', 'Profile', 'Settings'])

    return { tabs }
  },
}
</script>

<style>
.section {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.tab {
  @apply w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60;
}
</style>
