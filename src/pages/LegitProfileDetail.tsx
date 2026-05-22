import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function LegitProfileDetail() {
  const { id } = useParams();
  const { legitList } = useApp();

  // Find merchant, fallback to first if not found
  const merchant = legitList.find((l) => l.id === id) || legitList[0];

  // Client-side comments state
  const [comments, setComments] = useState<any[]>([
    { id: 1, author: "Lê Minh Dương", text: "Mình mua hàng ở đây 3 lần rồi, linh kiện cực kỳ chuẩn, support nhanh.", score: "5⭐", date: "Hôm qua" },
    { id: 2, author: "Khánh Huyền", text: "Uy tín thật sự, có ban quản trị trung gian ký quỹ bảo lãnh nên khỏi lo sợ bị scam.", score: "5⭐", date: "3 ngày trước" }
  ]);

  const [newAuthor, setNewAuthor] = useState("");
  const [newText, setNewText] = useState("");
  const [newScore, setNewScore] = useState("5⭐");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!newAuthor.trim()) {
      setErrorMsg("Vui lòng nhập tên của bạn.");
      return;
    }
    if (!newText.trim() || newText.length < 5) {
      setErrorMsg("Vui lòng nhập đánh giá của bạn (tối thiểu 5 ký tự).");
      return;
    }

    const newComment = {
      id: Date.now(),
      author: newAuthor.trim(),
      text: newText.trim(),
      score: newScore,
      date: "Vừa xong"
    };

    setComments([newComment, ...comments]);
    setNewAuthor("");
    setNewText("");
    setNewScore("5⭐");
  };

  if (!merchant) {
    return (
      <div className="max-w-max-width mx-auto px-6 md:px-margin-desktop py-12 text-center">
        <h2 className="text-3xl sm:text-display-lg font-bold text-secondary tracking-tight">Không tìm thấy tiểu thương</h2>
        <p className="text-body-lg text-on-surface-variant mt-4">Thông tin hồ sơ uy tín này không tồn tại hoặc đã bị ẩn.</p>
        <Link to="/legit" className="mt-8 inline-block bg-secondary text-white font-bold px-6 py-3 rounded-lg">DANH SÁCH UY TÍN</Link>
      </div>
    );
  }

  return (
    <div className="max-w-max-width mx-auto px-6 md:px-margin-desktop py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-on-surface-variant font-medium text-xs">
        <Link to="/legit" className="text-label-sm hover:text-primary uppercase">DANH SÁCH UY TÍN</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-label-sm uppercase text-secondary font-bold">{merchant.name}</span>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-gutter">
          <section className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[128px] text-secondary">verified</span>
            </div>
            <div className="relative shrink-0">
              <img className="w-32 h-32 rounded-full object-cover border-4 border-surface shadow-sm" src={merchant.img} alt="Merchant" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-2 -right-2 bg-secondary text-white p-1.5 rounded-full flex items-center justify-center border-4 border-surface-container-lowest">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-headline-lg font-bold text-on-surface">{merchant.name}</h1>
                <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">Đã xác minh bởi Ban quản trị</span>
              </div>
              <p className="text-[12px] text-secondary font-bold uppercase tracking-wide mb-3">{merchant.role}</p>
              <p className="text-on-surface-variant text-body-md mb-6 leading-relaxed">
                {merchant.desc}
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-on-surface">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="material-symbols-outlined text-secondary text-lg">calendar_today</span>
                  <span className="text-label-sm">Đối tác từ: {merchant.date || "05/2018"}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span className="text-label-sm">{merchant.successTrans} giao dịch thành công</span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-headline-md font-bold text-on-surface">Quỹ Bảo Hiểm</h2>
                  <span className="material-symbols-outlined text-primary text-[32px]">security</span>
                </div>
                <div className="font-label-numeric text-4xl font-extrabold text-emerald-600 mb-2">{(merchant.insurance).toLocaleString("vi-VN")}đ</div>
                <p className="text-on-surface-variant text-body-sm leading-relaxed text-xs">Cam kết đóng bảo hiểm giao dịch. Số tiền này đã được Admin Check Legit nhận ký quỹ bằng tiền mặt để bảo đảm tuyệt đối quyền lợi khách hàng khi có tranh chấp phát sinh.</p>
              </div>
            </section>
            <section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
              <h2 className="text-headline-md font-bold text-on-surface mb-6">Chỉ Số Tín Nhiệm</h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant text-body-md">Điểm tín nhiệm</span>
                  <span className="font-label-numeric text-secondary font-bold text-lg">{merchant.score}/100</span>
                </div>
                <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: `${merchant.score}%` }}></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-surface-container-low rounded-lg text-center">
                    <div className="font-label-numeric text-2xl font-bold text-on-surface">0</div>
                    <div className="text-[10px] font-bold text-on-surface-variant uppercase">Tố cáo xấu</div>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-lg text-center">
                    <div className="font-label-numeric text-2xl font-bold text-on-surface">4.9 / 5</div>
                    <div className="text-[10px] font-bold text-on-surface-variant uppercase">Đánh giá sao</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Feedback & Comments board */}
          <section className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl">
            <h2 className="text-headline-md font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">rate_review</span> Ý kiến & Phản hồi từ Khách hàng
            </h2>

            <form onSubmit={handlePostComment} className="mb-8 bg-slate-50 border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-sm text-on-surface mb-4">Gửi đánh giá dịch vụ</h3>
              
              {errorMsg && (
                <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-xs font-semibold mb-4 rounded-r">
                  ⚠️ {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-on-surface-variant">Tên hiển thị</label>
                  <input
                    type="text"
                    className="border border-slate-300 bg-white px-3 py-2 rounded text-sm focus:outline-none focus:border-secondary"
                    placeholder="Ví dụ: Hoàng Long"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-on-surface-variant">Đánh giá chất lượng SĐT/Giao dịch</label>
                  <select
                    className="border border-slate-300 bg-white px-3 py-2 rounded text-sm focus:outline-none focus:border-secondary"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                  >
                    <option value="5⭐">⭐⭐⭐⭐⭐ Tuyệt vời (5 sao)</option>
                    <option value="4⭐">⭐⭐⭐⭐ Khá tốt (4 sao)</option>
                    <option value="3⭐">⭐⭐⭐ Bình thường (3 sao)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-4">
                <label className="text-xs text-on-surface-variant">Nhận xét chi tiết</label>
                <textarea
                  className="border border-slate-300 bg-white px-3 py-2 rounded text-sm focus:outline-none focus:border-secondary resize-none"
                  placeholder="Ghi rõ trải nghiệm giao dịch thực tế của bạn..."
                  rows={3}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="bg-secondary text-white font-bold px-6 py-2.5 rounded hover:bg-opacity-95 text-xs active:scale-95 transition-all cursor-pointer"
              >
                ĐĂNG ĐÁNH GIÁ NGAY
              </button>
            </form>

            <div className="space-y-4 divide-y divide-outline-variant">
              {comments.map((comment) => (
                <div key={comment.id} className="pt-4 first:pt-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-on-surface">{comment.author}</span>
                    <span className="text-xs text-slate-400 font-medium">{comment.date}</span>
                  </div>
                  <div className="text-xs text-amber-500 font-bold mb-2">{comment.score}</div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{comment.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
          <section className="bg-inverse-surface text-white p-8 rounded-xl relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-10">
              <span className="material-symbols-outlined text-[100px]">lock</span>
            </div>
            <h2 className="text-headline-md font-bold text-secondary-fixed mb-2">Kênh Liên Hệ Đã Xác Minh</h2>
            <p className="text-surface-variant text-body-md mb-8">Để tránh mạo danh và lừa đảo trục lợi, vui lòng chỉ giao dịch hoặc liên hệ trực tiếp với cửa hàng qua các kênh chính thức được Ban quản trị phê duyệt dưới đây.</p>
            <div className="flex flex-col gap-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg font-bold">send</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-secondary-fixed-dim uppercase">Telegram</div>
                    <div className="font-bold text-white text-sm">{merchant.telegram || "@checklegit_merchant"}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg font-bold">call</span>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-secondary-fixed-dim uppercase">Hotline / Zalo</div>
                    <div className="font-bold text-white text-sm">{merchant.phone || "090 xxx xxxx"}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
