import { useCookies } from 'vue3-cookies';
import main from '@/components/main.vue';
import add_notes from '@/components/addnotes.vue';
const { cookies } = useCookies();

const checkAuth = (next, redirectTo, isAuthorized) => {
    const token = cookies.get('accessToken');
    
    if (token && isAuthorized || !token && !isAuthorized) {
        next(); 
    } else {
        next({ name: redirectTo });
    }
};

const routes = [
    {
        path: '/',
        name: 'main',
        component: main,
        beforeEnter: (to, from, next) => {
            checkAuth(next, 'noteboard', false);
        }
    },
    {
        path: '/noteboard',
        name: 'noteboard',
        component: add_notes,
        beforeEnter: (to, from, next) => {
            checkAuth(next, 'main', true);
        }
    }
];

export { routes };