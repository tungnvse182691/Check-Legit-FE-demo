import { Link, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function ScamDetail() {
  const { id } = useParams();
  const { scams } = useApp();

  // Find matching scam report, default to first approved scam if ID cannot be found
  const matchedScam = scams.find((s) => s.id === id) || scams.find((s) => s.status === "Đã phê duyệt") || scams[0];

  if (!matchedScam) {
    return (
      <div className="max-w-max-width mx-auto px-6 md:px-margin-desktop py-12 text-center">
        <h2 className="text-3xl sm:text-display-lg font-bold text-primary tracking-tight">Không tìm thấy báo cáo</h2>
        <p className="text-body-lg text-on-surface-variant mt-4">Hồ sơ tố cáo này không tồn tại hoặc đã bị gỡ bỏ.</p>
        <Link to="/" className="mt-8 inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg">VỀ TRANG CHỦ</Link>
      </div>
    );
  }

  return (
    <div className="max-w-max-width mx-auto px-6 md:px-margin-desktop py-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex mb-6 text-on-surface-variant font-label-sm uppercase tracking-wider">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-primary">Trang chủ</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link to="/reports" className="hover:text-primary">Danh sách đen</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-primary font-bold">Chi tiết tố cáo {matchedScam.id}</li>
        </ol>
      </nav>

      {/* Warning Banner */}
      <div className="mb-8 border-4 border-primary bg-error-container p-6 flex flex-col sm:flex-row items-center gap-4 shadow-sm rounded-lg text-center sm:text-left">
        <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>report</span>
        <div>
          <h1 className="text-headline-md sm:text-headline-lg font-bold text-primary uppercase">CẢNH BÁO: HỒ SƠ TỪNG ĐƯỢC BÁO CÁO LỪA ĐẢO</h1>
          <p className="text-body-md text-on-error-container font-semibold mt-2">Dữ liệu được xác thực bởi cộng đồng. Hãy thận trọng trước mọi giao dịch.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-gutter">
          <section className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl">
            <h2 className="text-headline-md font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">person_search</span> Thông tin đối tượng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-primary-container bg-white p-4 rounded-lg flex justify-between items-center group">
                <div>
                  <span className="block text-label-sm text-on-surface-variant">Tên hiển thị</span>
                  <span className="text-headline-md font-bold text-on-surface uppercase">{matchedScam.name}</span>
                </div>
              </div>
              <div className="border border-primary-container bg-white p-4 rounded-lg flex justify-between items-center group">
                <div>
                  <span className="block text-label-sm text-on-surface-variant">Số tài khoản</span>
                  <span className="font-label-numeric text-lg font-bold text-primary">{matchedScam.accountNumber}</span>
                </div>
              </div>
              <div className="border border-primary-container bg-white p-4 rounded-lg flex justify-between items-center group">
                <div>
                  <span className="block text-label-sm text-on-surface-variant">Số điện thoại / Zalo</span>
                  <span className="font-label-numeric text-lg font-bold text-on-surface">{matchedScam.phone || "Chưa cập nhật"}</span>
                </div>
              </div>
              <div className="border border-primary-container bg-white p-4 rounded-lg flex justify-between items-center group">
                <div>
                  <span className="block text-label-sm text-on-surface-variant">Ngân hàng</span>
                  <span className="text-body-md font-bold text-on-surface">{matchedScam.bankName}</span>
                </div>
              </div>
              {matchedScam.facebook && (
                <div className="border border-primary-container bg-white p-4 rounded-lg flex justify-between items-center group md:col-span-2">
                  <div className="w-full">
                    <span className="block text-label-sm text-on-surface-variant">Mạng xã hội đính kèm</span>
                    <a href={matchedScam.facebook} target="_blank" rel="noopener noreferrer" className="text-body-md font-bold text-blue-600 hover:underline break-all block mt-1">
                      {matchedScam.facebook}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl">
            <h2 className="text-headline-md font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">description</span> Chi tiết vụ việc
            </h2>
            <div className="text-body-md text-on-surface-variant leading-relaxed mb-4">
              <p className="whitespace-pre-wrap">{matchedScam.desc}</p>
            </div>
            <div className="mt-6 border-t border-outline-variant pt-6 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-on-surface-variant block uppercase font-bold">Số tiền bị thiệt hại</span>
                <span className="font-label-numeric text-error font-extrabold text-2xl">{(matchedScam.amount).toLocaleString("vi-VN")}đ</span>
              </div>
              <div>
                <span className="text-xs text-on-surface-variant block uppercase font-bold">Hình thức lừa đảo</span>
                <span className="text-body-md font-bold text-on-surface block mt-1">{matchedScam.type}</span>
              </div>
            </div>
          </section>

          {matchedScam.images && matchedScam.images.length > 0 && (
            <section className="bg-surface-container-lowest border border-outline-variant p-8 rounded-xl">
              <h2 className="text-headline-md font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">collections</span> Bằng chứng đính kèm
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {matchedScam.images.map((imgUrl, i) => (
                  <div key={i} className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-outline-side relative group cursor-zoom-in">
                    <img src={imgUrl} alt={`Evidence ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <aside className="lg:col-span-4 space-y-gutter">
          <section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-md">
            <h3 className="text-headline-md font-bold text-on-surface mb-6">Xác thực hệ thống</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                <span className="font-label-numeric text-4xl font-bold text-primary text-red-600">SCAM</span>
                <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mt-2">{matchedScam.status}</p>
                <div className="mt-4 text-xs font-mono text-slate-500 bg-white border p-2 rounded">
                  Ngày gửi: {matchedScam.date || "2 phút trước"}
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
