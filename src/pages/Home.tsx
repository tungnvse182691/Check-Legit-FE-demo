import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function Home() {
  const { scams, legitList } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<{
    status: "scam" | "legit" | "not_found";
    item?: any;
    searchedTerm: string;
  } | null>(null);

  // Dynamic counter metrics
  const approvedScamsCount = scams.filter((s) => s.status === "Đã phê duyệt").length;
  // Calculate a nice demo sum: base count of 12480 plus dynamically approved ones
  const totalScamsPhá = 12480 + approvedScamsCount;
  const totalMoneyLấyLại = "8.540.000.000 VNĐ";

  // Newest 4 approved scams
  const latestScams = scams
    .filter((s) => s.status === "Đã phê duyệt")
    .slice(0, 4);

  // Top 3 legit sellers
  const topLegit = legitList.slice(0, 3);

  const handleSearch = () => {
    if (!query.trim()) return;

    const term = query.trim().replace(/\s+/g, "").toLowerCase();

    // Check scam database
    const foundScam = scams.find((s) => {
      if (s.status !== "Đã phê duyệt") return false;
      const matchPhone = s.phone?.replace(/\s+/g, "").toLowerCase() === term;
      const matchAccountNumber = s.accountNumber?.replace(/\s+/g, "").toLowerCase() === term;
      const matchName = s.name.replace(/\s+/g, "").toLowerCase().includes(term);
      return matchPhone || matchAccountNumber || matchName;
    });

    if (foundScam) {
      setSearchResult({
        status: "scam",
        item: foundScam,
        searchedTerm: query,
      });
      return;
    }

    // Check legit database
    const foundLegit = legitList.find((l) => {
      const matchPhone = l.phone?.replace(/\s+/g, "").toLowerCase() === term;
      const matchTelegram = l.telegram?.replace(/\s+/g, "").toLowerCase() === term;
      const matchName = l.name.replace(/\s+/g, "").toLowerCase().includes(term);
      return matchPhone || matchTelegram || matchName;
    });

    if (foundLegit) {
      setSearchResult({
        status: "legit",
        item: foundLegit,
        searchedTerm: query,
      });
      return;
    }

    // If nothing found
    setSearchResult({
      status: "not_found",
      searchedTerm: query,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-24 bg-surface-container-lowest overflow-hidden border-b border-outline-variant">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#b80035_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="relative z-10 max-w-max-width mx-auto px-4 sm:px-6 md:px-margin-desktop text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-display-lg mb-4 text-on-surface font-extrabold tracking-tight leading-tight">
            Tra cứu thông tin lừa đảo nhanh chóng
          </h1>
          <p className="text-sm sm:text-body-lg text-on-surface-variant mb-8 sm:mb-12 max-w-2xl mx-auto">
            Hệ thống xác minh danh tính và cảnh báo lừa đảo trực tuyến hàng đầu, giúp bạn giao dịch an toàn và minh bạch.
          </p>
          
          {/* Central Search Bar */}
          <div className="max-w-4xl mx-auto relative mb-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white border-2 border-primary p-2 rounded-xl shadow-lg focus-within:ring-2 focus-within:ring-primary/20 gap-2">
              <div className="flex items-center flex-grow py-1 sm:py-0">
                <span className="material-symbols-outlined px-3 text-outline">search</span>
                <input 
                  className="w-full border-none focus:ring-0 font-body-md py-2 sm:py-4 outline-none text-sm sm:text-base text-on-surface" 
                  placeholder="Nhập số điện thoại, số tài khoản hoặc tên để kiểm tra..." 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-primary text-white cursor-pointer px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all text-sm sm:text-base shrink-0 uppercase tracking-wider"
              >
                KIỂM TRA
              </button>
            </div>
          </div>

          {/* Search Result Box */}
          {searchResult && (
            <div className="max-w-4xl mx-auto text-left mb-6 animate-fade-in">
              {searchResult.status === "scam" && (
                <div className="bg-error-container border-4 border-error p-4 sm:p-6 rounded-xl shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className="material-symbols-outlined text-error text-5xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_bad</span>
                    <div className="flex-grow">
                      <h3 className="text-lg sm:text-headline-md font-bold text-error uppercase">XÁC ĐỊNH LỪA ĐẢO TRÙNG KHỚP!</h3>
                      <p className="text-xs sm:text-body-md text-on-error-container font-semibold mt-1">
                        Thông tin "<span className="underline font-bold">{searchResult.searchedTerm}</span>" trùng khớp với hồ sơ lừa đảo đã xác thực của <span className="font-extrabold text-red-700">{searchResult.item.name}</span>!
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 mt-4 bg-white/70 p-3 sm:p-4 rounded-lg text-xs sm:text-sm border border-error/20">
                        <div><strong className="text-on-surface-variant">Số tài khoản:</strong> {searchResult.item.accountNumber} ({searchResult.item.bankName})</div>
                        <div><strong className="text-on-surface-variant">SĐT / Zalo:</strong> {searchResult.item.phone || "Không có"}</div>
                        <div className="md:col-span-2"><strong className="text-on-surface-variant">Mô tả vụ việc:</strong> {searchResult.item.desc}</div>
                      </div>
                    </div>
                    <div className="w-full sm:w-auto mt-2 sm:mt-0">
                      <Link 
                        to={`/reports/${searchResult.item.id}`} 
                        className="block text-center bg-error text-white font-bold px-5 py-3 rounded-lg text-xs sm:text-label-sm hover:opacity-90 active:scale-95 transition-all uppercase"
                      >
                        XEM BẰNG CHỨNG
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {searchResult.status === "legit" && (
                <div className="bg-emerald-50 border-4 border-emerald-500 p-6 rounded-xl shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className="material-symbols-outlined text-emerald-600 text-5xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <div className="flex-grow">
                      <h3 className="text-headline-md font-bold text-emerald-800 uppercase">THƯƠNG HIỆU UY TÍN ĐÃ XÁC MINH!</h3>
                      <p className="text-body-md text-emerald-900 font-semibold mt-1">
                        Đối tượng "<span className="underline">{searchResult.searchedTerm}</span>" là <span className="font-extrabold">{searchResult.item.name}</span>, đối tác uy tín được ký quỹ bảo hiểm giao dịch thành công.
                      </p>
                      <div className="grid grid-cols-3 gap-2 mt-4 bg-white/70 p-3 rounded-lg text-xs text-emerald-900 text-center">
                        <div>
                          <p className="text-[10px] text-on-surface-variant uppercase">Quỹ Ký quỹ</p>
                          <p className="font-bold text-sm text-emerald-700">{(searchResult.item.insurance).toLocaleString("vi-VN")}đ</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-on-surface-variant uppercase">Điểm tín nhiệm</p>
                          <p className="font-bold text-sm text-emerald-700">{searchResult.item.score}/100</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-on-surface-variant uppercase">Giao dịch</p>
                          <p className="font-bold text-sm text-emerald-700">{searchResult.item.successTrans} GD</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-auto mt-4 sm:mt-0">
                      <Link 
                        to={`/legit/${searchResult.item.id}`} 
                        className="block text-center bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg text-label-sm hover:opacity-90 active:scale-95 transition-all"
                      >
                        XEM CỬA HÀNG
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {searchResult.status === "not_found" && (
                <div className="bg-slate-50 border-4 border-slate-400 p-6 rounded-xl shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className="material-symbols-outlined text-slate-500 text-5xl shrink-0">gpp_maybe</span>
                    <div className="flex-grow">
                      <h3 className="text-headline-md font-bold text-slate-700 uppercase">CHƯA CÓ BÁO CÁO VI PHẠM</h3>
                      <p className="text-body-md text-slate-600 mt-1">
                        Hệ thống hiện chưa thấy báo cáo lừa đảo hoặc thông tin tín nhiệm đã đăng ký nào trùng khớp với "<span className="underline">{searchResult.searchedTerm}</span>".
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        *Lưu ý: Việc chưa có báo cáo không đồng nghĩa đối tượng an toàn 100%. Luôn thực hiện giao dịch trung gian hoặc kiểm tra kỹ lưỡng trước khi chuyển khoản.
                      </p>
                    </div>
                    <div className="w-full sm:w-auto mt-4 sm:mt-0">
                      <button 
                        onClick={() => setSearchResult(null)}
                        className="block w-full text-center bg-slate-600 text-white font-bold px-6 py-3 rounded-lg text-label-sm hover:opacity-90 transition-all cursor-pointer"
                      >
                        ĐÓNG
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Counter Widget */}
      <section className="bg-inverse-surface py-12">
        <div className="max-w-max-width mx-auto px-6 md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter text-center">
          <div className="flex flex-col items-center">
            <div className="text-label-sm text-secondary-fixed mb-2 uppercase tracking-widest text-slate-400">Số vụ lừa đảo đã phá</div>
            <div className="font-label-numeric text-4xl font-bold text-primary-container bg-black/30 px-6 py-2 rounded-lg border border-primary/30">
              {totalScamsPhá.toLocaleString("vi-VN")}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-label-sm text-secondary-fixed mb-2 uppercase tracking-widest text-slate-400">Tổng số tiền đã lấy lại</div>
            <div className="font-label-numeric text-4xl font-bold text-primary-container bg-black/30 px-6 py-2 rounded-lg border border-primary/30">
              {totalMoneyLấyLại}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Two-column layout */}
      <section className="max-w-max-width mx-auto px-6 md:px-margin-desktop py-16 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Scam Reports */}
        <div className="lg:col-span-7 bg-error-container/10 border border-error/20 rounded-2xl overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-error-container p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_bad</span>
                <h2 className="text-headline-md font-bold text-on-error-container">Tố cáo mới nhất</h2>
              </div>
              <Link to="/reports" className="text-on-error-container underline text-label-sm font-bold">Xem tất cả</Link>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              {latestScams.map((report) => (
                <div key={report.id} className="bg-white p-4 border-l-4 border-error shadow-sm rounded-r-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex-grow pr-2 w-full">
                    <div className="font-bold text-body-md mb-1 flex flex-wrap items-center gap-2">
                      <span className="text-on-surface">{report.name}</span>
                      <span className="bg-error-container text-on-error-container text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {report.type}
                      </span>
                    </div>
                    <div className="text-on-surface-variant text-xs font-mono mb-2">
                      SĐT: {report.phone || "---"} | TK: {report.accountNumber} ({report.bankName})
                    </div>
                    <div className="text-on-surface-variant text-xs sm:text-sm line-clamp-2">{report.desc}</div>
                  </div>
                  <div className="text-left sm:text-right shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-dashed border-outline-variant flex sm:flex-col justify-between items-center sm:items-end">
                    <div>
                      <div className="font-label-numeric text-error font-bold text-sm sm:text-base">{(report.amount).toLocaleString("vi-VN")}đ</div>
                      <div className="text-[10px] text-outline uppercase font-bold">{report.time}</div>
                    </div>
                    <Link to={`/reports/${report.id}`} className="inline-block bg-error-container sm:bg-transparent text-on-error-container sm:text-primary px-3 py-1 sm:p-0 rounded text-xs font-bold hover:underline mt-1">
                      Chi tiết <span className="align-middle text-xs font-normal">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Legit List */}
        <div className="lg:col-span-5 bg-white border border-outline-variant rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <div className="bg-surface-container-high p-6 flex items-center justify-between border-b border-outline-variant">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <h2 className="text-headline-md font-bold text-on-surface">Danh sách uy tín</h2>
              </div>
              <span className="text-secondary text-label-sm font-bold uppercase tracking-widest">Uy tín</span>
            </div>
            <div className="divide-y divide-outline-variant">
              {topLegit.map((legit) => (
                <Link to={`/legit/${legit.id}`} key={legit.id} className="p-6 flex items-center gap-4 hover:bg-surface-container-low transition-colors block">
                  <img src={legit.img} alt="Avatar" className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200"/>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-body-md text-on-surface text-sm sm:text-base">{legit.name}</span>
                      <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <div className="text-xs text-on-surface-variant line-clamp-1">{legit.role}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-secondary font-bold font-label-numeric">{legit.score}/100</div>
                    <div className="text-[10px] text-outline">{(legit.insurance).toLocaleString("vi-VN")}đ Quỹ</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="p-6 bg-surface-container-low text-center border-t border-outline-variant">
            <Link to="/legit" className="text-primary font-bold text-label-sm hover:underline">XEM DANH SÁCH UY TÍN ĐẦY ĐỦ</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-max-width mx-auto px-6 md:px-margin-desktop mb-24">
        <div className="bg-primary text-on-primary rounded-3xl p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-headline-lg font-bold mb-4">Bạn vừa gặp một kẻ lừa đảo?</h2>
            <p className="text-body-lg opacity-90 max-w-xl">Hãy báo cáo ngay để cộng đồng cùng phòng tránh. Mỗi thông tin của bạn góp phần làm trong sạch không gian mạng.</p>
          </div>
          <Link to="/report" className="relative z-10 bg-white text-primary px-10 py-5 rounded-xl font-bold text-headline-md active:scale-95 duration-100 shadow-xl inline-block text-center">
            TỐ CÁO NGAY
          </Link>
          <div className="absolute right-0 top-0 opacity-10 scale-150 translate-x-1/4 -translate-y-1/4">
            <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_bad</span>
          </div>
        </div>
      </section>
    </div>
  );
}
