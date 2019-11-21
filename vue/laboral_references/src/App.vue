<template lang="pug">
  #app
    h1 Candidates
    br
    form
      p id:
      b-row
        b-col
        p name:
        input(v-model="name")
        p last_name:
        input(v-model="last_name")
        p phone:
        input(v-model="phone")
        p address:
        input(v-model="address")

    button(v-on:click="created") Candidates
    ul
      li(v-for="i in candidates") {{ i.name }}

</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      candidates: "",
      name: "",
      last_name: "",
      phone: "",
      address: ""
    }
  },
  
  computed: {
    check(){
      return this.name.length > 2 ? true : false
    }
  },

  methods: {
    created() {
      axios.get("http://localhost:3000/api/v1/candidates").then((res) => {
        this.candidates = res.data
      })
    }
  }
}
</script>

<style lang="scss">
@import './scss/main.scss'
</style>
