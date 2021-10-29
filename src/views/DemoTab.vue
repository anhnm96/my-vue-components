<template>
  <div id="app">
    <Tabs initial-active-tab="profile">
      <div :class="$style.section">
        <Tab name="home">
          Home
        </Tab>
        <Tab name="profile">
          Profile
        </Tab>
        <Tab name="settings">
          Settings
        </Tab>
      </div>
      <div :class="$style.section">
        <TabPanel name="home">
          Home content
        </TabPanel>
        <TabPanel name="profile">
          Profile content
        </TabPanel>
        <TabPanel name="settings">
          Settings content
        </TabPanel>
      </div>
    </Tabs>
  </div>
</template>

<script>
import { Tabs, Tab, TabPanel } from '@/components/Tab2'
// import { Tabs, Tab, TabPanel } from '@/components/Tab'
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
