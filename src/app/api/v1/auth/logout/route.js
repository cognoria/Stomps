import { cookies } from 'next/headers';
import { apiHandler } from '../../../../../helpers/server/api';

// import { apiHandler } from '@/helpers/server/api';

module.exports = apiHandler({
    POST: logout,
    GET: logout
});

function logout() {
    cookies().delete('authorization');
}