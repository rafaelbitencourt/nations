import { getToken } from 'graphql/Queries';
import { ClientCustom } from 'api';

const AUTH_TOKEN = 'auth-token';

class AuthService {
    login(name, password) {
        return getToken(name, password)
            .then(token => {
                if (token) {
                    localStorage.setItem(AUTH_TOKEN, token);
                    ClientCustom.resetStore();
                }

                return token;
            });
    }

    logout() {
        localStorage.removeItem(AUTH_TOKEN);
        ClientCustom.resetStore();
    }

    getToken() {
        return localStorage.getItem(AUTH_TOKEN);
    }
}

export default new AuthService();