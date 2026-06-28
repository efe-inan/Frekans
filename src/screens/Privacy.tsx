import { motion } from "motion/react";

export default function Privacy() {
  return (
    <div className="flex-grow flex flex-col items-center justify-start px-8 py-16 w-full max-w-4xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 rounded-2xl w-full flex flex-col items-start space-y-6 relative overflow-hidden text-left"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-coral uppercase tracking-tight w-full text-center mb-4">
          Gizlilik Politikası
        </h1>
        
        <div className="text-brand-cream/80 text-base leading-relaxed space-y-4">
          <p>
            <strong>Frekans</strong> ("biz", "bizim" veya "bize" olarak anılacaktır) uygulamamızı ziyaret ettiğiniz için teşekkür ederiz. Gizliliğinize önem veriyoruz ve kişisel verilerinizin güvenliğini sağlamak için gerekli adımları atıyoruz.
          </p>
          <h2 className="text-xl font-bold text-brand-cream mt-6">Toplanan Veriler</h2>
          <p>
            Bu web uygulaması tarayıcı üzerinde lokal olarak çalışmaktadır. Herhangi bir kişisel veri toplamıyoruz, sunucularımızda bir hesap oluşturmuyoruz ve oynadığınız oyunlara ait verileri kaydetmiyoruz. 
          </p>
          <h2 className="text-xl font-bold text-brand-cream mt-6">Çerezler (Cookies) ve Yerel Depolama</h2>
          <p>
            Uygulamamız, oyun deneyimini iyileştirmek ve tercihlerinizi (örneğin seçtiğiniz takım isimlerini veya puan durumunu) sadece o oturumunuz boyunca tarayıcınızın hafızasında geçici olarak tutabilir. Bu veriler kalıcı olarak hiçbir sunucuya gönderilmez veya paylaşılmaz.
          </p>
          <h2 className="text-xl font-bold text-brand-cream mt-6">Üçüncü Taraf Bağlantıları</h2>
          <p>
            Uygulamamızda, GitHub gibi üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu sitelerin gizlilik politikalarından biz sorumlu değiliz.
          </p>
          <h2 className="text-xl font-bold text-brand-cream mt-6">Politika Değişiklikleri</h2>
          <p>
            Zaman zaman bu Gizlilik Politikası'nı güncelleyebiliriz. Herhangi bir değişiklik olduğunda bu sayfa üzerinden duyurulacaktır.
          </p>
          <p className="mt-8 text-sm opacity-60">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>
      </motion.div>
    </div>
  );
}
