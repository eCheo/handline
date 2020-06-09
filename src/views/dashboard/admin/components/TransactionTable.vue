<template>
  <div>
    <p v-html="msg"></p>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary" @click="fetchData">发送</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from 'vuex'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: "success",
        pending: "danger"
      };
      return statusMap[status];
    },
    orderNoFilter(str) {
      return str.substring(0, 30);
    },
    send() {
      var soket = new WebSocket("ws://383d6c1f.ngrok2.xiaomiqiu.cn/ws");
      soket.onmessage(event => {});
      soket.onopen(event => {});
      soket.onclose(event => {});
      soket.send(JSON.stringify(this.input))
    }
  },
  data() {
    return {
      list: null,
      msg: "你好",
      input: "",
      soket: new WebSocket("ws://383d6c1f.ngrok2.xiaomiqiu.cn/ws")
    };
  },
  created() {
    
  },
  mounted() {
    let _that = this;
      _that.soket.onmessage = function(event) {
        console.log(event);
        _that.msg = JSON.parse(event.data).chatMsg.msg;
      };
      _that.soket.onopen = function(event){
        console.log('连接成功')
        _that.soket.send(JSON.stringify({"msgActionType":"CONNECT","token":_that.$store.getters.userInfo.accessToken,"chatMsg":{"senderId":"758181502631937","receiverId":"","msg":_that.input}}))
      };
      _that.soket.onclose = function(event){
        console.log('连接关闭')
      };
  },
  methods: {
    fetchData() {
      let _that = this;
      if (!window.WebSocket) { return; }
      console.log(_that.soket.readyState);
      console.log(WebSocket.OPEN)
      console.log(this.userInfo);
      if (_that.soket.readyState == WebSocket.OPEN) { 
        _that.soket.send(JSON.stringify({"msgActionType":"CHAT","token":this.userInfo.accessToken,"chatMsg":{"senderId":"758181502631937","receiverId":"742396234432513","msg":_that.input}}))
      } else {
        _that.soket.send(JSON.stringify({"msgActionType":"CONNECT","token":this.userInfo.accessToken,"chatMsg":{"senderId":"123456","receiverId":"","msg": ''}}))
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
};
</script>
