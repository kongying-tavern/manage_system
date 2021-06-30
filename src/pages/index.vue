<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>
          原神地图后台管理系统
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="left" side="left" :width="200" bordered>
      <q-list padding>
        <q-item clickable v-ripple to="/layer_edit">
          <q-item-section avatar>
            <q-icon name="mdi-circle-edit-outline" />
          </q-item-section>
          <q-item-section>
            点位编辑
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/layer_review">
          <q-item-section avatar>
            <q-icon name="mdi-star-four-points" />
          </q-item-section>
          <q-item-section>
            点位审核
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/user_manage">
          <q-item-section avatar>
            <q-icon name="mdi-account-edit" />
          </q-item-section>
          <q-item-section>
            用户管理
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false
    };
  }
};
</script>