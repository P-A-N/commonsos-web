<template>
  <div>
    <modal v-if="showCrop" :title="$t('UploadPhoto.resize')" @close="closeCropPhotoDialog">
      <crop-photo ref="cropPhoto" slot-scope="modal" :url="selectedPhotoUrl" :orientation="orientation" :closeModal="modal.close" @cropped="cropped"></crop-photo>
      <v-btn slot="right" icon @click="$refs.cropPhoto.usePhoto()">
        <v-icon>check</v-icon>
      </v-btn>
    </modal>

    <div @click="selectPhoto">
      <slot name="activator"></slot>
    </div>
    <input ref="fileinput" type="file" accept="image/*" @change="photoSelected" tabindex=-1 style="display: none">
  </div>
</template>

<script>
import gateway from "@/gateway";
import imageService from "@/services/ImageService";
import CropPhoto from "@/components/CropPhoto";
import Modal from "@/components/Modal";

export default {
  props: ["url", "onUpload"],
  components: { Modal, CropPhoto },
  data() {
    return {
      selectedPhotoUrl: null,
      showCrop: false,
      orientation: 1
    };
  },
  methods: {
    photoSelected: function(event) {
      let component = this;
      let reader = new FileReader();

      reader.onload = () => {
        let image = new Image();
        image.src = reader.result;
        image.onload = () => {
          EXIF.getData(image, function() {
            let allMetaData = EXIF.getAllTags(this);
            component.selectedPhotoUrl = reader.result;
            component.orientation = allMetaData.Orientation;
            component.showCrop = true;
            component.$refs.fileinput.value = "";
          });
        };
      };
      reader.readAsDataURL(event.target.files[0]);
    },
    selectPhoto: function() {
      this.$refs.fileinput.dispatchEvent(new MouseEvent("click"));
    },
    cropped: function(image) {
      this.showCrop = false;
      imageService
        .resizeImage(image)
        .then(resized =>
          gateway.post(this.url, resized).then(r => this.onUpload(r.data))
        );
    },
    closeCropPhotoDialog: function() {
      this.showCrop = false;
    }
  }
};
</script>

