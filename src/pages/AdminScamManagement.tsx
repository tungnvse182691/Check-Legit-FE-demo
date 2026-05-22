import { useState } from "react";
import { useApp } from "../context/AppContext";

export function AdminScamManagement() {
  const { scams, approveScamReport, deleteScamReport } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(scams.length > 0 ? scams[0].id : null);

  const selectedScam = scams.find((s) => s.id === selectedId) || (scams.length > 0 ? scams[0] : null);

  const handleApprove = () => {
    if (selectedScam) {
      approveScamReport(selectedScam.id);
      alert(`Đã duyệt báo cáo của ${selectedScam.name} thành công!`);
    }
  };

  const handleReject = () => {
    if (selectedScam) {
      if (confirm(`Bạn có chắc chắn muốn xoá báo cáo của ${selectedScam.name}?`)) {
        deleteScamReport(selectedScam.id);
        setSelectedId(scams.length > 1 ? scams.filter(s => s.id !== selectedScam.id)[0].id : null);
        alert(`Đã xoá báo cáo thành công!`);
      }
    }
  };

  return (
    <div className="flex flex-col overflow-hidden h-full">
      <header className="h-20 flex items-center justify-between px-6 bg-surface dark:bg-surface-container-lowest border-b border-outline-variant shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-headline-md font-bold text-primary">Quản lý báo cáo lừa đảo</h2>
          <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded font-label-numeric text-xs font-bold uppercase">
            {scams.length} Bản ghi lừa đảo
          </span>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Main List Table */}
        <section className="flex-1 overflow-y-auto p-6">
          {scams.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-low rounded-xl border border-outline-variant">
              <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">info</span>
              <p className="font-bold text-headline-sm text-on-surface">Không có tin báo cáo nào trong hệ thống</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-100 border-b border-outline-variant text-slate-800 text-xs font-bold uppercase">
                      <th className="p-4">STT / Mã số</th>
                      <th className="p-4">Họ tên & Ngân hàng</th>
                      <th className="p-4">Số tài khoản / SĐT</th>
                      <th className="p-4">Trạng thái</th>
                      <th className="p-4">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant text-xs">
                    {scams.map((scam, i) => (
                      <tr 
                        key={scam.id} 
                        onClick={() => setSelectedId(scam.id)}
                        className={`hover:bg-slate-50 transition-colors cursor-pointer ${selectedId === scam.id ? "bg-slate-150 font-semibold border-l-4 border-l-primary" : ""}`}
                      >
                        <td className="p-4 text-slate-500 font-mono font-bold">#{scam.id.slice(0, 6) || i + 1}</td>
                        <td className="p-4">
                          <p className="font-bold text-slate-900 text-sm">{scam.name}</p>
                          <p className="text-[11px] text-slate-500">{scam.bankName || "Tài khoản khác"}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-mono text-xs text-slate-800 font-bold">{scam.accountNumber}</p>
                          <p className="text-[11px] text-slate-500">{scam.phone || "Telegram/Mạng xã hội"}</p>
                        </td>
                        <td className="p-4">
                          {scam.status === "Đã phê duyệt" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                              Đã phê duyệt
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 uppercase">
                              Đang chờ duyệt
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedId(scam.id);
                              // Simple fast approve triggering
                              approveScamReport(scam.id);
                            }}
                            className="bg-primary text-white font-bold px-3 py-1 rounded text-[10px] uppercase hover:bg-opacity-90 mr-2 cursor-pointer"
                          >
                            Duyệt nhanh
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Quick View Sidebar Panel */}
        <aside className="w-full lg:w-[450px] bg-slate-50 flex flex-col border-t lg:border-t-0 lg:border-l border-outline-variant shrink-0">
          {selectedScam ? (
            <>
              <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-white">
                <div>
                  <h3 className="text-headline-sm font-bold text-on-surface">Chi tiết tố cáo #{selectedScam.id.slice(0, 6)}</h3>
                  <p className="text-xs text-on-surface-variant font-mono">ID: {selectedScam.id}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-outline-variant">
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Đối tượng bị tố cáo</p>
                    <p className="font-bold text-sm text-red-600 uppercase">{selectedScam.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-outline-variant">
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Ngân hàng</p>
                      <p className="font-bold text-xs text-on-surface">{selectedScam.bankName || "Khác"}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-outline-variant">
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Số tài khoản</p>
                      <p className="font-mono font-bold text-xs text-red-600">{selectedScam.accountNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-outline-variant">
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Số điện thoại</p>
                      <p className="font-bold text-xs text-on-surface">{selectedScam.phone || "Không có"}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-outline-variant">
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Telegram</p>
                      <p className="font-bold text-xs text-on-surface">{selectedScam.telegram || "Không có"}</p>
                    </div>
                  </div>

                  {selectedScam.website && (
                    <div className="p-4 bg-white rounded-lg border border-outline-variant">
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Website lừa đảo</p>
                      <p className="font-mono text-xs text-blue-600 underline truncate">{selectedScam.website}</p>
                    </div>
                  )}

                  <div className="p-4 bg-white rounded-lg border border-outline-variant">
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Số tiền chiếm đoạt ước tính</p>
                    <p className="font-bold text-sm text-red-600">
                      {selectedScam.scamAmount ? `${Number(selectedScam.scamAmount).toLocaleString("vi-VN")}đ` : "Không khai báo"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Mô tả hành vi gian lận</p>
                    <div className="p-4 bg-white border border-outline-variant rounded-lg text-xs leading-relaxed text-on-surface whitespace-pre-line max-h-40 overflow-y-auto">
                      {selectedScam.desc}
                    </div>
                  </div>

                  {selectedScam.images && selectedScam.images.length > 0 && (
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Ảnh bằng chứng ({selectedScam.images.length})</p>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        {selectedScam.images.map((imgUrl, idx) => (
                          <img 
                            key={idx} 
                            src={imgUrl} 
                            className="w-full h-16 object-cover rounded border" 
                            alt="bằng chứng"
                            referrerPolicy="no-referrer"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 bg-white border-t border-outline-variant space-y-3">
                 <button 
                  onClick={handleApprove}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase py-3.5 rounded-lg flex items-center justify-center gap-3 transition-all font-bold cursor-pointer"
                 >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  Phê duyệt tố cáo lên Danh sách Đen
                </button>
                <button 
                  onClick={handleReject}
                  className="w-full py-3 border border-red-300 text-red-600 text-xs uppercase rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  Bác bỏ & Hoàn toàn Gỡ bỏ tố cáo này
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center p-6 text-center text-slate-400 text-xs">
              Vui lòng chọn một báo cáo từ danh sách bên trái để kiểm duyệt.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
