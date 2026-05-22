import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function ReportScam() {
  const { addScamReport } = useApp();
  const navigate = useNavigate();

  // Form Inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [facebook, setFacebook] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  
  // Feedback States
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Vui lòng nhập tên đối tượng hoặc biệt hiệu.");
      return;
    }
    if (!accountNumber.trim()) {
      setErrorMsg("Vui lòng nhập số tài khoản ngân hàng của đối tượng.");
      return;
    }
    if (bankName === "Chọn ngân hàng" || !bankName) {
      setErrorMsg("Vui lòng chọn ngân hàng giao dịch.");
      return;
    }
    if (amount <= 0) {
      setErrorMsg("Vui lòng nhập đúng số tiền đã bị thiệt hại.");
      return;
    }
    if (type === "Chọn loại hình" || !type) {
      setErrorMsg("Vui lòng chọn loại hình lừa đảo.");
      return;
    }
    if (!desc.trim() || desc.length < 10) {
      setErrorMsg("Vui lòng mô tả chi tiết diễn biến sự việc (Tối thiểu 10 ký tự).");
      return;
    }
    if (!isCaptchaChecked) {
      setErrorMsg("Vui lòng xác minh bạn không phải là người máy.");
      return;
    }

    // Submit Report
    addScamReport({
      name,
      phone,
      bankName,
      accountNumber,
      desc,
      type,
      amount,
      victim: "Ẩn danh",
      facebook,
      images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBC6Up1uOSp2yrPZHP6J-1lQ9tdr8cSQbKSqxwbYJ5v2ygWmC3fu8PpPs51Z3CwJHrBeBwG_qDk2RS3FEUomZfjTSBGDF76QvgGHYtFyo46jL5f7HvU31tRE38BxGLq3mkw3XA79yehqEQVQe3lq_4ZFZNDuoyrCsuEiqRAO-q5xKV4X58rBc6TBdM8MG_L_5-HNUiTnGMrvbhuj1HL-D7aWiH79BSTR2o27touIWOSFydXjH68_IyW7DEDPIe3aRjmg5MwQ5KXflvF"]
    });

    // Show Success Modal
    setShowSuccess(true);
    
    // Clear Form
    setName("");
    setPhone("");
    setAccountNumber("");
    setBankName("");
    setFacebook("");
    setAmount(0);
    setType("");
    setDesc("");
    setIsCaptchaChecked(false);
  };

  return (
    <div className="max-w-max-width mx-auto px-6 md:px-margin-desktop py-12">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-display-lg font-bold mb-2 tracking-tight text-on-surface">Gửi Tố Cáo Lừa Đảo</h1>
        <p className="text-on-surface-variant max-w-2xl text-body-lg">Bằng cách cung cấp thông tin chính xác, bạn đang giúp cộng đồng phòng tránh những kẻ lừa đảo. Mọi thông tin sẽ được kiểm duyệt kỹ lưỡng trước khi công khai.</p>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-2 border-primary max-w-lg w-full p-8 rounded-2xl shadow-2xl text-center">
            <span className="material-symbols-outlined text-red-600 text-6xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_maybe</span>
            <h3 className="text-headline-md font-bold text-on-surface mb-2">ĐÃ GỬI TỐ CÁO THÀNH CÔNG!</h3>
            <p className="text-body-md text-on-surface-variant mb-6">
              Hệ thống đã ghi nhận hồ sơ của bạn. Ban quản trị sẽ đối chất bằng chứng, xác thực giao dịch và duyệt đăng tải lên mạng lưới tìm kiếm công khai trong vòng 24h.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate("/")}
                className="bg-primary text-white font-bold px-6 py-3 rounded-xl cursor-pointer hover:brightness-105 active:scale-95 transition-all w-full sm:w-auto text-sm"
              >
                VỀ TRANG CHỦ
              </button>
              <button
                onClick={() => setShowSuccess(false)}
                className="border border-outline text-on-surface hover:bg-slate-50 font-bold px-6 py-3 rounded-xl cursor-pointer transition-all w-full sm:w-auto text-sm"
              >
                GỬI TIẾP BẢO CÁO KHÁC
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-gutter">
          {errorMsg && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg font-bold text-sm">
              🚨 {errorMsg}
            </div>
          )}

          {/* Group 1: Scam Object Info */}
          <section className="bg-surface-container-lowest p-8 border border-outline-variant rounded-xl">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <span className="material-symbols-outlined">person_search</span>
              <h2 className="text-headline-md font-bold">Thông tin đối tượng</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-label-sm text-on-surface-variant">Tên đối tượng / Biệt hiệu</label>
                <input 
                  className="border-outline border px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                  placeholder="Ví dụ: Nguyễn Văn A" 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-sm text-on-surface-variant">Số điện thoại / Zalo</label>
                <input 
                  className="border-outline border px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                  placeholder="090x xxx xxx" 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-sm text-on-surface-variant">Số tài khoản ngân hàng</label>
                <input 
                  className="border-outline border px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                  placeholder="Nhập số tài khoản" 
                  type="text" 
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-sm text-on-surface-variant">Tên ngân hàng</label>
                <select 
                  className="border-outline border px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <option>Chọn ngân hàng</option>
                  <option>Vietcombank</option>
                  <option>Techcombank</option>
                  <option>MB Bank</option>
                  <option>Agribank</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-label-sm text-on-surface-variant">Link Facebook / TikTok / Telegram</label>
                <input 
                  className="border-outline border px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" 
                  placeholder="https://facebook.com/username" 
                  type="url" 
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Group 2: Report Content */}
          <section className="bg-surface-container-lowest p-8 border border-outline-variant rounded-xl">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <span className="material-symbols-outlined">description</span>
              <h2 className="text-headline-md font-bold">Nội dung tố cáo</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-label-sm text-on-surface-variant">Số tiền bị lừa (VND)</label>
                <div className="relative">
                  <input 
                    className="w-full border-outline border px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-label-numeric pl-4 pr-12" 
                    placeholder="0" 
                    type="number" 
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">VND</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-sm text-on-surface-variant">Loại hình lừa đảo</label>
                <select 
                  className="border-outline border px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Chọn loại hình</option>
                  <option>Mua bán online</option>
                  <option>Đầu tư tài chính</option>
                  <option>Giả danh cơ quan nhà nước</option>
                  <option>Tuyển cộng tác viên</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-label-sm text-on-surface-variant">Chi tiết vụ việc</label>
                <textarea 
                  className="border-outline border px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-y" 
                  placeholder="Mô tả chi tiết quá trình bị lừa đảo..." 
                  rows={5}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
            </div>
          </section>

          {/* Group 3: Evidence Upload */}
          <section className="bg-surface-container-lowest p-8 border border-outline-variant rounded-xl">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <span className="material-symbols-outlined">photo_library</span>
              <h2 className="text-headline-md font-bold">Bằng chứng hình ảnh</h2>
            </div>
            <div className="border-2 border-dashed border-outline-variant bg-surface-container-low rounded-xl p-12 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-surface-variant transition-colors group">
              <span className="material-symbols-outlined text-4xl text-outline mb-4 group-hover:text-primary transition-colors">cloud_upload</span>
              <p className="font-bold mb-1 col-span-1 border-none bg-transparent">Kéo và thả ảnh vào đây</p>
              <p className="text-on-surface-variant text-label-sm">Hỗ trợ JPG, PNG (Tối đa 5 ảnh, mỗi ảnh &lt; 5MB)</p>
              <input className="hidden" multiple type="file" />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
               <div className="aspect-square bg-surface-container rounded-lg border border-outline-variant relative overflow-hidden group">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC6Up1uOSp2yrPZHP6J-1lQ9tdr8cSQbKSqxwbYJ5v2ygWmC3fu8PpPs51Z3CwJHrBeBwG_qDk2RS3FEUomZfjTSBGDF76QvgGHYtFyo46jL5f7HvU31tRE38BxGLq3mkw3XA79yehqEQVQe3lq_4ZFZNDuoyrCsuEiqRAO-q5xKV4X58rBc6TBdM8MG_L_5-HNUiTnGMrvbhuj1HL-D7aWiH79BSTR2o27touIWOSFydXjH68_IyW7DEDPIe3aRjmg5MwQ5KXflvF" alt="evidence"/>
                <button className="absolute top-1 right-1 bg-error text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" type="button">
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </div>
              <div className="aspect-square bg-surface-container rounded-lg border border-outline-variant flex items-center justify-center cursor-pointer hover:bg-surface-container-highest transition-colors">
                <span className="material-symbols-outlined text-outline">add</span>
              </div>
            </div>
          </section>

          {/* Security & CTA */}
          <div className="bg-surface-container-lowest p-8 border border-outline-variant rounded-xl flex flex-col items-center gap-6">
            <button 
              type="button"
              onClick={() => setIsCaptchaChecked(!isCaptchaChecked)}
              className="w-full max-w-sm py-4 bg-surface border border-outline-variant rounded flex items-center justify-start gap-4 hover:bg-slate-50 cursor-pointer px-4 select-none"
            >
              <div className={`w-6 h-6 border-2 rounded-sm flex items-center justify-center transition-all ${isCaptchaChecked ? "bg-emerald-500 border-emerald-500 text-white animate-scale-up" : "border-primary"}`}>
                {isCaptchaChecked && <span className="material-symbols-outlined text-[16px] font-bold">check</span>}
              </div>
              <span className="text-label-sm text-on-surface">Tôi không phải là người máy</span>
              <img alt="reCAPTCHA" className="w-6 h-6 ml-auto opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOPi49Q7wSHb5tlZ-cNrKywqf9_9Evb5743OOgOXhIsS2DsJZFxqnweB8It8wi1T94hfMUoAj1tQpumN0503dd4DhR8_BqWhWKfhbZPyaOlNjiV6Mto1aPJkHBsHxQMSeCTQiA7VzME0gWCF_h3A4xQd8qbP1pKWjqNfFMqehuPGe-PWzzmOu-xQVrPg48h9Y6Ufc85IF_7zpqTn_9zXAESZkzLzCu4gIuJRHExdH_JJm9EQKDefc-zeSLItMIGFMFeX1QKIn6ukSX" />
            </button>
            <button 
              className="w-full bg-primary-container text-on-primary-container text-headline-md py-5 rounded-xl font-bold shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer" 
              type="submit"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_maybe</span>
              GỬI TỐ CÁO NGAY
            </button>
            <p className="text-on-surface-variant text-label-sm text-center">
              Bằng việc nhấn "Gửi Tố Cáo", bạn cam đoan những thông tin trên là đúng sự thật và chịu trách nhiệm trước pháp luật.
            </p>
          </div>
        </form>

        <aside className="lg:col-span-4 space-y-gutter">
          <div className="bg-surface-container-high border-l-4 border-primary p-6 rounded-r-xl">
            <h3 className="font-bold mb-3 flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined">info</span>
              Lưu ý quan trọng
            </h3>
            <ul className="space-y-3 text-on-surface-variant text-body-md list-disc ml-4">
              <li>Cung cấp ảnh chụp màn hình tin nhắn hoặc lịch sử chuyển tiền.</li>
              <li>Đảm bảo số tài khoản ngân hàng được nhập chính xác.</li>
              <li>Thông tin của người báo cáo sẽ được bảo mật tuyệt đối.</li>
              <li>Hệ thống sẽ tự động quét trùng lặp với cơ sở dữ liệu hiện có.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
