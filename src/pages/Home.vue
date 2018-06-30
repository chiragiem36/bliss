<template>
  <div class="row items-center justify-center" style="padding-top: 5px; padding-bottom: 5px">
    <div v-if="filteredBlogs.length > 0" class="col-xs-11 col-sm-9 col-md-7 col-lg-7">
      <blog-item @click="toBlog(blog._id)" :blog="blog" :key="blog._id" v-for="(blog, i) in filteredBlogs" :style="{'marginTop': i === 0 ? '0px' : '20px' }"></blog-item>
    </div>
    <div v-else class="col-xs-11 col-sm-9 col-md-7 col-lg-7 self-center text-center text-grey-6" style="font-weight: 400; font-size: 14px">
      <div class="row items-center justify-center" :style="{height: height - 120 + 'px'}">
        Sorry .... nothing in here. <br>Please try again later
      </div>
    </div>
  </div>
</template>

<script>

let domain

if (window.location.port === "8080") {
  domain = "http://localhost:8000"
} else {
  domain = window.location.origin
}

import BlogItem from '../components/BlogItem'

export default {
  components: {
    'blog-item': BlogItem
  },
  watch: {
    "$route.path" () {

      if (this.$route.path.indexOf('/tags/') === 0) {
        this.getByTag(this.$route.params.tag)
      } else {
        this.getLatest()
      }

    }
  },
	data () {
		return {
      blogs: [],
			ts: ''
		}
	},
  created () {

    if (this.$route.path.indexOf('/tags/') === 0) {
      this.getByTag(this.$route.params.tag)
    } else {
      this.getLatest()
    }
  },
  methods: {
    toBlog (n) {
      this.$router.push('/blog/' + n)
    },
    getLatest () {
      this.blogs = []
      this.$http.get(domain + '/blogs/latest').then((res) => {
        console.log(res)
        if (res.status === 200 ) {
          this.blogs.push(res.body)
        }
        return res.body._id
      }).then((id) => {
        this.getMore(id)
      })
    },
    getMore (ts) {
      this.$http.get(domain + '/blogs/last=' + ts).then((res) => {
        if (res.status === 200) {
          this.blogs.push(res.body)
          this.getMore(res.body._id)
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    getByTag (tag) {
      this.blogs = []
      this.$http.get(domain + '/blogs/tag=' + tag).then((res) => {
        if (res.status === 200) {
          this.blogs = []
          this.blogs.push(res.body)
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  },
	computed: {
		height () {
			return window.innerHeight
		},
		filteredBlogs () {
			return this.blogs
		}
	}
  // name: 'PageName',
}
</script>

<style>

	* {
		font-size: 12px
	}

</style>
