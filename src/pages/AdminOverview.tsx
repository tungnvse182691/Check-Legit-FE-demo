import { useApp } from "../context/AppContext";

export function AdminOverview() {
  const { scams, legitList } = useApp();

  const totalReports = scams.length;
  const pendingReports = scams.filter((s) => s.status === "Chờ duyệt").length;
  const approvedReports = scams.filter((s) => s.status === "Đã phê duyệt").length;
  const totalLegit = legitList.length;

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-max-width mx-auto space-y-gutter">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <h2 className="text-headline-md font-bold text-on-surface">Tổng quan hệ thống</h2>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-label-sm uppercase border border-primary/20">Hệ thống quản trị</span>
          </div>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-inverse-surface border border-outline-variant p-6 rounded-xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-surface-variant font-label-sm uppercase tracking-wider text-slate-300 text-xs">Tổng tố cáo (gốc)</span>
              <span className="material-symbols-outlined text-red-500">gpp_bad</span>
            </div>
            <div className="mt-4">
              <div className="font-label-numeric text-[32px] font-extrabold text-white">{totalReports} vụ việc</div>
            </div>
          </div>

          <div className="bg-inverse-surface border border-outline-variant p-6 rounded-xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-surface-variant font-label-sm uppercase tracking-wider text-slate-300 text-xs text-amber-500">Yêu cầu Chờ duyệt</span>
              <span className="material-symbols-outlined text-amber-500">gpp_maybe</span>
            </div>
            <div className="mt-4">
              <div className="font-label-numeric text-[32px] font-extrabold text-amber-500">{pendingReports} hồ sơ</div>
            </div>
          </div>

          <div className="bg-inverse-surface border border-outline-variant p-6 rounded-xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-surface-variant font-label-sm uppercase tracking-wider text-slate-300 text-xs text-emerald-500">Đã phê duyệt công khai</span>
              <span className="material-symbols-outlined text-emerald-500">verified_user</span>
            </div>
            <div className="mt-4">
              <div className="font-label-numeric text-[32px] font-extrabold text-emerald-500">{approvedReports} vụ</div>
            </div>
          </div>

          <div className="bg-inverse-surface border border-outline-variant p-6 rounded-xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-surface-variant font-label-sm uppercase tracking-wider text-slate-300 text-xs">Cửa hàng Uy tín (Ký Quỹ)</span>
              <span className="material-symbols-outlined text-secondary">verified</span>
            </div>
            <div className="mt-4">
              <div className="font-label-numeric text-[32px] font-extrabold text-white">{totalLegit} thương hiệu</div>
            </div>
          </div>
        </div>

        {/* Detailed Data Table */}
        <div className="bg-inverse-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm mt-8">
          <div className="px-8 py-6 border-b border-outline-variant flex justify-between items-center bg-black/20">
            <h3 className="text-white font-headline-md">Nhật ký hoạt động gần đây</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/40 text-surface-variant text-label-sm uppercase tracking-widest text-slate-300 text-xs">
                <tr>
                  <th className="px-8 py-4">Sản Phẩm / Tên người gửi</th>
                  <th className="px-8 py-4">Chi tiết / Định danh</th>
                  <th className="px-8 py-4">Trạng thái duyệt</th>
                  <th className="px-8 py-4">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {scams.slice(0, 5).map((scam) => (
                  <tr key={scam.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-[18px]">person_off</span>
                      </div>
                      <span className="text-white text-body-md font-bold text-sm">{scam.name}</span>
                    </td>
                    <td className="px-8 py-4 text-slate-300 text-xs block truncate max-w-xs md:max-w-md">
                      {scam.accountNumber} ({scam.bankName})
                    </td>
                    <td className="px-8 py-4">
                      {scam.status === "Đã phê duyệt" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-error-container text-on-error-container border border-error/50">ĐÃ TỐ CÁO</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-500 border border-amber-500/50">CHỜ DUYỆT</span>
                      )}
                    </td>
                    <td className="px-8 py-4 text-slate-400 font-label-numeric text-xs">{scam.date || "Cách đây 5m"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
