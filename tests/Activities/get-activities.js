import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { optionsLight } from '../../config/options.js';

export const options = optionsLight;

const BASE_URL = 'https://fakerestapi.azurewebsites.net';
const HEADERS = { 'Content-Type': 'application/json' };

export default function () {

  // ─────────────────────────
  // TESTE 1 — Listar
  // ─────────────────────────
  group('GET - Listar Activities', () => {
    const res = http.get(`${BASE_URL}/api/v1/Activities`);

    check(res, {
      'status 200':       (r) => r.status === 200,
      'tem atividades':   (r) => JSON.parse(r.body).length > 0,
      'resposta < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
  });

  // ─────────────────────────
  // TESTE 2 — Buscar um
  // ─────────────────────────
  group('GET - Buscar Activity por ID', () => {
    const res = http.get(`${BASE_URL}/api/v1/Activities/1`);

    check(res, {
      'status 200':       (r) => r.status === 200,
      'tem título':       (r) => JSON.parse(r.body).title !== undefined,
      'resposta < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
  });

  // ─────────────────────────
  // TESTE 3 — Criar
  // ─────────────────────────
  group('POST - Criar Activity', () => {
    const payload = JSON.stringify({
      id: 0,
      title: 'Minha Activity de teste',
      dueDate: '2026-04-26T05:40:16.261Z',
      completed: false,
    });

    const res = http.post(`${BASE_URL}/api/v1/Activities`, payload, { headers: HEADERS });

    check(res, {
      'status 200':      (r) => r.status === 200,
      'retornou título': (r) => JSON.parse(r.body).title !== undefined,
      'resposta < 500ms':(r) => r.timings.duration < 500,
    });

    sleep(1);
  });

}