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
  import LoggedInUserConsumerMixin from '../LoggedInUserConsumerMixin'
  import userService from '@/services/UserService'

  export default {
    mixins: [LoggedInUserConsumerMixin],
    methods: {
      photoSelected: function (event) {
        let reader = new FileReader();
        reader.onload = () => {
          gateway.post(`/users/${this.user.id}/avatar`, reader.result).then(() => {
            userService.loadUser()
          })
        }
        reader.readAsDataURL(event.target.files[0]);
      },
      selectPhoto: function() {
        this.$refs.fileinput.dispatchEvent(new MouseEvent('click'))
      }
    }
  }
</script>

