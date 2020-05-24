<template>
  <div class="components-container">
    <aside>
      Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.
      <a
        target="_blank"
        class="link-type"
        href="https://panjiachen.github.io/vue-element-admin-site/component/rich-editor.html"
      >Documentation</a>
    </aside>
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <div class="editor-content">
      <el-button @click="up" icon="el-icon-upload" size="mini" type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import axios from 'axios'
export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
    }
  },
  methods: {
    up() {
      const data = {
        title: 'title',
        content: this.content,
        type: 'PublishArticle'
      }
      axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
      axios.post(
        'http://7ee3eeb9.ngrok2.xiaomiqiu.cn/api/front/articles/release.json',
        JSON.stringify(data),
        {
          headers: {
            Authorization: 'bearer ' + sessionStorage.getItem('token')
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>

