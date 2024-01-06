import axios from 'axios'

class AppointmentsHelper {
    async createAppointment(client_id, title, schedule_datetime, assignee, added_by, description){
        await axios.post(
            process.env.VUE_APP_ROOT_API+'appointments',
            {
                client_id,
                title,
                schedule_datetime,
                assignee,
                added_by,
                description
            }).then((response) => {})
    }

    async createAppointmentComment(attachments, comment, appointments_id, added_by){
        await axios.post(
            process.env.VUE_APP_ROOT_API+'appointments/comment',
            {
                attachments,
                comment,
                appointments_id,
                added_by
            }).then((response) => {})
            .catch(err => {
                this.$notification['error']({
                    message: 'Error',
                    description:
                      'Encounter an issue while adding comment on appointment',
                  });
            });
    }

    async getAppointmentComment(appointment_id){
        var data = null

        await axios({
            method: "get",
            url: process.env.VUE_APP_ROOT_API+'appointments/comment/'+appointment_id,
        })
        .then(res => data = res.data)
        .catch(err => false);

        return data
    }

    async filterAppointments(filter){
        var data = null

        await axios({
            method: "get",
            url: process.env.VUE_APP_ROOT_API+'appointments/filter?'+(new URLSearchParams(filter).toString()),
        })
        .then(res => data = res.data)
        .catch(err => false);

        return data
    }

    async updateStatus(appointment_id, new_status){
        await axios.put(
            process.env.VUE_APP_ROOT_API+'appointments/'+appointment_id,
            {
                status: new_status
            }).then((response) => {})
            .catch(err => {
            });
    }
}

export default AppointmentsHelper