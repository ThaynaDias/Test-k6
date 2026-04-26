import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { optionsLight } from '../../config/options.js';

// Importa o gerador de relatório HTML
// baixa direto do GitHub do autor da biblioteca
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

// Importa o gerador de resumo no terminal
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// Usa a configuração leve (5 usuários por 10 segundos)
export const options = optionsLight;

// URL base da API
const BASE_URL = 'https://fakerestapi.azurewebsites.net';

// Header para requisições POST
const HEADERS = { 'Content-Type': 'application/json' };

// Função principal — roda para cada usuário virtual
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

// ─────────────────────────────────────────────────────
// Essa função roda UMA VEZ no final de todos os testes
// Ela recebe todos os dados coletados durante o teste
// e gera os relatórios automaticamente
// IMPORTANTE: precisa estar FORA do export default!
// ─────────────────────────────────────────────────────
export function handleSummary(data) {
  return {
    // Gera o arquivo HTML na pasta reports/
    // você abre no navegador para ver os gráficos
    'reports/get-activities.html': htmlReport(data),

    // Mostra o resumo colorido no terminal também
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}