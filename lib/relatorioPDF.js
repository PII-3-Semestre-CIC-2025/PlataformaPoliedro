import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export async function gerarRelatorioPDF({ aluno, ranking, totalPontos, notasTable }) {
    const doc = new jsPDF();

    const dataAtual = new Date().toLocaleDateString();

    doc.setFontSize(16);
    doc.text('Relatório Individual', 14, 20);

    doc.setFontSize(10);
    doc.text(`Data de emissão: ${dataAtual}`, 196, 20, { align: 'right' });

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(.2);
    doc.line(14, 24, 196, 24);

    const infoStartY = 32;
    const lineGap = 8;

    doc.setFontSize(12);

    // Nome
    doc.setFont('helvetica', 'bold');
    const nomeLabel = 'Nome:';
    doc.text(nomeLabel, 14, infoStartY);
    doc.setFont('helvetica', 'normal');
    doc.text(aluno.nome, 14 + doc.getTextWidth(nomeLabel) + 2, infoStartY);

    // RA
    doc.setFont('helvetica', 'bold');
    const raLabel = 'RA:';
    doc.text(raLabel, 14, infoStartY + lineGap);
    doc.setFont('helvetica', 'normal');
    doc.text(aluno.matricula, 14 + doc.getTextWidth(raLabel) + 2, infoStartY + lineGap);

    // Turma
    doc.setFont('helvetica', 'bold');
    const turmaLabel = 'Turma:';
    doc.text(turmaLabel, 14, infoStartY + lineGap * 2);
    doc.setFont('helvetica', 'normal');
    doc.text(aluno.turma, 14 + doc.getTextWidth(turmaLabel) + 2, infoStartY + lineGap * 2);

    doc.line(14, 56, 196, 56);

    // Posição no Ranking
    doc.setFont('helvetica', 'bold');
    const rankingLabel = 'Posição no Ranking da Turma:';
    doc.text(rankingLabel, 14, 68);
    doc.setFont('helvetica', 'normal');
    doc.text(`${ranking}° Lugar`, 14 + doc.getTextWidth(rankingLabel) + 6, 68);

    // Total de Pontos
    doc.setFont('helvetica', 'bold');
    const pontosLabel = 'Total de Pontos:';
    doc.text(pontosLabel, 14, 76);
    doc.setFont('helvetica', 'normal');
    doc.text(`${totalPontos} PoliPoints`, 14 + doc.getTextWidth(pontosLabel) + 4, 76);

    autoTable(doc, {
        startY: 86,
        head: [['Disciplina', 'Média']],
        body: notasTable,
        styles: {
        lineWidth: 0.2,
        lineColor: [0, 0, 0]
        },
        alternateRowStyles: {
        fillColor: [240, 240, 240]
        }
    });

    doc.save(`relatorio-${aluno.nome}.pdf`);
}