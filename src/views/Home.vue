<template>
  <div class="home">
    <table @keydown="keydown" tabindex="0">
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
      </tr>
      <tr>
        <td><input type="text"></td>
        <td>Vue</td>
      </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    keydown() {
      console.log('keydown')
    }
  }
}
</script>
