import http from 'k6/http';
import { check, sleep } from 'k6';
import { optionsLight } from '../../config/options.js';

// TODO: use a configuração leve que criamos no config/options.js
export const options = optionsLight;

// TODO: coloca a URL base da API aqui
const BASE_URL = 'https://reqres.in/api';

// TODO: coloca os headers necessários aqui (Content-Type e x-api-key)
const HEADERS = {
    'x-api-key':'reqres_f42c130045684ac8aa2b66604bc7dfbc'

};

export default function () {

  // TODO: faz uma requisição GET para listar os usuários
  // dica: o endpoint é /users
  const res = http.get(`${BASE_URL}/users`, {headers: HEADERS})

  // TODO: verifica se:
  // 1. o status é 200
  // 2. a resposta tem usuários (data.length > 0)
  // 3. o tempo de resposta é menor que 500ms

  check(res, {
    'status 200': (r) => r.status === 200,
    'tem usuarios': (r) => JSON.parse(r.body).data.length > 0,
    'resposta < 500ms': (r) => r.timings.duration < 500,
  });

  // TODO: espera 1 segundo antes da próxima requisição
  sleep(1)
  
}