<script setup lang="ts">
import { useParcelStore } from '@/stores/parcel'
import { useBuildingStore } from '@/stores/building'
import type { Parcel, Building } from '@/types'

const parcelStore = useParcelStore()
const buildingStore = useBuildingStore()
</script>

<template>
  <h2>Buildings</h2>
  <table>
    <tr>
      <th>Building</th>
      <th>Count</th>
      <th>Action</th>
    </tr>
    <tr v-for="parcelBuilding in parcelStore.activeParcel?.buildings.values()">
      <td>{{ parcelBuilding.buildingId }}</td>
      <td>{{ parcelBuilding.count }}</td>
      <td>
        <button
          @click="
            parcelStore.buyParcelBuilding(parcelStore.activeParcel, parcelBuilding.buildingId)
          "
        >
          Buy
        </button>
        <button
          @click="
            parcelStore.sellParcelBuilding(parcelStore.activeParcel, parcelBuilding.buildingId)
          "
          :disabled="parcelBuilding.count === 0"
        >
          Sell
        </button>
      </td>
    </tr>
  </table>
</template>

<style scoped></style>
