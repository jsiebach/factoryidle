<script setup lang="ts">
import { useParcelStore } from '@/stores/parcel'
import type { Parcel } from '@/types'

const store = useParcelStore()
</script>

<template>
  <h2>Parcels</h2>
  <div class="parcel-buttons">
    <button class="parcel-buttons__buy-new" @click="store.addNewParcel">Buy New Parcel</button>
    <button
      v-for="parcel in store.parcels"
      class="parcel-button__activate"
      @click="store.activateParcel(parcel)"
    >
      {{ parcel.name }}
    </button>
  </div>
</template>

<style scoped>
.parcel-buttons__buy-new {
  display: block;
  margin-bottom: 5px;
}
.parcel-buttons__activate {
  margin-right: 1px;
}
</style>
