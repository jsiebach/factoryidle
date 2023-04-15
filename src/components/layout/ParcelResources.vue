<script setup lang="ts">
import { useParcelStore } from '@/stores/parcel'
import { useResourceStore } from '@/stores/resource'
import type { Parcel } from '@/types'

const parcelStore = useParcelStore()
const resourceStore = useResourceStore()
</script>

<template>
  <h2>{{ parcelStore.activeParcel?.name }}</h2>
  <table>
    <tr>
      <th>Resource</th>
      <th>Amount</th>
      <th>Production</th>
    </tr>
    <tr v-for="parcelResource in parcelStore.activeParcel?.resources.values()">
      <td>
        {{ parcelResource.resourceId }}
        <button
          v-if="resourceStore.resources.get(parcelResource.resourceId)?.minable"
          @click="parcelStore.mineParcelResource(parcelResource)"
        >
          Mine
        </button>
      </td>
      <td>{{ parseFloat(parcelResource.amount.toFixed(1)) }}</td>
    </tr>
  </table>
</template>

<style scoped></style>
