<template>
  <div>
    <Expand>
      <template #header="{toggle}">
        <button @click="toggle()">Test</button>
      </template>
      <template #default>
        Magna aliquyam erat, sed diam voluptua. At vero eos et
        accusam et justo duo dolores et ea rebum. Stet clita.
        <button
          @click="expanded = !expanded"
        >Test2</button>
        <Expand :expand="expanded">
          Magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita.
        </Expand>
      </template>
    </Expand>
    <div>
      <ExpandableList>
        <template #default="{toggleAll, setPanels}">
          <div>
            <button @click="toggleAll">toggle all</button>
            <div v-for="i in 5" :key="i">
              <Expand :ref="setPanels">
                <template #header="{toggle}">
                  <p @click="toggle()">Header {{i}}</p>
                </template>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Expand>
            </div>
          </div>
        </template>
      </ExpandableList>
    </div>
  </div>
</template>

<script>
import Expand from '@/components/transitions/Expandable'
import ExpandableList from '@/components/transitions/ExpandableList'
export default {
  components: {Expand, ExpandableList},
  data: () => ({
    expanded: false,
  })
}
</script>

<style>
</style>