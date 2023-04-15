export interface Parcel {
  id: number
  name: string
  isActive: boolean
  buildings: Map<string, ParcelBuilding>
  resources: Map<string, ParcelResource>
}

export interface Building {
  id: string
  category: string
  cost: ResourceAmount[]
  inputs: ResourceAmount[]
  outputs: ResourceAmount[]
  energyInput: number
  rate: number
  minable: boolean
  unlockConditions: Function
}

export interface Resource {
  id: string
  category: string
  order: number
  minable: boolean
}

export interface ResourceAmount {
  resourceId: string
  amount: number
}

export interface BuildingCount {
  buildingId: string
  count: number
}

export interface ParcelBuilding {
  buildingId: string
  count: number
  activeCount: number
}

export interface ParcelResource {
  resourceId: string
  amount: number
}
