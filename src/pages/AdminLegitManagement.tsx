import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export function AdminLegitManagement() {
  const { legitList, addLegitProfile, deleteLegitProfile } = useApp();

  const [name, setName] = useState("");
  const [role, setRole] = useState("Công nghệ & Điện tử");
  const [insurance, setInsurance] = useState("50000000");
  const [desc, setDesc] = useState("");
  const [telegram, setTelegram] = useState("");
  const [phone, setPhone] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertMsg("");

    if (!name.trim()) {
      setAlertMsg("Vui lòng nhập tên tiểu thương.");
      return;
    }

    if (!desc.trim()) {
      setAlertMsg("Vui lòng nhập mô tả tóm tắt.");
      return;
    }

    const insuranceValue = Number(insurance);
    if (isNaN(insuranceValue) || insuranceValue <= 0) {
      setAlertMsg("Số tiền ký quỹ bảo hiểm phải là số và lớn hơn 0.");
      return;
    }

    // Default image if empty
    const finalImg = imgUrl.trim() || "https://lh3.googleusercontent.com/aida-public/AB6AXuDKJ968Ro0Hzvi8zHp06GmLG63LozZe4NRvKhYCn5yYkPBsnsqfkGxNSYIVzs4lS-POI9dJ6jAkQf6sD-vfdHIDtRjTZt5qxga6QElHZZi8hh14MMbRsMjcPQ6I8mJBxflquF_-Day2hvABActcMHynjkDfrGLqrV2kTspaYVY23YkiaipC_0TeFQOxHxl9LM4TE-dbgwMegvZlElmVN3pqZPFObemSNzfEp9wu0_tgVPRuCXFTUY4UCprdbpksNSqX8bEQ7xrBNGdH";

    addLegitProfile({
      name: name.trim(),
      role: role + " đã xác minh",
      desc: desc.trim(),
      insurance: insuranceValue,
      score: "100",
      successTrans: 1,
      telegram: telegram.trim() || "@verified_merchant",
      phone: phone.trim() || "09x xxx xxxx",
      img: finalImg,
      date: new Date().toLocaleDateString("vi-VN")
    });

    setName("");
    setDesc("");
    setTelegram("");
    setPhone("");
    setImgUrl("");
    setInsurance("50000000");
    alert("Đã tạo hồ sơ uy tín thành công!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc muốn thu hồi hồ sơ uy tín này không?")) {
      deleteLegitProfile(id);
      alert("Đã thu hồi thành công!");
    }
  };

  return (
    <div className="flex-grow flex flex-col h-full overflow-hidden">
      <header className="h-20 bg-surface border-b border-outline-variant flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-headline-md font-bold text-on-surface">Ký duyệt cấp hồ sơ uy tín</h2>
          <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold font-mono">
            {legitList.length} Thương nhân đã kiểm duyệt
          </span>
        </div>
      </header>

      <div className="p-6 max-w-max-width mx-auto w-full grid grid-cols-12 gap-gutter overflow-y-auto flex-1">
        {/* Registration Form */}
        <section className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
            <h3 className="text-headline-sm font-bold text-on-surface mb-2">Tạo hồ sơ mới</h3>
            <p className="text-on-surface-variant text-xs mb-6">Đăng ký một người bán uy tín mới vào hệ thống công bố.</p>
            
            {alertMsg && (
              <div className="p-3 bg-red-100 text-red-700 text-xs font-semibold mb-4 rounded border-l-4 border-red-500">
                ⚠️ {alertMsg}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-on-surface mb-1">Tên thương hiệu / Người bán</label>
                <input 
                  className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:border-secondary outline-none" 
                  placeholder="Ví dụ: Tech Global Store" 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Lĩnh vực hoạt động</label>
                <select 
                  className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:border-secondary outline-none bg-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Thương mại điện tử">Thương mại điện tử & Order</option>
                  <option value="Công nghệ & Thiết bị">Công nghệ & Đồ điện tử</option>
                  <option value="Freelancer & Thiết kế">Freelancer & Creative Agency</option>
                  <option value="Dịch vụ & Tư vấn chuyên nghiệp">Dịch vụ & Tư vấn chuyên nghiệp</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-primary mb-1">Quỹ nộp bảo hiểm (VNĐ)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-primary font-bold">đ</span>
                  <input 
                    className="w-full border border-primary/30 rounded-lg pl-8 pr-3 py-2 font-mono font-bold text-primary focus:border-primary outline-none" 
                    placeholder="e.g. 50000000" 
                    type="number" 
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Liên hệ Telegram</label>
                <input 
                  className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:border-secondary outline-none" 
                  placeholder="Ví dụ: @official_admin" 
                  type="text" 
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Liên hệ Zalo / SĐT</label>
                <input 
                  className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:border-secondary outline-none" 
                  placeholder="Ví dụ: 0901234567" 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Ảnh Logo URL (Tùy chọn)</label>
                <input 
                  className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:border-secondary outline-none" 
                  placeholder="https://..." 
                  type="text" 
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Mô tả ngắn hoạt động</label>
                <textarea 
                  className="w-full border border-outline rounded-lg px-3 py-2 text-sm focus:border-secondary outline-none resize-none" 
                  placeholder="Mô tả tóm tắt kinh nghiệm kinh doanh..." 
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 text-white text-xs py-3 rounded-lg mt-4 hover:bg-emerald-700 transition-colors font-bold uppercase tracking-widest cursor-pointer"
              >
                Ký duyệt cấp hồ sơ
              </button>
            </form>
          </div>
        </section>

        {/* Verified Sellers List */}
        <section className="col-span-12 lg:col-span-8">
          <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-slate-50">
              <h3 className="text-headline-sm font-bold text-on-surface">Người bán có ký quỹ đã xác minh</h3>
            </div>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 uppercase font-bold">
                    <th className="px-6 py-4">Tên tiểu thương</th>
                    <th className="px-6 py-4 text-right">Quỹ bảo hiểm đã nộp</th>
                    <th className="px-6 py-4 text-center">Liên hệ</th>
                    <th className="px-6 py-4 text-right">Quản lý</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {legitList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.img} 
                            alt={item.name} 
                            className="w-10 h-10 rounded-full object-cover border border-outline-variant shrink-0" 
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-bold text-[14px] text-slate-900">{item.name}</p>
                            <p className="text-[11px] text-slate-500">{item.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right font-mono font-bold text-emerald-600 text-sm">
                        {(item.insurance).toLocaleString("vi-VN")}đ
                      </td>
                      <td className="px-6 py-5 text-center text-slate-600">
                        <p>{item.telegram}</p>
                        <p className="text-[10px]">{item.phone}</p>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-3 py-1.5 rounded text-[11px] font-bold cursor-pointer"
                        >
                          Thu hồi hồ sơ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
