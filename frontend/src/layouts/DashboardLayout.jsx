import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
          © 2026 Student Helpdesk System
        </div>
      </footer>

    </div>
  )
}

export default DashboardLayout