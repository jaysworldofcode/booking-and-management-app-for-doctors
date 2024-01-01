<template>
    <div v-if="is_show_on_sidebar" class="side-bar-item" @click="visit">
        <span class="mr-2">
            <a-icon :type="icon" />
        </span>
        <span>
            {{ name }}
        </span>
    </div>
</template>
<script>
    import system_settings_types from '@/modules/store/system-settings/types.js'
    import { mapMutations } from "vuex";

    export default {
        name: 'SidebarItem',
        props: [
            'name',
            'path',
            'icon',
            'is_show_on_sidebar'
        ],
        computed: {
        },
        methods: {
            ...mapMutations({
                setSidebarVisiblity: system_settings_types.SET_SIDEBAR_VISIBILITY
            }),
            visit(){
                this.$router.push(this.path)
                this.setSidebarVisiblity(false);
            }
        }
    }
</script>
  
<style scoped>
    .side-bar-item {
        width: 100% !important;
        cursor: pointer;
        padding: 1rem;
        font-weight: bold;
        color: gray !important;
    }

    .side-bar-item:hover {
        color: black !important;
        background-color: rgb(250, 250, 250);
    }
</style>
  