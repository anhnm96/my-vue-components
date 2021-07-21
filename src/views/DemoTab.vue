<template>
  <div id="app">
    <Tabs initial-active-tab="profile">
      <div :class="$style.section">
        <Tab id="home">
          Home
        </Tab>
        <Tab id="profile">
          Profile
        </Tab>
        <Tab id="settings">
          Settings
        </Tab>
      </div>
      <div :class="$style.section">
        <TabPanel id="home">
          Home content
        </TabPanel>
        <TabPanel id="profile">
          Profile content
        </TabPanel>
        <TabPanel id="settings">
          Settings content
        </TabPanel>
      </div>
    </Tabs>
  </div>
</template>

<script>
import { Tabs, Tab, TabPanel } from '@/components/Tab'
export default {
  name: 'App',
  components: {
    Tabs,
    Tab,
    TabPanel,
  },
}
</script>

<style module>
.section {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
</style>
