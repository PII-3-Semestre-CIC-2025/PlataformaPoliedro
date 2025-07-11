'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/header-globals.css'
import { useRouter } from 'next/navigation'

export const Header = () => {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    await fetch('/api/auth/logout');
    router.push('/login');
  };

  return (
    <header className="header-base">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-6 d-flex align-items-center">
            <a href="/menu-aluno" className="logo-link">
              <img src="/images/logo-cubo.png" alt="Logo" className="logo" />
            </a>
          </div>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <a href="#" className="logout-btn" onClick={handleLogout}>
              <img src="/images/IconLogout.png" alt="Sair" />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}