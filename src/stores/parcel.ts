import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Parcel, ParcelResource, ParcelBuilding, ResourceAmount, BuildingCount } from '@/types'
import { resourceIds } from './resource'
import { buildingIds } from './building'

export const useParcelStore = defineStore('parcel', () => {
  const parcels: Parcel[] = reactive([
    {
      id: 1,
      name: 'Parcel 1 (Home)',
      isActive: true,
      buildings: new Map([
        [
          buildingIds.KILN,
          {
            buildingId: buildingIds.KILN,
            count: 10,
            activeCount: 10
          }
        ]
      ]),
      resources: new Map([
        [
          resourceIds.COAL,
          {
            resourceId: resourceIds.COAL,
            amount: 1000
          }
        ],
        [
          resourceIds.STONE,
          {
            resourceId: resourceIds.STONE,
            amount: 1000
          }
        ],
        [
          resourceIds.BRICKS,
          {
            resourceId: resourceIds.BRICKS,
            amount: 0
          }
        ]
      ])
    }
  ])

  const activeParcel = computed(() => parcels.find((parcel) => parcel.isActive))

  function activateParcel(parcelToActivate: Parcel) {
    parcels.forEach((parcel) => (parcel.isActive = parcel.id === parcelToActivate.id))
  }

  function mineParcelResource(parcelResource: ParcelResource) {
    parcelResource.amount++
  }

  function addNewParcel() {
    const newId: number = Math.max(...parcels.map((p) => p.id)) + 1
    const newParcel: Parcel = {
      id: newId,
      name: `Parcel ${newId}`,
      isActive: false,
      buildings: new Map([]),
      resources: new Map([])
    }
    parcels.push(newParcel)
    activateParcel(newParcel)
  }

  function buyParcelBuilding(parcel: Parcel, buildingId: string, count: number = 1) {
    // TODO: Can I afford this?
    commitBuildingChanges(parcel, [
      {
        buildingId,
        count
      }
    ])
  }

  function sellParcelBuilding(parcel: Parcel, buildingId: string, count: number = 1) {
    // TODO: Can I afford this?
    commitBuildingChanges(parcel, [
      {
        buildingId,
        count: count * -1
      }
    ])
  }

  function commitResourceChanges(parcel: Parcel, resourceChanges: ResourceAmount[]) {
    resourceChanges.map((resourceChange) => {
      const value: ParcelResource = parcel.resources.get(resourceChange.resourceId) || {
        resourceId: resourceChange.resourceId,
        amount: 0
      }

      value.amount += resourceChange.amount

      parcel.resources.set(resourceChange.resourceId, value)
    })
  }

  function commitBuildingChanges(parcel: Parcel, buildingChanges: BuildingCount[]) {
    buildingChanges.map((buildingChange) => {
      const value: ParcelBuilding = parcel.buildings.get(buildingChange.buildingId) || {
        buildingId: buildingChange.buildingId,
        count: 0,
        activeCount: 0
      }

      value.count += buildingChange.count
      value.activeCount += buildingChange.count

      parcel.buildings.set(buildingChange.buildingId, value)
    })
  }

  return {
    parcels,
    activeParcel,
    addNewParcel,
    activateParcel,
    mineParcelResource,
    buyParcelBuilding,
    sellParcelBuilding,
    commitResourceChanges
  }
})
