import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function ScamList() {
  const { scams } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const approvedScams = scams.filter(s => s.status === "Đã phê duyệt");

  const filteredScams = approvedScams.filter((scam) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      scam.name.toLowerCase().includes(term) ||
      scam.phone.toLowerCase().includes(term) ||
      scam.accountNumber.toLowerCase().includes(term) ||
      scam.bankName.toLowerCase().includes(term) ||
      scam.desc.toLowerCase().includes(term);

    const matchesType = selectedType === "all" || scam.type === selectedType;

    return matchesSearch && matchesType;
  });

  const categories = [
    { value: "all", label: "Tất cả loại hình" },
    { value: "Mua bán online", label: "Mua bán online" },
    { value: "Đầu tư tài chính", label: "Đầu tư tài chính" },
    { value: "Giả danh cơ quan nhà nước", label: "Giả danh cơ quan nhà nước" },
    { value: "Tuyển cộng tác viên", label: "Tuyển cộng tác viên" },
  ];

  return (
    <div className="max-w-max-width mx-auto px-6 md:px-margin-desktop py-12 min-h-screen">
      {/* Header Info */}
      <section className="mb-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-display-lg font-bold mb-4 text-primary tracking-tight">Danh sách đen tố cáo</h1>
          <p className="text-body-lg text-on-surface-variant">
            Danh sách các đối tượng, số điện thoại, tài khoản ngân hàng đã được cộng đồng kiểm duyệt và xác thực hành vi lừa đảo trực tuyến. Hãy tra cứu kỹ trước khi thực hiện giao dịch chuyển tiền.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 relative w-full md:w-2/3 lg:w-1/2">
          <div className="flex items-center bg-white border-2 border-outline-variant rounded-xl p-2 focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined px-4 text-outline">search</span>
            <input
              type="text"
              className="w-full border-none focus:outline-none bg-transparent text-body-md py-3"
              placeholder="Nhập số điện thoại, tài khoản, tên đối tượng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-on-surface-variant hover:text-primary mr-2"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Categories / Filters */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedType(cat.value)}
              className={`px-4 py-2 rounded-full text-label-sm border transition-all ${
                selectedType === cat.value
                  ? "bg-primary text-on-primary border-primary font-bold shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Scam Reports */}
      {filteredScams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {filteredScams.map((scam) => (
            <div
              key={scam.id}
              className="bg-white p-6 border-l-4 border-error shadow-sm rounded-r-xl border border-outline-variant flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-error uppercase tracking-widest block mb-1">
                      {scam.type}
                    </span>
                    <h3 className="font-bold text-headline-md text-on-surface">
                      {scam.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-outline uppercase">
                    {scam.time}
                  </span>
                </div>

                <div className="space-y-2 mb-6 text-body-md">
                  <div className="flex justify-between border-b border-dashed border-outline-variant py-1">
                    <span className="text-on-surface-variant">SĐT / Zalo:</span>
                    <span className="font-bold font-label-numeric text-on-surface">
                      {scam.phone || "Không có"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-outline-variant py-1">
                    <span className="text-on-surface-variant">Tài khoản:</span>
                    <span className="font-bold font-label-numeric text-primary">
                      {scam.accountNumber} ({scam.bankName})
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm line-clamp-2 mt-3">
                    {scam.desc}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-outline-variant mt-auto">
                <div>
                  <span className="text-xs text-on-surface-variant block">Thiệt hại:</span>
                  <span className="font-label-numeric text-error font-bold">
                    {scam.amount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <Link
                  to={`/reports/${scam.id}`}
                  className="bg-error-container text-on-error-container px-4 py-2 rounded-lg text-label-sm font-bold hover:brightness-105 active:scale-95 transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-12 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl text-outline mb-4">gpp_good</span>
          <p className="font-bold text-headline-md text-on-surface mb-2">Không tìm thấy báo cáo trùng khớp</p>
          <p className="text-body-md max-w-md mx-auto">
            Hệ thống chưa ghi nhận bất kỳ báo cáo lừa đảo nào trùng khớp với từ khóa tìm kiếm của bạn. Hãy liên tục cảnh giác khi thực hiện giao dịch mới.
          </p>
        </div>
      )}
    </div>
  );
}
