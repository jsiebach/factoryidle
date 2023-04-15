import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Building } from '@/types'
import { resourceIds } from './resource'

export const buildingIds = {
  KILN: 'Kiln'
}

export const buildingCategories = {
  BASIC: 'Basic'
}

export const useBuildingStore = defineStore('building', () => {
  const buildings: Map<string, Building> = new Map([
    [
      buildingIds.KILN,
      {
        id: buildingIds.KILN,
        category: buildingCategories.BASIC,
        cost: [
          {
            resourceId: resourceIds.STONE,
            amount: 25
          }
        ],
        inputs: [
          {
            resourceId: resourceIds.STONE,
            amount: 2
          },
          {
            resourceId: resourceIds.COAL,
            amount: 0.2
          }
        ],
        outputs: [
          {
            resourceId: resourceIds.BRICKS,
            amount: 1
          }
        ],
        energyInput: 0,
        rate: 1,
        minable: false,
        unlockConditions: () => true
      }
    ]
  ])

  const owned: Object[] = []

  return { buildings }
})
