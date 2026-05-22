import { Link, useLocation } from "react-router-dom";
import { useState, ReactNode } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItemClass = (path: string) => {
    const isActive = location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
    return isActive 
      ? "text-primary border-b-2 border-primary font-bold pb-1 text-label-sm"
      : "text-on-surface-variant hover:text-primary transition-colors text-label-sm";
  };

  return (
    <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 lg:px-margin-desktop h-20 w-full max-w-max-width mx-auto relative">
        <Link to="/" className="text-headline-md font-bold text-primary">Check Legit</Link>
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className={navItemClass("/")}>Trang chủ</Link>
          <Link to="/reports" className={navItemClass("/reports")}>Danh sách tố cáo</Link>
          <Link to="/legit" className={navItemClass("/legit")}>Danh sách uy tín</Link>
          <Link to="/about" className={navItemClass("/about")}>Giới thiệu</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/report" className="hidden lg:flex bg-primary text-on-primary px-6 py-2 rounded-lg text-label-sm font-bold hover:opacity-90 active:scale-95 transition-all">
            Báo cáo ngay
          </Link>
          <button 
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block lg:!hidden material-symbols-outlined text-on-surface-variant p-2 hover:bg-slate-100 rounded-lg active:scale-95 transition-all cursor-pointer focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? "close" : "menu"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-outline-variant absolute top-20 left-0 w-full shadow-lg z-50 transition-all origin-top animate-fade-in">
          <nav className="flex flex-col p-6 space-y-4">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-body-md py-2 font-medium border-b border-slate-100 ${location.pathname === "/" ? "text-primary font-bold" : "text-on-surface-variant"}`}
            >
              Trang chủ
            </Link>
            <Link 
              to="/reports" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-body-md py-2 font-medium border-b border-slate-100 ${location.pathname.startsWith("/reports") ? "text-primary font-bold" : "text-on-surface-variant"}`}
            >
              Danh sách tố cáo
            </Link>
            <Link 
              to="/legit" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-body-md py-2 font-medium border-b border-slate-100 ${location.pathname.startsWith("/legit") ? "text-primary font-bold" : "text-on-surface-variant"}`}
            >
              Danh sách uy tín
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsMenuOpen(false)}
              className={`text-body-md py-2 font-medium border-b border-slate-100 ${location.pathname === "/about" ? "text-primary font-bold" : "text-on-surface-variant"}`}
            >
              Giới thiệu
            </Link>
            <Link 
              to="/report" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-primary text-on-primary text-center py-3 rounded-lg text-label-sm font-bold shadow-md hover:opacity-90 active:scale-95 transition-all block mt-4"
            >
              Báo cáo lừa đảo ngay
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant pt-16 pb-8">
      <div className="max-w-max-width mx-auto px-6 md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter mb-12">
        <div className="md:col-span-1">
          <div className="text-headline-md text-primary font-bold mb-4">Check Legit</div>
          <p className="text-body-md text-on-surface-variant">© 2024 Check Legit. Uncompromising Vigilance.</p>
        </div>
        <div>
          <div className="font-bold mb-4 uppercase text-xs tracking-widest text-on-surface">Về chúng tôi</div>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-on-surface-variant hover:underline text-label-sm">Giới thiệu</Link></li>
            <li><Link to="#" className="text-on-surface-variant hover:underline text-label-sm">Quy trình xác minh</Link></li>
            <li><Link to="/contact" className="text-on-surface-variant hover:underline text-label-sm">Liên hệ</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-bold mb-4 uppercase text-xs tracking-widest text-on-surface">Pháp lý</div>
          <ul className="space-y-2">
            <li><Link to="#" className="text-on-surface-variant hover:underline text-label-sm">Điều khoản sử dụng</Link></li>
            <li><Link to="#" className="text-on-surface-variant hover:underline text-label-sm">Chính sách bảo mật</Link></li>
            <li><Link to="#" className="text-on-surface-variant hover:underline text-label-sm">Cơ chế khiếu nại</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-bold mb-4 uppercase text-xs tracking-widest text-on-surface">Kết nối</div>
          <div className="flex gap-4">
            <a href="#" className="bg-on-surface-variant/10 p-2 rounded-full hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-primary">public</span>
            </a>
            <a href="#" className="bg-on-surface-variant/10 p-2 rounded-full hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-primary">share</span>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center border-t border-outline-variant pt-8 text-on-surface-variant text-label-sm">
        Nền tảng được bảo vệ bởi hệ thống an ninh đa lớp. Mọi hành vi tấn công dữ liệu sẽ bị truy cứu trách nhiệm pháp lý.
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
