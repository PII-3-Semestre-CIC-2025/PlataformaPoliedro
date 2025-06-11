"use client"

import '@/styles/relatorio.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from "@/app/components/header-prof";
import { useState, useEffect, useCallback } from 'react';
import { buscarAlunosPorTurma } from '@/lib/client/alunosService';
import { buscarNotasPorTurma, buscarMediasPorTurma } from '@/lib/client/notasService';
import { buscarAvaliacoesPorTurma } from '@/lib/client/avaliacoesService';
import { gerarRelatorioPDF } from '@/lib/relatorioPDF';

export default function RelatorioPage() {
  const [alunos, setAlunos] = useState([]);
  const [erro, setErro] = useState(null);

  const fetchAlunos = useCallback(async () => {
    try {
      const turmaSelecionada = localStorage.getItem('turmaSelecionada');
      if (!turmaSelecionada) {
        setErro('Nenhuma turma selecionada.');
        setAlunos([]);
        return;
      }
      const alunosData = await buscarAlunosPorTurma(turmaSelecionada);

      const alunosArray = alunosData.map((rel, idx) => ({
        id: rel.alunos?.id ?? idx,
        nome: rel.alunos?.nome ?? '',
        matricula: rel.alunos?.RA ?? '',
        turma: turmaSelecionada,
        total_pontos: rel.alunos?.total_pontos ?? 0
      }));

      setAlunos(alunosArray);
      setErro(null);
    } catch (error) {
      setErro('Erro ao buscar alunos: ' + error.message);
      setAlunos([]);
    }
  }, []);

  useEffect(() => {
    fetchAlunos();
  }, [fetchAlunos]);

  const gerarPDF = async (aluno) => {
    const [notas, avaliacoes] = await Promise.all([
      buscarNotasPorTurma(aluno.turma),
      buscarAvaliacoesPorTurma(aluno.turma)
    ]);
    const notasAluno = notas.filter(n => n.RA_aluno === aluno.matricula);

    const disciplinas = [...new Set(avaliacoes.map(a => a.disciplina))];
    const avaliacoesPorDisciplina = {};
    disciplinas.forEach(disc => {
      avaliacoesPorDisciplina[disc] = avaliacoes.filter(a => a.disciplina === disc);
    });

    const notasTable = disciplinas.map(disc => {
      const avs = avaliacoesPorDisciplina[disc];
      const medias = avs.map(av => {
        const notaObj = notasAluno.find(n => n.id_avaliacao === av.id);
        return notaObj ? notaObj.nota : null;
      }).filter(n => n !== null);
      const mediaDisciplina = medias.length ? (medias.reduce((a, b) => a + b, 0) / medias.length).toFixed(1) : '-';
      return [disc, mediaDisciplina];
    });

    // cálculo do ranking
    let ranking = '-';
    try {
      const alunosData = await buscarAlunosPorTurma(aluno.turma);

      const medias = await buscarMediasPorTurma(aluno.turma);
      const mediasMap = {};
      medias.forEach(m => {
        const ra = (m.RA || m.ra || '').toString().trim();
        mediasMap[ra] = m.media_ponderada;
      });

      alunosData.forEach(a => {
        const ra = (a.alunos?.RA || a.alunos?.ra || '').toString().trim();
        const media = mediasMap[ra] ?? 0;
        a.media_ponderada = media;
        a._score = media + ((a.alunos?.total_pontos ?? 0) / 15);
      });
      alunosData.sort((a, b) => b._score - a._score);

      const idx = alunosData.findIndex(a => a.alunos?.RA === aluno.matricula);
      if (idx !== -1) ranking = idx + 1;
    } catch (e) {
      // Se der erro, ranking fica '-'
    }

    gerarRelatorioPDF({
      aluno,
      ranking,
      totalPontos: aluno.total_pontos,
      notasTable
    });
  };

  return (
    <div className="pagina-relatorio">
      <Header />
      <div className="alunos-prof">
        <main className="container-fluid px-4">
          {erro && <div className="alert alert-danger" role="alert">{erro}</div>}
          <div className="table-responsive">
            <table className="table-alunos">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Turma</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno, idx) => (
                  <tr key={aluno.id || idx}>
                    <td>{aluno.nome}</td>
                    <td>{aluno.matricula}</td>
                    <td>{aluno.turma}</td>
                    <td>
                      <div className="acoes">
                        <div className="container-fluid botao">
                          <button className="btn-relatorio" onClick={() => gerarPDF(aluno)}>
                            Gerar Relatório PDF
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}