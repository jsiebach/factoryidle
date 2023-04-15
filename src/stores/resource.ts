import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Resource } from '@/types'

export const resourceIds = {
  STONE: 'Stone',
  COAL: 'Coal',
  BRICKS: 'Bricks'
}

export const resourceCategories = {
  RAW: 'Raw',
  BASIC: 'Basic'
}

export const useResourceStore = defineStore('resource', () => {
  const resources: Map<string, Resource> = new Map([
    [
      resourceIds.STONE,
      {
        id: resourceIds.STONE,
        category: resourceCategories.RAW,
        order: 1,
        minable: true
      }
    ],
    [
      resourceIds.COAL,
      {
        id: resourceIds.COAL,
        category: resourceCategories.RAW,
        order: 2,
        minable: true
      }
    ],
    [
      resourceIds.BRICKS,
      {
        id: resourceIds.BRICKS,
        category: resourceCategories.BASIC,
        order: 1,
        minable: false
      }
    ]
  ])

  return { resources }
})
