<template>
  <div class="hightlight-wrapper" :style="highlightWrapperStyles"></div>
</template>

<script lang="ts" setup>
import { defineProps, type CSSProperties } from 'vue'

type Props = {
  highlightWrapperStyles: CSSProperties
}
defineProps<Props>()
</script>

<style lang="scss">
.hightlight-wrapper {
  position: absolute;
  border: 2px solid $light-primary;
  z-index: 1;
  border-radius: $step;
  transition: all 0.3s;
  display: none;
}
</style>
