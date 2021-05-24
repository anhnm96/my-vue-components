module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    // rootDir: 'src',
    // testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec).[jt]s?(x)']
    // files have .spec. in the name and end with ts, tsx, js or jsx
    // file that are inside of a __tests__ directory and end with ts, tsx, js or jsx
  }
}
