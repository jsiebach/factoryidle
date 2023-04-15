<script setup lang="ts">
import Header from './components/layout/Header.vue'
import Parcels from './components/layout/Parcels.vue'
import ParcelResources from './components/layout/ParcelResources.vue'
import ParcelBuildings from './components/layout/ParcelBuildings.vue'
import { useGameStore } from './stores/game'

const gameStore = useGameStore()
window.setInterval(gameStore.tick, 1000)
</script>

<template>
  <Header></Header>
  <Parcels></Parcels>
  <ParcelResources></ParcelResources>
  <ParcelBuildings></ParcelBuildings>
</template>

<style scoped></style>
