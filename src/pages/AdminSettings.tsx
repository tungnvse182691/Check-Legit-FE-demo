import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export function AdminSettings() {
  const { scams, legitList } = useApp();
  const [requireEvidence, setRequireEvidence] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [minInsurance, setMinInsurance] = useState("10000000");
  const [adminName, setAdminName] = useState("Ban điều hành Check Legit Việt Nam");
  const [adminEmail, setAdminEmail] = useState("support@checklegit.vn");
  const [botToken, setBotToken] = useState("5394883:AAEeB8hFm3z...");
  const [isSaved, setIsSaved] = useState(false);

  // Local storage management to clear data
  const handleResetData = () => {
    if (confirm("Bạn có chắc chắn muốn đặt lại tất cả dữ liệu về trạng thái ban đầu? Thao tác này sẽ xoá toàn bộ dữ liệu tự thêm dạo gần đây và tải lại dữ liệu mẫu.")) {
      localStorage.removeItem("check_legit_scams");
      localStorage.removeItem("check_legit_legit");
      alert("Đã xoá bộ nhớ đệm! Vui lòng tải lại trang để áp dụng cấu hình mặc định.");
      window.location.reload();
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden">
      <header className="h-20 bg-surface border-b border-outline-variant flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-headline-md font-bold text-on-surface">Cài đặt hệ thống quản trị</h2>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
            v1.2.0 • Hoạt động ổn định
          </span>
        </div>
      </header>

      <div className="p-6 max-w-3xl mx-auto w-full overflow-y-auto flex-1 space-y-6">
        {isSaved && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 animate-fade-in text-semibold text-sm">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            Đã lưu lại cấu hình cài đặt hệ thống thành công!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 text-sm">
          {/* Section 1: Review Guidelines & Moderation */}
          <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-on-surface flex items-center gap-2 border-b border-outline-variant pb-2">
              <span className="material-symbols-outlined text-[20px] text-primary">security</span>
              Cơ chế kiểm duyệt & bảo vệ pháp lý
            </h3>
            
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-bold text-on-surface">Yêu cầu hình ảnh bằng chứng số</p>
                <p className="text-xs text-on-surface-variant">Buộc người dùng phải tải lên ảnh chụp bill chuyển tiền / tin nhắn lừa đảo.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={requireEvidence} 
                  onChange={(e) => setRequireEvidence(e.target.checked)} 
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-slate-100">
              <div>
                <p className="font-bold text-on-surface">Tự động duyệt bài nộp</p>
                <p className="text-xs text-on-surface-variant">Cho phép các bài tố cáo hiển thị ngay lập tức mà không cần Mod duyệt trước.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={autoApprove} 
                  onChange={(e) => setAutoApprove(e.target.checked)} 
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Mức bảo hiểm bảo lãnh tối thiểu (đ)</label>
                <input 
                  type="number"
                  className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:border-primary outline-none font-mono"
                  value={minInsurance}
                  onChange={(e) => setMinInsurance(e.target.value)}
                />
                <p className="text-[11px] text-on-surface-variant mt-1">Giới hạn tối thiểu áp dụng cho các cửa hàng mới tham gia ký quỹ.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Administrative Info */}
          <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-on-surface flex items-center gap-2 border-b border-outline-variant pb-2">
              <span className="material-symbols-outlined text-[20px] text-primary">contact_mail</span>
              Thông tin ban vận hành sàn
            </h3>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Tên ban quản trị đại diện pháp lý</label>
              <input 
                type="text"
                className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Hòm thư điện tử tiếp nhận khiếu nại bản quyền/danh dự</label>
              <input 
                type="email"
                className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:border-primary outline-none font-mono"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Section 3: Telegram Notification Bot Integration */}
          <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-on-surface flex items-center gap-2 border-b border-outline-variant pb-2">
              <span className="material-symbols-outlined text-[20px] text-primary">robot_2</span>
              Cấu hình thông báo tức thì (Webhook Bot)
            </h3>
            
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Telegram Bot Token</label>
              <input 
                type="password"
                className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:border-primary outline-none font-mono"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
              />
              <p className="text-[11px] text-on-surface-variant mt-1">
                Sử dụng Token từ @BotFather để hệ thống tự gửi thông báo vào Group chung khi có đơn tố cáo mới được nộp.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 border border-outline-variant rounded-xl">
            <div>
              <p className="font-bold text-red-600 text-xs uppercase">Vùng nguy hiểm</p>
              <p className="text-[11px] text-on-surface-variant">Làm sạch bộ nhớ đệm trình duyệt, khôi phục danh sách tố cáo gốc.</p>
            </div>
            <button 
              type="button"
              onClick={handleResetData}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold rounded-lg text-xs cursor-pointer uppercase transition-colors"
            >
              Reset dữ liệu mẫu
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="submit"
              className="bg-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              Lưu thay đổi hệ thống
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
