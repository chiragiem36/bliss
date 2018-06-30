<template>
  <div v-if="loaded">
    <a :href="url" style="padding: 0px; position: fixed; right: 5%; bottom: 4%; z-index: 10"><img src="https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/whatsapp-512.png" width="60px" height="100%" style="padding: 0px"></a>

    <!-- content -->
    <div class="row justify-center text-grey-8 text-left" style="margin-top: 30px">
      <div class="col-xs-11 col-sm-8 col-md-8" style="font-size: 250%; font-weight: 500;">
        {{ blog.title }}
      </div>
    </div>
    <div class="row justify-center text-grey-6 text-center" style="margin-top: 25px; text-transform: capitalize">
      <div class="col-xs-11 col-sm-8 text-left">
        <q-icon name="account_circle" /> {{ blog.author }}
      </div>
      <div class="col-xs-11 col-sm-8 text-left" style="margin-top: 5px">
        <q-icon name="watch_later" /> {{ new Date(blog.time).toLocaleString() }}
      </div>
    </div>
    <div class="row justify-center text-grey-6" style="margin-top: 25px">
      <div class="col-xs-11 col-sm-8 col-md-6 text-left" style="font-weight: 400" :style="{'font-size': mobile ? '16px' : '20px'}">
        {{ blog.desc }}
      </div>
    </div>
    <div class="row justify-center text-grey-6 text-center" style="margin-top: 50px; margin-bottom: 30px">
      <img v-if="!blog.video" class="col-xs-11 col-sm-9 col-lg-8" height="100%" :src="blog.url">
      <iframe width="420" height="315" :src="blog.url" v-else>
      </iframe>
    </div>
    <div class="row text-grey-7 text-left">
      <div v-for="p in blog.content" class="col-xs-10 offset-xs-1 col-sm-8 offset-sm-2 offset-md-2 col-md-8 col-lg-6 offset-lg-3" style="margin-top: 10px; font-weight: 350; line-height: 1.45; font-samily: 'Open Sans'" :style="{'font-size': mobile ? '15px' : '22px'}">
        {{ p }}
      </div>
    </div>
  </div>
</template>

<script>

let domain

if (window.location.port === "8080") {
  domain = "http://localhost"
} else {
  domain = window.location.origin
}

export default {
  // name: 'PageName',
  computed: {
    mobile () {
      if (this.$q.platform.is.mobile) {
        return true
      }
      return false
    }
  },
  methods: {
    to () {
    }
  },
  data () {
    return {
      blog: null,
      loaded: false
    }
  },
  created () {
    this.$http.get(domain + '/blogs/blog=' + this.$route.params.id ).then((res) => {
      if (res.status === 200 ) {
        this.blog = res.body
        this.blog.content = this.blog.content.split('\n')
        this.url = 'whatsapp://send?text=' + encodeURIComponent('Blissful - ' + this.blog.title + '. ' + window.location)
        this.loaded = true
      }
    })
  }
}
</script>

<style>
</style>
