import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from "@/app/components/header-prof";
import '@/styles/dashboardprof.css'
import Link from 'next/link';

const DashboardProf = () => {
    return (
        <div className="professor-dashboard">            
            <Header />
            <div className="container" style={{ marginTop: '100px' }}>
                <div className="row menuRow">
                    <div className="col-md-4">
                        <Link href="/dashboard-prof/alunos" className="menuBtn bgAlunos">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" width="100" height="100"><path d="M479-120 189-279v-240L40-600l439-240 441 240v317h-60v-282l-91 46v240L479-120Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127v-168L479-360 249-485v170l230 127Zm1-240Zm-1 74Zm0 0Z"/></svg>
                            <i className="fas fa-graduation-cap"></i> Alunos
                        </Link>
                    </div>                    
                    <div className="col-md-4">
                        <Link href="/dashboard-prof/pontuacao" className="menuBtn bgPontuacao">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" width="100" height="100"><path d="m385-412 36-115-95-74h116l38-119 37 119h117l-95 74 35 115-94-71-95 71ZM244-40v-304q-45-47-64.5-103T160-560q0-136 92-228t228-92q136 0 228 92t92 228q0 57-19.5 113T716-344v304l-236-79-236 79Zm236-260q109 0 184.5-75.5T740-560q0-109-75.5-184.5T480-820q-109 0-184.5 75.5T220-560q0 109 75.5 184.5T480-300ZM304-124l176-55 176 55v-171q-40 29-86 42t-90 13q-44 0-90-13t-86-42v171Zm176-86Z"/></svg>
                            <i className="fas fa-award"></i> Pontuação
                        </Link>
                    </div>                    
                    <div className="col-md-4">
                        <Link href="/dashboard-prof/ranking" className="menuBtn bgRanking">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" width="100" height="100"><path d="M298-120v-60h152v-148q-54-11-96-46.5T296-463q-74-8-125-60t-51-125v-44q0-25 17.5-42.5T180-752h104v-88h392v88h104q25 0 42.5 17.5T840-692v44q0 73-51 125t-125 60q-16 53-58 88.5T510-328v148h152v60H298Zm-14-406v-166H180v44q0 45 29.5 78.5T284-526Zm196 141q57 0 96.5-40t39.5-97v-258H344v258q0 57 39.5 97t96.5 40Zm196-141q45-10 74.5-43.5T780-648v-44H676v166Zm-196-57Z"/></svg>
                            <i className="fas fa-list-ol"></i> Ranking
                        </Link>
                    </div>                    
                    <div className="col-md-4">
                        <Link href="/dashboard-prof/avaliacoes" className="menuBtn bgAvaliacoes">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" width="100" height="100"><path d="M180-120q-24.75 0-42.37-17.63Q120-155.25 120-180v-600q0-24.75 17.63-42.38Q155.25-840 180-840h205q5-35 32-57.5t63-22.5q36 0 63 22.5t32 57.5h205q24.75 0 42.38 17.62Q840-804.75 840-780v600q0 24.75-17.62 42.37Q804.75-120 780-120H180Zm0-60h600v-600H180v600Zm100-100h273v-60H280v60Zm0-170h400v-60H280v60Zm0-170h400v-60H280v60Zm200-177q14 0 24.5-10.5T515-832q0-14-10.5-24.5T480-867q-14 0-24.5 10.5T445-832q0 14 10.5 24.5T480-797ZM180-180v-600 600Z"/></svg>
                            <i className="fas fa-clipboard-list"></i> Avaliações
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link href="/dashboard-prof/relatorio" className="menuBtn bgRelatorios">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" width="100" height="100"><path d="M180-180v-600 224-33 409Zm97-270h253.7q2.3-16 6.3-31t12-29H277v60Zm0 171h198q17-14 36.5-23.5T552-319v-20H277v60Zm0-342h406v-60H277v60Zm-97 501q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v345q0-37-16.5-68.5T780-556v-224H180v600h248v60H180Zm504-221q-39.48 0-66.74-27.26Q590-395.52 590-435q0-39.48 27.26-66.74Q644.52-529 684-529q39.48 0 66.74 27.26Q778-474.48 778-435q0 39.48-27.26 66.74Q723.48-341 684-341ZM488-120v-51q0-26 11-44.5t31-28.5q37-19 75-28t79-9q41 0 79 8.5t75 28.5q20 9 31 28t11 45v51H488Z"/></svg>
                            <i className="fas fa-file-alt"></i> Relatórios
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link href="/dashboard-prof/categorias" className="menuBtn bgCategorias">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" width="100" height="100"><path d="m261-526 220-354 220 354H261ZM706-80q-74 0-124-50t-50-124q0-74 50-124t124-50q74 0 124 50t50 124q0 74-50 124T706-80Zm-586-25v-304h304v304H120Zm586.08-35Q754-140 787-173.08q33-33.09 33-81Q820-302 786.92-335q-33.09-33-81-33Q658-368 625-334.92q-33 33.09-33 81Q592-206 625.08-173q33.09 33 81 33ZM180-165h184v-184H180v184Zm189-421h224L481-767 369-586Zm112 0ZM364-349Zm342 95Z"/></svg>
                            <i className="fas fa-cog"></i> Categorias
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardProf;