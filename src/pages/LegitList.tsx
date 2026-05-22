import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function LegitList() {
  const { legitList } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const filteredLegit = legitList.filter((item) => {
    const query = searchTerm.toLowerCase().trim();
    // Filter by search bar
    const matchesSearch =
      query === "" ||
      item.name.toLowerCase().includes(query) ||
      item.role.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.telegram?.toLowerCase().includes(query) ||
      item.phone?.toLowerCase().includes(query);

    // Filter by tag
    const matchesTag =
      selectedTag === "all" ||
      (selectedTag === "tmdt" && (item.role.toLowerCase().includes("iphone") || item.role.toLowerCase().includes("gaming") || item.role.toLowerCase().includes("order") || item.role.toLowerCase().includes("thiết bị"))) ||
      (selectedTag === "local" && (item.role.toLowerCase().includes("dịch vụ") || item.role.toLowerCase().includes("tư vấn"))) ||
      (selectedTag === "agency" && (item.role.toLowerCase().includes("thiết kế") || item.role.toLowerCase().includes("agency") || item.role.toLowerCase().includes("mạng")));

    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-max-width mx-auto px-6 md:px-margin-desktop py-12 min-h-screen">
      {/* Search & Filter Section */}
      <section className="mb-12">
        <div className="flex flex-col gap-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-display-lg font-bold mb-4 tracking-tight text-on-surface">Danh sách uy tín</h1>
            <p className="text-body-lg text-on-surface-variant">Người bán và nhà cung cấp dịch vụ trực tuyến được kiểm duyệt kỹ lưỡng. Danh sách của chúng tôi được xây dựng trên sự minh bạch tuyệt đối và dữ liệu giao dịch đã qua xác minh hành vi thực tế.</p>
          </div>
          
          <div className="relative w-full md:w-2/3 lg:w-1/2">
            <div className="flex items-center bg-white border-2 border-outline rounded-xl p-2 focus-within:border-primary transition-colors">
              <span className="material-symbols-outlined px-4 text-on-surface-variant">search</span>
              <input 
                className="w-full border-none focus:outline-none bg-transparent text-body-md py-3" 
                placeholder="Tìm theo tên cửa hàng, sản phẩm hoặc định danh..." 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="px-2 text-on-surface-variant text-sm hover:text-primary mr-2"
                >
                  Xoá
                </button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedTag("all")}
              className={`px-4 py-1.5 rounded-full text-label-sm border transition-all cursor-pointer ${selectedTag === "all" ? "bg-secondary-container text-on-secondary-container border-secondary font-bold" : "bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-secondary"}`}
            >
              Tất cả cửa hàng
            </button>
            <button 
              onClick={() => setSelectedTag("tmdt")}
              className={`px-4 py-1.5 rounded-full text-label-sm border transition-all cursor-pointer ${selectedTag === "tmdt" ? "bg-secondary-container text-on-secondary-container border-secondary font-bold" : "bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-secondary"}`}
            >
              Thương mại & Đồ công nghệ
            </button>
            <button 
              onClick={() => setSelectedTag("agency")}
              className={`px-4 py-1.5 rounded-full text-label-sm border transition-all cursor-pointer ${selectedTag === "agency" ? "bg-secondary-container text-on-secondary-container border-secondary font-bold" : "bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-secondary"}`}
            >
              Freelancer & Sáng tạo nội dung
            </button>
            <button 
              onClick={() => setSelectedTag("local")}
              className={`px-4 py-1.5 rounded-full text-label-sm border transition-all cursor-pointer ${selectedTag === "local" ? "bg-secondary-container text-on-secondary-container border-secondary font-bold" : "bg-surface-container-low text-on-surface-variant border-outline-variant hover:border-secondary"}`}
            >
              Dịch vụ & Tư vấn chuyên nghiệp
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter mb-12">
        <div className="bg-white border border-outline-variant p-4 sm:p-6 rounded-xl flex flex-col justify-between">
          <p className="text-[10px] sm:text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Đã xác minh</p>
          <p className="font-label-numeric text-base sm:text-xl md:text-2xl font-bold text-secondary">{legitList.length} Hồ sơ</p>
        </div>
        <div className="bg-white border border-outline-variant p-4 sm:p-6 rounded-xl flex flex-col justify-between">
          <p className="text-[10px] sm:text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Quỹ ký quỹ lớn nhất</p>
          <p className="font-label-numeric text-sm sm:text-base md:text-lg lg:text-lg font-bold text-emerald-600 break-words line-clamp-1">1.000.000.000đ</p>
        </div>
        <div className="bg-white border border-outline-variant p-4 sm:p-6 rounded-xl flex flex-col justify-between">
          <p className="text-[10px] sm:text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Tiêu chuẩn bảo hiểm</p>
          <p className="font-label-numeric text-xs sm:text-sm md:text-base lg:text-lg font-bold text-primary">Ký Quỹ Trực Tiếp</p>
        </div>
        <div className="bg-white border border-outline-variant p-4 sm:p-6 rounded-xl flex flex-col justify-between">
          <p className="text-[10px] sm:text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Điểm tín nhiệm trung bình</p>
          <p className="font-label-numeric text-base sm:text-xl md:text-2xl font-bold text-secondary">98 / 100</p>
        </div>
      </div>

      {filteredLegit.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-low rounded-xl border-2 border-dashed border-outline-variant">
          <span className="material-symbols-outlined text-outline text-5xl mb-4">search_off</span>
          <p className="font-bold text-headline-md text-on-surface">Không tìm thấy thương hiệu</p>
          <p className="text-on-surface-variant mt-2">Vui lòng thử tìm kiếm bằng từ khoá khác hoặc lọc tất cả danh sách.</p>
        </div>
      ) : (
        /* Legit Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredLegit.map((item) => (
             <div key={item.id} className="bg-white border border-outline-variant rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <img src={item.img} alt={item.name} className="w-16 h-16 rounded-full object-cover border-2 border-secondary p-0.5" referrerPolicy="no-referrer" />
                  <div className="bg-secondary-container text-on-secondary-container p-2 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                     <h3 className="text-headline-md font-bold text-on-surface">{item.name}</h3>
                  </div>
                  <p className="text-label-sm text-secondary uppercase mb-4 tracking-tighter font-semibold">{item.role}</p>
                  <p className="text-body-md text-on-surface-variant line-clamp-2">{item.desc}</p>
                </div>
              </div>
              <div className="p-6 pt-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest">
                <div className="flex flex-col">
                  <span className="text-label-sm text-on-surface-variant">Ký quỹ bảo hiểm</span>
                  <span className="font-label-numeric text-emerald-600 font-bold text-sm">{(item.insurance).toLocaleString("vi-VN")}đ</span>
                </div>
                <Link to={`/legit/${item.id}`} className="text-label-sm font-bold border border-outline px-4 py-2 rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all">Xem hồ sơ</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
