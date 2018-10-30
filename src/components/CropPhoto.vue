<template>
  <div>
    <vue-croppie
      ref=croppieRef
      :enableOrientation="true"
      :enableExif="true"
      :viewport="{ width: 280, height: 210}"
      @result="result">
    </vue-croppie>
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
        this.$refs.croppieRef.result({format: 'jpeg', size: 'original'});
      },
      result(output) {
        this.$emit('cropped', output)
      }
    }
  }
</script>

<style>
  div.cr-boundary {
    width: auto !important;
    height: 70vh !important;
  }
</style>

