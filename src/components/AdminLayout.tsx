import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";

export function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

  const navItemClass = (path: string) => {
    const isActive = location.pathname === path || (path !== "/admin" && location.pathname.startsWith(path));
    return isActive 
      ? "bg-secondary-container text-on-secondary-container rounded-xl flex items-center gap-4 px-4 py-3 transition-all"
      : "text-surface-variant hover:text-white flex items-center gap-4 px-4 py-3 transition-all hover:bg-surface-variant/10";
  };

  return (
    <div className="bg-inverse-surface text-on-surface-variant selection:bg-primary selection:text-white overflow-hidden h-screen flex dark">
      {/* SideNavBar Component */}
      <aside className="hidden md:flex flex-col h-full w-64 bg-inverse-surface border-r border-outline/20 py-8 shadow-md shrink-0">
        <div className="px-6 mb-10">
          <Link to="/admin">
            <h1 className="text-headline-md font-black text-secondary-fixed">Check Legit</h1>
            <p className="text-surface-variant text-label-sm mt-1">Trang quản trị • Kiểm soát cảnh giác</p>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/admin" className={navItemClass("/admin")}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span className="text-label-sm uppercase tracking-wider">Tổng quan</span>
          </Link>
          <Link to="/admin/scams" className={navItemClass("/admin/scams")}>
            <span className="material-symbols-outlined">gpp_bad</span>
            <span className="text-label-sm uppercase tracking-wider">Quản lý tố cáo</span>
          </Link>
          <Link to="/admin/legit" className={navItemClass("/admin/legit")}>
            <span className="material-symbols-outlined">verified_user</span>
            <span className="text-label-sm uppercase tracking-wider">Quản lý uy tín</span>
          </Link>
        </nav>
        <div className="px-4 mt-auto space-y-2">
          <button className="w-full bg-primary text-white text-label-sm py-3 rounded-xl hover:bg-primary-container transition-colors mb-6 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Thêm mới
          </button>
          <Link to="/admin/settings" className="text-surface-variant hover:text-white flex items-center gap-4 px-4 py-2 transition-all hover:bg-surface-variant/10">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-label-sm uppercase tracking-wider">Cài đặt</span>
          </Link>
          <Link to="/" className="text-surface-variant hover:text-white flex items-center gap-4 px-4 py-2 transition-all hover:bg-surface-variant/10">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-label-sm uppercase tracking-wider">Quay lại trang</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        {children}
      </main>

      {/* Mobile Navigation (Responsive Pivot) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant px-margin-mobile py-3 flex justify-around items-center z-50">
        <Link to="/admin" className={`flex flex-col items-center gap-1 ${location.pathname === '/admin' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] text-label-sm uppercase">Tổng quan</span>
        </Link>
        <Link to="/admin/scams" className={`flex flex-col items-center gap-1 ${location.pathname === '/admin/scams' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">gpp_bad</span>
          <span className="text-[10px] text-label-sm uppercase">Tố cáo</span>
        </Link>
        <Link to="/admin/legit" className={`flex flex-col items-center gap-1 ${location.pathname === '/admin/legit' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">verified_user</span>
          <span className="text-[10px] text-label-sm uppercase">Uy tín</span>
        </Link>
        <Link to="/admin/settings" className={`flex flex-col items-center gap-1 ${location.pathname === '/admin/settings' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] text-label-sm uppercase">Cài đặt</span>
        </Link>
      </nav>
    </div>
  );
}
