import http from 'k6/http';
import { check, sleep } from 'k6';
import { optionsLight } from '../../config/options.js';

// TODO: use a configuração leve que criamos no config/options.js
export const options = optionsLight;

// TODO: coloca a URL base da API aqui
const BASE_URL = 'https://fakerestapi.azurewebsites.net';

// TODO: coloca os headers necessários aqui (Content-Type e x-api-key)
const HEADERS = {
    "accept": "text/plain; v=1.0"
};

export default function () {

// Dados para criar um novo usuário
  const payload = JSON.stringify({
    "id": 0,
    "title": "string",
    "dueDate": "2024-06-19T17:00:00.000Z",
    "completed": true
  });


  // TODO: faz uma requisição GET para listar os usuários
  // dica: o endpoint é /users
  const res = http.get(`${BASE_URL}/api/v1/Activities`, {headers: HEADERS})

  // TODO: verifica se:
  // 1. o status é 200
  // 2. a resposta tem usuários (data.length > 0)
  // 3. o tempo de resposta é menor que 500ms

  check(res, {
    'status 200': (r) => r.status === 200,
    'retorno do titulo': (r) => JSON.parse(r.body).title !== undefined,
    'retorno da data de vencimento': (r) => JSON.parse(r.body).dueDate !== undefined,
    'resposta < 500ms': (r) => r.timings.duration < 500,
  });

  // TODO: espera 1 segundo antes da próxima requisição
  sleep(1)
  
}