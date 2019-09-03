<template>
  <div v-editable="blok">
    <div id="gmapAnchor"></div>
    <GmapMap
      :center="center"
      :zoom="16"
      map-type-id="roadmap"
      style="width: 100%; height: 340px"
      full-screen="true"
    >
      <GmapMarker
        :position="center"
        :clickable="true"
        @click="infoWinOpen = !infoWinOpen" />

      <GmapInfoWindow
        :position="center"
        :options="infoOptions"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false">
        <h4 class="google-map__address-title">Address</h4>
        <ul class="google-map__address-ulist">
          <li class="google-map__address-ulist-item">{{ blok.street }}</li>
          <li class="google-map__address-ulist-item">{{ blok.city }}</li>
          <li class="google-map__address-ulist-item">{{ blok.country }}</li>
        </ul>
      </GmapInfoWindow>
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object, default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      center: { lat: Number(this.blok.lat.replace(',', '.').trim()), lng: Number(this.blok.lng.replace(',', '.').trim()) },
      infoOptions: { pixelOffset: { width: 0, height: -35 } },
      infoWinOpen: false,
    }
  }
}
</script>

<style>
#gmapAnchor {
  position: relative;
  top: -80px;
}

.google-map__address-title {
  padding-bottom: 6px;
}

.google-map__address-ulist {
  list-style: none;
  padding: 0;
}

.google-map__address-ulist-item {
  padding: 0px;
  margin-left: 0;
}
</style>
