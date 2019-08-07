<template>
  <div>
    <GmapMap
      :center="{lat:50.7956527, lng:4.4177161}"
      :zoom="16"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="{ let: 50.7956527, lng: 4.4177161 }"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
