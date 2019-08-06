<template>
  <div>

    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1060.335346908878!2d4.417716077400524!3d50.795652735023694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbb6199c4b4d9c9fe!2sEmakina+Belgique!5e0!3m2!1sfr!2sbe!4v1565094827458!5m2!1sfr!2sbe" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
    <!-- <GmapMap
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
    </GmapMap> -->
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
