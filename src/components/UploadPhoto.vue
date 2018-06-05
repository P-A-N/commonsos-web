<template>
  <div>
    <div @click="selectPhoto">
      <slot name="activator"></slot>
    </div>
    <input ref="fileinput" type="file" accept="image/*" @change="photoSelected" tabindex=-1 style="display: none">
  </div>
</template>

<script>
  import gateway from '@/gateway'
  import imageService from '@/services/ImageService'

  export default {
    props: ['url', 'onUpload'],
    methods: {
      photoSelected: function (event) {
        let reader = new FileReader();
        reader.onload = () => {
          imageService.resizeImage(reader.result)
            .then((resized) => gateway.post(this.url, resized)
            .then((r) => this.onUpload(r.data)))
        }
        reader.readAsDataURL(event.target.files[0]);
      },
      selectPhoto: function () {
        this.$refs.fileinput.dispatchEvent(new MouseEvent('click'))
      }
    }
  }
</script>

