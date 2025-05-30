import { buscarAlunosPorTurma } from '../lib/alunosService';

jest.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockResolvedValue({
      data: [
        { alunos: { RA: 'A1' } },
        { alunos: { RA: 'A2' } }
      ],
      error: null
    })
  }
}));

describe('buscarAlunosPorTurma', () => {
  it('Busca alunos por turma.', async () => {
    const alunos = await buscarAlunosPorTurma('TURMA1');
    expect(alunos).toEqual([
      { RA: 'A1' },
      { RA: 'A2' }
    ]);
  });

  it('Busca alunos em turma inexistente.', async () => {
    require('../lib/supabaseClient').supabase.eq.mockResolvedValue({ data: [], error: null });
    const alunos = await buscarAlunosPorTurma('TURMA_INEXISTENTE');
    expect(alunos).toEqual([]);
  });
});
