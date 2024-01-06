<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <a-row type="flex" justify="space-between">
          <a-col :span="12">
            <a-row type="flex" justify="space-between">
              <a-col :span="4">
                <a-icon type="menu" @click="showDrawer"/>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <a-drawer
      title="Booking App"
      :placement="placement"
      :closable="false"
      :visible="getSidebarVisibility"
      @close="onClose"
      id="drawer-sidebar"
    >
      <SidebarItem v-for="(menu, index) in getMenus()"
        :path="menu.path"
        :name="menu.name"
        :icon="menu.icon"
        :key="index"
        :is_show_on_sidebar="'is_show_on_sidebar' in menu && menu.is_show_on_sidebar == false? false:true " />
    </a-drawer>
  </div>
</template>

<script>
import SidebarItem from '@/components/side-bar-item/SidebarItem.vue'
import menus from '@/constants/menus.js'
import system_settings_types from '@/modules/store/system-settings/types.js'
import { mapGetters, mapMutations } from "vuex";

export default {
  name: 'App',
  components: {
    SidebarItem
  },
  data() {
    return {
      placement: 'left',
    };
  },
  computed: {
    ...mapGetters({
      getSidebarVisibility: system_settings_types.GET_SIDEBAR_VISIBILITY
    }),
    sidebarVisibility: {
      get() {
        return this.getSidebarVisibility
      },
      set(newValue) {
        this.setSidebarVisiblity(newValue);
      }
    },
  },
  methods: {
    ...mapMutations({
      setSidebarVisiblity: system_settings_types.SET_SIDEBAR_VISIBILITY
    }),
    showDrawer() {
      this.setSidebarVisiblity(true);
    },
    onClose() {
      this.setSidebarVisiblity(false);
    },
    onChange(e) {
      this.placement = e.target.value;
    },
    getMenus(){
      return menus;
    }
  }
}
</script>

<style>
  @import './assets/css/_drawer-sidebar.css';
  @import './assets/css/_global.css';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #app .ant-layout-header {
    background: white;
    padding: 0;
    border-bottom: 1px solid #0000000f;
  }

  .text-align-start {
    text-align: start !important;
  }

  .font-weight-bold {
    font-weight: bold !important;
  }

  .xl-p {
    font-size: 30px;
  }

  .mt-2 {
    margin-top: 4px;
  }

  .ml-2 {
    margin-left: 4px !important;
  }

  .ml-5 {
    margin-left: 10px !important;
  }

  .mr-2 {
    margin-right: 4px !important;
  }

  .mr-5 {
    margin-right: 10px !important;
  }

  .mr-4 {
    margin-right: 6px;
  }

  .pr-4 {
    padding-right: 6px;
  }

  .p-4 {
    padding: 6px !important;
  }

  .mt-4 {
    margin-top: 6px;
  }

  .d-flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .h-100 {
    height: 100% !important;
  }

  .ant-statistic-title {
    font-weight: bold;
  }

  .ant-upload-list-picture-card .ant-upload-list-item-info::before {
    position: absolute;
    top: -0;
    left: 0;
  }

  .color-scheme-3 {
    color: #BFCFE7 !important;
  }

  .ant-comment-inner {
    text-align: left !important;
  }

  .ant-comment-content-author  {
    text-transform: capitalize !important;
  }

  .appointment-action-button{
    display: flex;
    justify-content: flex-end;
  }

  .appointment-action-button .ant-btn-circle {
    margin-right: 10px;
  }

  .ant-list-item-meta {
    text-align: left;
  }

  .ant-list-item-meta-title {
    font-weight: bold !important;
  }

  .ant-alert {
    text-align: left;
  }
</style>
