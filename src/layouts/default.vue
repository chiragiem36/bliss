<template>
  <q-layout view="lHh Lpr lFf">

    <q-layout-header>
      <q-toolbar class="text-grey-9 no-shadow text-center" color="white" :inverted="$q.theme === 'ios'">
        <q-btn flat round dense icon="menu" @click="left = !left" aria-label="Toggle menu on left side" />
        <q-toolbar-title style="font-size: 300%; font-weight: 400" @click.native="$router.push('/')">
          Bliss
          <span slot="subtitle">bliss blogs</span>
        </q-toolbar-title>
        <q-btn flat dense class="q-mr-sm" :label="authenticated ? 'New Blog' : 'Login'" />
      </q-toolbar>
      <q-tabs v-if="showTabs" class="bg-white" align="center" :inverted="true">
        <q-route-tab slot="title" to="" label="all" name="all" exact />
        <q-route-tab slot="title" to="/influencers/osho" label="Osho" name="osho" />
        <q-route-tab slot="title" to="shri_shri" label="Shri Shri" name="shri_Shri" />
        <q-route-tab slot="title" to="/influencers/ramdev" label="Ramdev" name="ramdev" />
        <q-route-tab slot="title" to="/influencers/asharam" label="Asharam" name="asharam" />
        <q-route-tab slot="title" to="/influencers/socrates" label="Socrates" name="socrates" />
        <q-route-tab slot="title" to="/influencers/plato" label="Plato" name="plato" />
      </q-tabs>
    </q-layout-header>

    <q-layout-drawer
      v-model="left"
      :content-class="$q.theme === 'mat' ? 'bg-blue-8' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
        class="text-white"
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
          <q-item-side icon="home" color="white" />
          <q-item-main label="Home" sublabel="View / Read all blogs" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" color="white" />
          <q-item-main label="Telegram Chat Channel" sublabel="https://t.me" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" color="white" />
          <q-item-main label="Forum" sublabel="forum.bliss.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="cloud download" color="white" />
          <q-item-main label="Download Bliss App" />
        </q-item>
        <q-item @click.native="to('new=blog')">
          <q-item-side icon="add" color="white" />
          <q-item-main label="Add new blog" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { openURL } from 'quasar'
import router from '../router'

let domain

if (window.location.port === "8080") {
  domain = "http://localhost:8000"
} else {
  domain = window.location
}

export default {
  name: 'LayoutDefault',
  data () {
    return {
      left: false
    }
  },
  methods: {
    openURL,
    to (path) {
      switch (path) {
        case 'new=blog': {
          if (!this.authenticated) {
            this.$http.get(domain + "/login/authenticated").then((res) => {
              if (res.status === 200) {
                this.$store.commit('bliss/setKey', {
                  authenticated: true
                })
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
          }
          break
        }
      }
    }
  },
  computed: {
    authenticated () {
      if (this.$store.state.bliss.authenticated) {
        return true
      }
      return false
    },
    showTabs () {
      if (this.$route.path.indexOf('/influencers') >= 0 || this.$route.path === '/') {
        return true
      }
    },
    authenticated () {
      return false
    }
  }
}
</script>

<style scoped>

  * {
    font-size: 12px;
  }

</style>
