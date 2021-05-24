<template>
  <div>
    <Expand>
      <template #header="{toggle}">
        <button class="border border-gray-400 p-2 block w-full text-left" @click="toggle()">Single Item</button>
      </template>
      <template #default>
        <div class="p-2">
          Magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita.
          <button
            @click="expanded = !expanded"
          >Test2</button>
          <Expand :expand="expanded">
            Magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita.
          </Expand>
        </div>
      </template>
    </Expand>
    <div>
      <ExpandableList>
        <template #default="{toggleAll, bind}">
          <div>
            <button class="border border-gray-400 p-2 block w-full text-left" @click="toggleAll">Toggle list</button>
            <div v-for="i in 5" :key="i">
              <Expand class="shadow p-2" v-bind="bind">
                <template #header="{toggle}">
                  <p @click="toggle()">Header {{i}}</p>
                </template>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
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