import { buscarTurmasPorEtapa } from '../lib/turmasService';

jest.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockResolvedValue({
      data: [
        { turmas: { codigo: 'T1' } },
        { turmas: { codigo: 'T2' } }
      ],
      error: null
    })
  }
}));

describe('buscarTurmasPorEtapa', () => {
  it('Busca por turmas em uma etapa.', async () => {
    const turmas = await buscarTurmasPorEtapa('Etapa 1');
    expect(turmas).toEqual([
      { codigo: 'T1' },
      { codigo: 'T2' }
    ]);
  });

  it('Busca por turmas em etapa que não existe.', async () => {
    require('../lib/supabaseClient').supabase.eq.mockResolvedValue({ data: [], error: null });
    const turmas = await buscarTurmasPorEtapa('Etapa Inexistente');
    expect(turmas).toEqual([]);
  });
});
