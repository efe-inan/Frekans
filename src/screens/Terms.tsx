import { motion } from "motion/react";

export default function Terms() {
  return (
    <div className="flex-grow flex flex-col items-center justify-start px-8 py-16 w-full max-w-4xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 rounded-2xl w-full flex flex-col items-start space-y-6 relative overflow-hidden text-left"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-coral uppercase tracking-tight w-full text-center mb-4">
          Kullanım Şartları
        </h1>
        
        <div className="text-brand-cream/80 text-base leading-relaxed space-y-4">
          <p>
            <strong>Frekans</strong> uygulamasını kullanarak aşağıdaki şartları kabul etmiş sayılırsınız:
          </p>
          <h2 className="text-xl font-bold text-brand-cream mt-6">Hizmetin Kullanımı</h2>
          <p>
            Frekans, tamamen eğlence ve sosyal etkileşim amacıyla oluşturulmuş açık kaynaklı ve ücretsiz bir web oyunudur. Uygulamayı kendi kişisel veya arkadaş gruplarınızla eğlence amacıyla kullanabilirsiniz.
          </p>
          <h2 className="text-xl font-bold text-brand-cream mt-6">Sorumluluk Reddi</h2>
          <p>
            Oyun içindeki tahminler veya kartlarda yer alan içerikler tamamen mizahi amaçlı veya sosyal bir dinamik üzerine kuruludur. Oyun içeriğinden doğabilecek anlaşmazlıklardan uygulamanın geliştiricisi sorumlu tutulamaz.
          </p>
          <h2 className="text-xl font-bold text-brand-cream mt-6">Fikri Mülkiyet</h2>
          <p>
            Uygulamanın kodları ve tasarımı açık olarak paylaşılmış olup geliştiriciye (Efe) aittir. Ticari amaçla kullanımı veya birebir kopyalanarak kazanç sağlanması için önceden izin alınması gerekmektedir.
          </p>
          <p className="mt-8 text-sm opacity-60">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>
      </motion.div>
    </div>
  );
}
