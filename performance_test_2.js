import http from 'k6/http';
import { check, sleep } from 'k6';

//Realizar o registro de um novo usuário utilizando endpoints 'Registration' e 'Auth'
export const options = {
    stages : [{
        duration: '10s',
        target : 10
    }],
    thresholds : {
        checks : ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 500']
    }
};

export default function() {
    //acessar a URL da API publica
    const BASE_URL = 'https://test-api.k6.io';

    //criar o Usuario e Senha
    const USER = `${Math.random()}@mail.com`;
    const PASS = 'user123';

    //inicializar a requisição
    const res = http.post(`${BASE_URL}/user/register/`, {
        username: USER,
        first_name: 'crocodilo',
        last_name: 'silva',
        email: USER,
        password: PASS
    });

    check(res, {
        'sucesso ao resgistrar': (r) => r.status === 201
    })

    //para cara vu realiza apenas uma unica requisição
    sleep(1)
};