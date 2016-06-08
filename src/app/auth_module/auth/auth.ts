import { NuprUprawnienia } from '../../models/nupr/NuprUprawnienia';

export interface LoginDataInterface {
    token?: string;
    user_id?: number;
    prcId?: number;
    uzId?: number;
}

export class Auth {
    public loggedIn: Boolean
    public loginData: LoginDataInterface
    public uprawnieniaUseraList: NuprUprawnienia[] =  [];

    constructor() {
        this.loggedIn = false;
        this.emptyLoginData();
    }

    login(loginData: LoginDataInterface) {
        this.loggedIn = true;
        this.loginData = loginData;
        // set session
        localStorage.setItem('a2authLoginData', JSON.stringify(loginData));
        console.log('login()');
    }

    dodajUprawnienie( uprawnienia: NuprUprawnienia[]) {
        this.uprawnieniaUseraList = uprawnienia;
        localStorage.setItem('a2authUprawnieniaUseraList', JSON.stringify(uprawnienia));
    }

    loginFromSession() {
        // load from session
        if (localStorage.getItem("a2authLoginData") !== null && this.loggedIn === false) {
            console.log('loginFromSession()');
            var a2authLoginData = JSON.parse(localStorage.getItem("a2authLoginData"));
            console.log(a2authLoginData);
            this.login(a2authLoginData);

            var a2authUprawnieniaUseraList = JSON.parse(localStorage.getItem("a2authUprawnieniaUseraList"));
            this.dodajUprawnienie(a2authUprawnieniaUseraList);
        }
    }

    logout() {
        this.loggedIn = false;
        this.emptyLoginData();
        localStorage.removeItem('a2authLoginData');
    }

    check() {
        if (localStorage.getItem("a2authLoginData") === null) {
            console.log('Auth.check: Login false');
            return false;
        }
        var a2authLoginData = JSON.parse(localStorage.getItem("a2authLoginData"));
        // session exits therefore, make at it login
        if (a2authLoginData.token) {
            console.log('Auth.check: Login true');
            this.loginFromSession();
            return true;
        }
    }

    emptyLoginData() {
        this.loginData = {};
    }
}
