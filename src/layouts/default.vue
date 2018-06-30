<template>
  <q-layout view="lHh Lpr lFf">

    <q-layout-drawer
      v-model="left"
      :content-class="$q.theme === 'mat' ? 'bg-white' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
        class="text-orange"
      >
        <q-list-header class="text-grey-10">Essential Links
          <!-- <q-btn
              flat
              dense
              round
              @click="leftDrawerOpen = !leftDrawerOpen"
              aria-label="Menu"
              icon="menu" /> -->
        </q-list-header>
        <q-item @click.native="$router.push('/')">
          <q-item-side icon="home" color="grey*7" />
          <q-item-main label="Home" sublabel="View / Read all blogs" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" color="grey*7" />
          <q-item-main label="Telegram Chat Channel" sublabel="https://t.me" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" color="grey*7" />
          <q-item-main label="Forum" sublabel="forum.bliss.org" />
        </q-item>
        <q-item @click.native="openURL('http://blissful.ly')">
          <q-item-side icon="cloud download" color="grey*7" />
          <q-item-main label="Download Bliss App" />
        </q-item>
        <q-item @click.native="to('new=blog')">
          <q-item-side icon="add" color="grey*7" />
          <q-item-main label="Add new blog" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container style="padding-bottom: 5px">
      <q-layout-header>
        <q-toolbar class="text-grey-9 text-center" color="orange-7">
          <!-- <q-btn flat round dense icon="menu" @click="left = !left" aria-label="Toggle menu on left side" /> -->
          <q-toolbar-title @click.native="$router.push('/')" style="font-size: 24px; font-weight: 400" class="text-white">
            Bliss
            <!-- <span style="font-size: 100%; font-weight: 400" class="text-white" slot="subtitle">bliss</span> -->
          </q-toolbar-title>
          <!-- <q-btn flat dense class="q-mr-sm" @click.native="$router.push('/new=blog')" :label="authenticated ? 'New Blog' : 'Login'" /> -->
        </q-toolbar>
        <q-tabs v-if="showTabs" color="orange-6" align="center" :inverted="false">
          <q-route-tab slot="title" to="/" label="all" name="all" exact />
          <q-route-tab slot="title" to="/tags/osho" label="Osho" name="osho" />
          <q-route-tab slot="title" to="/tags/shri_shri" label="Shri Shri" name="shri_Shri" />
          <q-route-tab slot="title" to="/tags/ramdev" label="Ramdev" name="ramdev" />
          <q-route-tab slot="title" to="/tags/asharam" label="Asharam" name="asharam" />
          <q-route-tab slot="title" to="/tags/socrates" label="Socrates" name="socrates" />
          <q-route-tab slot="title" to="/tags/plato" label="Plato" name="plato" />
        </q-tabs>
      </q-layout-header>
      <router-view style="overflow-y: auto; height: 100%" />
    </q-page-container>
    <q-modal maximized position="bottom" v-model="FSR">
      <div class="row justify-center" style="padding-top: 20px; padding-bottom: 20px">
        <span class="col-xs-10 text-grey-9" style="font-size: 24px">Fullscreen request</span>
        <span class="col-xs-10 text-grey-7" style="font-size: 14px; margin-top: 10px">This application needs to be run on Fullscreen. Click "OK" to continue</span>
        <span class="text-right col-xs-10" style="font-size: 14px; margin-top: 10px"><q-btn @click="fullSc" color="primary" flat>Ok</q-btn> <q-btn @click="no" color="primary" flat>No</q-btn></span>
      </div>
    </q-modal>
  </q-layout>
</template>

<script>

import { openURL } from 'quasar'
// import router from '../router'


let domain

if (window.location.port === "8080") {
  domain = "http://localhost:8000"
} else {
  domain = window.location.origin
}

export default {
  name: 'LayoutDefault',
  data () {
    return {
      left: false,
      FSR: true
    }
  },
  created () {

     this.$q.addressbarColor.set('#ea6c0b')

    this.$http.get(domain + "/login/authenticated").then((res) => {
      if (res.status === 200) {
        this.$store.commit('bliss/setKey', {
          p: 'authenticated',
          v: true
        })
      }
    }).catch( (err) => {

      this.$store.commit('bliss/setKey', {
        p: 'authenticated',
        v: false
      })

    })
  },
  methods: {
    openURL,
    fullSc () {
      if (this.$q.fullscreen.isCapable && !this.$q.fullscreen.isActive) {
        this.FSR = false
        this.$q.fullscreen.request()
        this.$q.fullscreen.toggle
        // this.$router.push("/")
      }
    },
    no () {
      this.FSR = false
    },
    to (path) {
      switch (path) {
        case 'new=blog': {
          if (!this.authenticated) {
            this.$http.get(domain + "/login/authenticated").then((res) => {
              if (res.status === 200) {
                this.$store.commit('bliss/setKey', {
                  authenticated: true
                })
                this.left = false
                this.$router.push("/new=blog")
              }
            }).catch( (err) => {

              this.$store.commit('bliss/set', {
                authenticated: false
              })

              if (err.status === 500) {
                console.log("Internal Server Error")
              } else if ( err.status === 401 ) {
                this.$router.push("login")
              } else {
                console.error("Unexpected Error Occured")
              }
            })
          } else {
            this.$router.push("/new=blog")
          }
          break
        }
      }
    }
  },
  computed: {
    height () {
      return window.innerHeight
    },
    authenticated () {
      if (this.$store.state.bliss.authenticated) {
        return true
      }
      return false
    },
    showTabs () {
      if (this.$route.path.indexOf('/tags') >= 0 || this.$route.path.indexOf('/blog=') >= 0 || this.$route.path === '/') {
        return true
      }
    }
  }
}
</script>

<style scoped>

  * {
    font-size: 12px;
    font-family: 'Lato';
  }

</style>
