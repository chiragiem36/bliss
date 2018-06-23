<template>
  <q-layout view="lHh Lpr lFf">

    <q-layout-drawer
      v-model="leftDrawerOpen"
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
      <div class="row">
        <div class="col-xs-10"></div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { openURL } from 'quasar'
import router from '../router'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    to (path) {
      switch (path) {
        case 'new=blog': {
          if (!this.authenticated) {
            this.$http.get("/login/authenticated").then((res) => {
              if (res.status === 200) {
                this.$router.push("new=blog")
              }
            }).catch( (err) => {
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
