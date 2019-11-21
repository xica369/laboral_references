<template lang="pug">
  #app
    section.section
      nav.nav.has-shadow
        .container.results.is-short
          h1: th Candidates {{ count }}
          input.input.results(type="text", placeholder="candidate_id", v-model="candidate_id")
          a.button.is-info.is-large(v-on:click="created") Candidates
          a.button.is-danger.is-large(v-on:click="search") &times
          a.button.is-info.is-large(v-on:click="references") References
          br
          
          div
            table
              thead
                tr: th Candidates
                tbody
                  .container.results
                    .columns
                      ol(type="1" start="1")
                        li.num(v-for="i in candidates") {{ i.name }}  {{ i.last_name }} - {{ i.phone }} - {{ i.address }}

          .container.results
            tr(v-for="j in laboral_references") {{ j.company_name }}
        br


</template>

<script>
import axios from 'axios'
import trackService from './services/track'
export default {
  name: 'app',
  data () {
    return {
      candidates: [],
      laboral_references: "",
      candidate_id: "",
      searchQuery: "",
      name: "",
      last_name: "",
      phone: "",
      address: ""
    }
  },
  
  computed: {
    count () {
      return `encontrados: ${ this.candidates.length }`
    }
  },

  methods: {
    created () {
      axios.get("http://localhost:3000/api/v1/candidates").then((res) => {
        this.candidates = res.data
      })
    },

    references () {
      axios.get("http://localhost:3000/api/v1/laboral_references/{{ candidate_id }}").then((res) => {
        this.laboral_references = res.data
        console.log(this.laboral_references)
      })
    },

    search () {
      trackService.search(this.searchQuery)
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="scss">
@import './scss/main.scss';
  .results {
    margin: 15px
  }
</style>
