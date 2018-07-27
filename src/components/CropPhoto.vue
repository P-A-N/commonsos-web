<template>
  <div>
    <vue-croppie
      ref=croppieRef
      :enableOrientation="true"
      :enableExif="true"
      :viewport="{ width: 300, height: 300}"
      @result="result">
    </vue-croppie>
    <div class="text-xs-center">
      <v-btn @click="usePhoto">{{$t('CropPhoto.done')}}</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['url', 'closeModal', 'orientation'],
    mounted() {
      this.$refs.croppieRef.bind({url: this.url, orientation: this.orientation})
    },
    methods: {
      usePhoto() {
        this.$refs.croppieRef.result({format: 'png'});
      },
      result(output) {
        this.$emit('cropped', output)
      }
    }
  }
</script>

<style>
  div.cr-boundary {
    width:auto !important;
  }
</style>

