<template>
    <a-modal
      :visible="is_show_modal_details"
      title="Appointment Details"
      centered
      class="view-appointment-details-modal"
      width="80%"
    >
      <template slot="footer">
        <a-tooltip placement="topLeft" title="Mark as attended">
            <a-button type="primary" shape="circle" icon="check" />
        </a-tooltip>
        <a-tooltip placement="topLeft" title="Mark as missed">
            <a-button type="dashed" shape="circle" icon="exclamation" />
        </a-tooltip>
        <a-tooltip placement="topLeft" title="Mark as cancelled">
            <a-button type="danger" shape="circle" icon="close" />
        </a-tooltip>
      </template>
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </a-modal>
</template>
<script>
export default {
    name: 'ViewAppointmentDetailsModal',
    props: [
        'is_show_modal_details',
    ],
    components: {
    },
    data() {
        return {
        };
    },
    methods: {
    },
}
</script>
<style scoped>
.view-appointment-details-modal .ant-modal-root {
  width: 80% !important;
}
</style>