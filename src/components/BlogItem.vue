<template>
  <q-card-media @click.native="toBlog(blog._id)" color="pink" style="border-radius: 3px; cursor: pointer" overlay-position="bottom">
    <img :src="blog.img_url" style="max-height: 450px">

    <!-- Notice the slot="overlay" -->
    <q-card-title slot="overlay" style="padding-top: 20px; padding-bottom: 20px">
      <span style="font-weight: 500; text-transform: capitalize" :style="{'font-size': smallScreen ? '20px' : '32px'}">
        {{ blog.title }}
      </span>
      <br>
      <span slot="subtitle" class="text-grey-4" style="font-size: 12px; text-transform: capitalize">{{ blog.desc.slice(0, 40) + ' ...' }}</span>
    </q-card-title>
  </q-card-media>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ["blog"],
  data () {
    return {}
  },
  methods: {
    toBlog (id) {
      this.$router.push('/blog=' + id)
    }
  },
  computed: {
    smallScreen () {
      if (window.innerWidth < 900) {
        return true
      }

      return false
    },
    maxW () {
			if (this.$q.platform.is.mobile) {
				return '150px'
			} else {
				return '350px'
			}
		}
  }
}
</script>

<style>

  .pcard:hover {
    cursor: pointer;
  }

  .container {
    text-align: center;
    color: white;
  }

  .bottom-right {
    position: relative;
    bottom: 8px;
    right: 16px;
  }

</style>
