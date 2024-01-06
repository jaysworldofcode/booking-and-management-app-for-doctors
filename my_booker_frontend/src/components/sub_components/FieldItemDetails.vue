<template>
    <div class="field-client-details d-flex flex-col" :style="is_remove_border? '':'border: 1px solid #F8EDFF'">
        <span class="title">{{ title }}</span>
        <span class="data-val">{{ data }}</span>
    </div>
</template>
<script>
export default {
    name: 'FieldItemDetails',
    props: [
        'title',
        'data',
        'is_remove_border'
    ],
    data() {
        return {
        };
    },
    components: {
    },
    computed: {
    },
    methods: {
    },
    created(){
    }
}
</script>
<style scoped>
    .field-client-details {
        text-align: left;
        border-radius: 15px;
        padding: 11px
    }

    .title {
        color: #525CEB;
        font-weight: bold;
        font-size: 11px;
    }

    .data-val {
        font-size: 16px;
    }
</style>