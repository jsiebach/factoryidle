import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useParcelStore } from './parcel'
import { useBuildingStore } from './building'
import type { Building, Parcel, ParcelBuilding, ParcelResource, ResourceAmount } from '@/types'

export const useGameStore = defineStore('game', () => {
  const parcelStore = useParcelStore()
  const buildingStore = useBuildingStore()

  function tick() {
    parcelStore.parcels.forEach((parcel) => processParcelTick(parcel))
  }

  function processParcelTick(parcel: Parcel) {
    parcel.buildings.forEach((parcelBuilding, buildingId) => {
      if (parcelBuilding.activeCount === 0) return

      processParcelBuildingTick(parcel, parcelBuilding)
    })
  }

  function processParcelBuildingTick(parcel: Parcel, parcelBuilding: ParcelBuilding) {
    let building = buildingStore.buildings.get(parcelBuilding.buildingId)

    // TODO: math, bottlenecks, etc
    const activeConsumers = parcelBuilding.activeCount

    const resourceChanges: ResourceAmount[] = []

    building?.inputs.forEach((input) =>
      resourceChanges.push({
        resourceId: input.resourceId,
        amount: input.amount * -1 * activeConsumers
      })
    )

    building?.outputs.forEach((output) =>
      resourceChanges.push({
        resourceId: output.resourceId,
        amount: output.amount * activeConsumers
      })
    )

    parcelStore.commitResourceChanges(parcel, resourceChanges)
  }

  return { tick }
})
