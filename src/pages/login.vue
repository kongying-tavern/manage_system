<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container>
      <div class="row" style="margin-top:200px">
        <h2 style="margin:0 auto">原神点位管理系统</h2>
      </div>
      <div class="row justify-center login_card">
        <q-card class="my-card col-5 col-md-3">
          <q-card-section>
            <q-input
              filled
              v-model="username"
              label="用户名"
              lazy-rules
              :rules="[val => (val && val.length > 0) || '请输入用户名']"
            >
            </q-input>
            <q-input
              filled
              type="password"
              v-model="password"
              label="密码"
              lazy-rules
              :rules="[val => (val !== null && val !== '') || '请输入密码']"
            />
            <div class="row justify-center">
              <q-btn
                class="col-5 col-md-2"
                label="登录"
                type="submit"
                color="primary"
              />
            </div>
          </q-card-section>
          <q-inner-loading :showing="login_loading">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      username: null,
      password: null,
      login_loading: false
    };
  },

  methods: {},
  mounted() {
  },
};
</script>
<style>
.login_card {
  margin-top: 50px;
}
.login_logo {
  display: block;
  width: 200px;
}
.loginbtn {
  display: inline-block;
  width: 50%;
  margin: 0 auto;
}
</style>