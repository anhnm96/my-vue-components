<template>
	<label v-if="label" :for="`input__${label}`" v-text="label" />
	<input
		:id="`input__${label}`"
		v-bind="{
			...$attrs,
			onInput: (event) => $emit('update:modelValue', event.target.value)
		}"
		:value="modelValue"
	/>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		label: {
			type: String,
			default: null
		},
		modelValue: {
			type: [String, Number],
			default: ''
		}
	}
};
</script>

<style>
</style>
