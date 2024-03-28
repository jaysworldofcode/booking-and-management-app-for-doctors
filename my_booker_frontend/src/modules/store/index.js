import Vue from 'vue'
import Vuex from 'vuex'
import login from '@/modules/store/login/login.js'
import system_settings from '@/modules/store/system-settings/system-settings.js'
import clinics from '@/modules/store/clinics/clinics.js'
import appointment from '@/modules/store/appointment/appointment.js'
import clients from '@/modules/store/clients/clients.js'
import product_categories from '@/modules/store/product-categories/product-categories.js'

Vue.use(Vuex)

export default new Vuex.Store({ 
    modules: {
        system_settings,
        login,
        clinics,
        appointment,
        clients,
        product_categories
    },
})