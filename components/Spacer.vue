<template>
  <div 
    v-editable="Blok"
    class="Spacer"
    :class="{
      [Size] : true,
      'Spacer__separator-line-top' : blok.separatorline && blok.separatorlineposition === 'top',
      'Spacer__separator-line-bottom' : blok.separatorline && blok.separatorlineposition === 'bottom',
      'Spacer__design-line-left' : blok.designline && blok.designlineposition === 'left',
      'Spacer__design-line-center' : blok.designline && blok.designlineposition === 'center',
    }" />
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object,
        default: function() {
          return {}
        }
      },
      size: {
        type: String,
        default: null
      }
    },
    computed: {
      Blok() {
        return this.blok || {};
      },
      Size() {
        return this.size || this.blok.size;
      }
    }
  }
</script>

<style lang="scss">
.Spacer {
  position: relative;
  $i: 0;
  @each $key, $value in $sizes {
    $i: $i + 1;
    &.#{$key} {
      padding-top: $i * 5px * 2;
    }
  }
  &.xHuge {
    padding-top: 74px;
  }
  &.xxHuge {
    padding-top: 212px;
  }
}

.Spacer__separator-line-top {
  border-top: solid 1px color('medium');
}

.Spacer__separator-line-bottom {
  border-bottom: solid 1px color('medium');
}

@mixin design-line {
  &:after {
    position: absolute;
    content: '';
    width: 28px;
    top: -16px;
    background-color: color('textLight');
    transform: rotate(30deg);
    transform-origin: 0% 0%;
  }

  &.xxHuge:after {
    height: 125%;
  }

  &.xHuge:after {
    height: 142%;
  }

  &.huge:after {
    height: 154%;
  }

  &.large:after {
    height: 165%;
  }

  &.medium:after {
    height: 180%;
  }
}

.Spacer__design-line-left {
  @include design-line;

  &:after {
    left: 200px;
  }
}

.Spacer__design-line-center {
  @include design-line;

  &:after {
    left: 55%;
  }
}
</style>
