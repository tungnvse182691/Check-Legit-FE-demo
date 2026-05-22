import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="max-w-max-width mx-auto px-6 md:px-margin-desktop py-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex mb-8 text-on-surface-variant font-label-sm uppercase tracking-wider">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-primary font-bold">Giới thiệu về Check Legit</li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header className="mb-16 text-center max-w-3xl mx-auto">
        <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4">
          ỨNG DỤNG BẢO VỆ GIAO DỊCH 24/7
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-on-surface leading-tight">
          Sứ mệnh làm sạch không gian mạng Việt Nam
        </h1>
        <p className="text-body-lg text-on-surface-variant leading-relaxed">
          Chúng tôi xây dựng <strong>Check Legit</strong> với lý tưởng bảo vệ hàng triệu người tiêu dùng, người bán hàng tự do và tiểu thương Việt Nam khỏi sự lừa đảo trực tuyến bằng giải pháp tra cứu nguồn lực từ cộng đồng minh bạch.
        </p>
      </header>

      {/* Grid: core values and philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-20">
        <div className="bg-white border border-outline-variant p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
            <span className="material-symbols-outlined text-2xl font-bold">shield</span>
          </div>
          <h3 className="text-headline-md font-bold mb-3 text-on-surface">Độ chính xác cao</h3>
          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
            Mọi bài đăng tố cáo hoặc hồ sơ thông tin lừa đảo đều được bảo vệ bởi quy trình kiểm duyệt bằng chứng số nghiêm ngặt, hình ảnh giao dịch và biên lai chuyển tiền xác thực.
          </p>
        </div>

        <div className="bg-white border border-outline-variant p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
            <span className="material-symbols-outlined text-2xl font-bold">groups</span>
          </div>
          <h3 className="text-headline-md font-bold mb-3 text-on-surface">Cộng đồng tự trị</h3>
          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
            Chúng tôi tin vào trí tuệ của tập thể. Mỗi cá nhân có thể đóng góp tiếng nói bằng cách tố giác các hành vi trục lợi, gian lận trong giao dịch và tài khoản rác.
          </p>
        </div>

        <div className="bg-white border border-outline-variant p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-6">
            <span className="material-symbols-outlined text-2xl font-bold">handshake</span>
          </div>
          <h3 className="text-headline-md font-bold mb-3 text-on-surface">Khuyến khích uy tín</h3>
          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
            Không chỉ chống gian lận, Check Legit còn xây dựng "Danh sách uy tín" có quỹ bảo hiểm ký quỹ, hỗ trợ bảo vệ tối đa lợi ích của người mua và tôn vinh người bán tử tế.
          </p>
        </div>
      </section>

      {/* Detail explanation of verification workflow */}
      <section className="bg-surface-variant border border-outline-variant rounded-2xl p-8 sm:p-12 mb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-6 text-center">
            Quy trình vận hành minh bạch
          </h2>
          
          <div className="relative border-l border-outline-variant ml-4 pl-8 space-y-12">
            {/* Step 1 */}
            <div className="relative">
              <span className="absolute -left-12 top-0.5 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center text-label-sm font-bold">
                1
              </span>
              <h3 className="text-lg font-bold text-on-surface mb-2">Người dùng gửi tố cáo lừa đảo</h3>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                Khi gặp sự cố giao dịch hoặc phát hiện đối tượng lừa đảo, bạn đăng tải bài viết tố cáo kèm theo các thông tin định danh như Số tài khoản ngân hàng, Số điện thoại và hình ảnh biên lai thanh toán (bill chuyển tiền).
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <span className="absolute -left-12 top-0.5 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center text-label-sm font-bold">
                2
              </span>
              <h3 className="text-lg font-bold text-on-surface mb-2">Ban Quản Trị thẩm định bằng chứng</h3>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                Bài tố cáo sẽ đi vào hàng đợi kiểm duyệt trạng thái chờ. Ban quản trị sẽ đối sánh lịch sử giao dịch trực quan, tên định danh của chủ thẻ và thông tin nạn nhân gửi lên để phân loại đúng đắn nhất.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <span className="absolute -left-12 top-0.5 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center text-label-sm font-bold">
                3
              </span>
              <h3 className="text-lg font-bold text-on-surface mb-2">Công khai danh sách đen & danh sách uy tín</h3>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                Hồ sơ lừa đảo sẽ được duyệt công khai và lập tức hiển thị trên phần tra cứu tức thời. Đồng thời, những cá nhân giao dịch uy tín có tiền ký quỹ bảo lãnh sẽ được đưa vào danh sách an toàn hỗ trợ kết nối thương mại vững chắc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Counter, Stats or Call to Action */}
      <section className="text-center max-w-2xl mx-auto py-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-4">
          Cần giúp đỡ hoặc đóng góp ý kiến?
        </h2>
        <p className="text-on-surface-variant text-body-md mb-8">
          Chúng tôi luôn sẵn sàng lắng nghe mọi phản hồi, cơ chế khiếu nại bồi thường danh dự hoặc đóng góp kỹ thuật từ cộng đồng để ngày một hoàn thiện hệ sinh thái an ninh mạng.
        </p>
        <div className="flex flex-col sm:flex-row shadow-sm justify-center gap-4">
          <Link to="/report" className="bg-primary hover:opacity-90 active:scale-95 transition-all text-on-primary font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-wider">
            BÁO CÁO LỪA ĐẢO NGAY
          </Link>
          <Link to="/legit" className="bg-white border border-outline-variant hover:bg-slate-50 active:scale-95 transition-all text-on-surface font-bold px-8 py-4 rounded-lg text-sm uppercase tracking-wider">
            KHÁM PHÁ CỬA HÀNG UY TÍN
          </Link>
        </div>
      </section>
    </div>
  );
}
