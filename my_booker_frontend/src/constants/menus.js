import Dashboard from '@/components/dashboard/Dashboard.vue'
import Clinics from '@/components/clinics/Clinics.vue'
import Schedule from '@/components/schedule/Schedule.vue'
import Clients from '@/components/clients/Clients.vue'

export default [
    {
        name: 'Dashboard',
        icon: 'dashboard',
        path: '/',
        component: Dashboard
    },
    {
        name: 'Clinics',
        icon: 'cluster',
        path: '/clinics',
        component: Clinics
    },
    {
        name: 'Schedules',
        icon: 'calendar',
        path: '/schedule',
        component: Schedule
    },
    {
        name: 'Clients',
        icon: 'team',
        path: '/clients',
        component: Clients
    },
    {
        name: 'Inventory',
        icon: 'book',
        path: '/clinics',
        component: Clinics
    },
    {
        name: 'POS',
        icon: 'credit-card',
        path: '/clinics',
        component: Clinics
    },
    {
        name: 'Users',
        icon: 'key',
        path: '/clinics',
        component: Clinics
    },
    {
        name: 'Settings',
        icon: 'setting',
        path: '/clinics',
        component: Clinics
    },
    {
        name: 'Logout',
        icon: 'logout',
        path: '/clinics',
        component: Clinics
    },
];