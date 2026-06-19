import { motion } from 'motion/react';
import { Globe, Phone, Share2, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import React, { useState, useEffect } from 'react';

// Links secundários mantidos usando o design criado anteriormente
const LINKS = [
  {
    id: 'site',
    title: 'Acesse nosso site',
    url: 'https://quraapp.com.br/',
    icon: Globe,
    primary: false,
  },
  {
    id: 'whatsapp',
    title: 'Fale com o suporte',
    url: '#',
    icon: Phone,
    primary: true,
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    text: "O app revolucionou minha rotina de cuidados. Intuitivo, rápido e com profissionais incríveis!",
    name: "Ana Souza",
    role: "Paciente Vitanabis",
    avatar: "https://i.pravatar.cc/150?img=47"
  },
  {
    id: 2,
    text: "Comprar meus medicamentos naturais ficou muito mais fácil e seguro. O acompanhamento é perfeito.",
    name: "Carlos Mendes",
    role: "Paciente Qura",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 3,
    text: "Nunca vi um aplicativo tão completo para a saúde. As consultas por telemedicina são ótimas.",
    name: "Mariana Silva",
    role: "Paciente Vitanabis",
    avatar: "https://i.pravatar.cc/150?img=35"
  },
  {
    id: 4,
    text: "Me sinto seguro com o atendimento ágil do suporte. Consegui tirar todas as minhas dúvidas em minutos.",
    name: "Lucas Fernandes",
    role: "Paciente Qura",
    avatar: "https://i.pravatar.cc/150?img=68"
  },
  {
    id: 5,
    text: "Agora tenho todo o meu histórico organizado em um só lugar. Facilitou demais a minha vida!",
    name: "Camila Ribeiro",
    role: "Paciente Vitanabis",
    avatar: "https://i.pravatar.cc/150?img=43"
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full max-w-[360px] flex flex-col items-center mt-6 mb-16 z-20"
    >
      <div className="w-full bg-white rounded-[28px] overflow-hidden relative shadow-sm border border-slate-100">
        
        {/* Background Texture inside the testimonial card as requested */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.25] mix-blend-multiply pointer-events-none" 
          style={{ backgroundImage: `url('https://quraapp.com.br/wp-content/uploads/2025/04/background-qura1.png')` }}
        />

        <div className="w-full relative z-10 p-8">
          <Quote className="w-10 h-10 text-[#2b819f] mb-6 transform scale-x-[-1] stroke-[1.5]" fill="none" />

          {/* Inner wrapper to strictly clip content to padding area without bleed */}
          <div className="w-full overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                width: `${TESTIMONIALS.length * 100}%`, 
                transform: `translateX(-${(currentIndex * 100) / TESTIMONIALS.length}%)` 
              }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.id} style={{ width: `${100 / TESTIMONIALS.length}%` }} className="flex-shrink-0">
                  <p className="text-slate-700 font-medium text-[17px] leading-[1.6] mb-8 pr-1">"{t.text}"</p>
                  
                  <div className="flex items-center gap-4 border-slate-200/50">
                    <img src={t.avatar} alt={t.name} className="w-[52px] h-[52px] rounded-full object-cover shadow-sm bg-slate-100 border border-slate-200/50" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-[17px] leading-tight">{t.name}</h4>
                      <p className="text-slate-600 font-medium text-[15px] leading-tight mt-1 pt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-5 mt-6">
        <button onClick={prev} className="p-3 rounded-full bg-white/70 hover:bg-white text-qura-dark shadow-sm backdrop-blur-md transition-all border border-slate-200/50">
          <ChevronLeft className="w-5 h-5"/>
        </button>
        <div className="flex gap-2.5">
          {TESTIMONIALS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-7 bg-qura-dark' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`} 
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-3 rounded-full bg-white/70 hover:bg-white text-qura-dark shadow-sm backdrop-blur-md transition-all border border-slate-200/50">
          <ChevronRight className="w-5 h-5"/>
        </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Qura App',
          text: 'Conheça o Qura App - Consulta e Importação',
          url: window.location.href,
        });
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-qura-bg flex flex-col relative font-sans overflow-x-hidden">
      {/* Header Oficial Minimalista */}
      <header className="w-full bg-white h-[72px] flex items-center px-6 shadow-sm z-50 sticky top-0 justify-between">
        <div className="flex items-center">
           <img 
             src="https://quraapp.com.br/wp-content/uploads/2025/04/qura-logo-header.png" 
             alt="Qura Logo" 
             className="h-10 w-auto object-contain" 
           />
        </div>
        <button 
          onClick={handleShare} 
          className="p-2 text-slate-400 hover:text-qura-dark hover:bg-slate-50 rounded-full transition-all"
          aria-label="Compartilhar"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content with Background */}
      <div className="flex-1 w-full flex flex-col items-center relative overflow-hidden">
        
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-90"
          style={{ backgroundImage: `url('https://quraapp.com.br/wp-content/uploads/2025/04/Background4_Easy-Resize.com_.jpg')` }}
        />
        {/* Overlay subtlely frosted for text legibility */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 via-white/40 to-qura-bg/90 pointer-events-none" />

        <main className="w-full max-w-md z-10 flex flex-col items-center px-6 pt-10 pb-10 relative h-full">
          
          {/* Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-6 py-1.5 rounded-full border border-qura-dark text-qura-dark text-sm font-semibold tracking-wide mb-8 backdrop-blur-sm bg-white/20"
          >
            Bem-vindos a qura!
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-[34px] sm:text-4xl text-center font-black text-qura-dark leading-[1.1] mb-5 tracking-tight w-full drop-shadow-sm"
          >
            Consultas &<br />
            medicamentos na<br />
            palma da sua mão!
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-qura-dark font-medium text-[15px] sm:text-base leading-relaxed mb-8 px-1 max-w-[340px] drop-shadow-sm"
          >
            Agende consultas com facilidade e adquira seus medicamentos naturais com receita médica de forma segura e prática, tudo em um só aplicativo.
          </motion.p>

          {/* Image Store Buttons (from user request URLs) */}
          <div className="flex flex-row justify-center items-center -space-x-2 w-full max-w-[360px] mb-10">
            <motion.a 
              href="https://apps.apple.com/br/app/qura-consulta-e-importa%C3%A7%C3%A3o/id6745412040" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-1/2 flex justify-center"
            >
              <img 
                src="https://quraapp.com.br/wp-content/uploads/2025/04/Link.png" 
                alt="Download on App Store" 
                className="w-full h-auto object-contain drop-shadow-xl scale-110" 
                draggable="false"
              />
            </motion.a>
            <motion.a 
              href="https://play.google.com/store/apps/details?id=br.com.quraapp.app" 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-1/2 flex justify-center"
            >
              <img 
                src="https://quraapp.com.br/wp-content/uploads/2025/04/Link1.png" 
                alt="Get it on Google Play" 
                className="w-full h-auto object-contain drop-shadow-xl scale-110"
                draggable="false" 
              />
            </motion.a>
          </div>

          {/* Regular Buttons (Mix Part) - Mantendo o layout linktree das secundárias */}
          <div className="w-full space-y-4 mb-4 z-20">
            {LINKS.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.5 + (index * 0.1),
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative flex items-center justify-center w-full min-h-[76px] rounded-[28px] font-bold shadow-sm overflow-hidden group
                    ${link.primary 
                      ? 'bg-qura-light text-white' 
                      : 'bg-[#f4f5f5] text-qura-dark border border-[#f4f5f5]'
                    }
                    transition-all duration-300 hover:shadow-md
                  `}
                >
                  {link.primary ? (
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.45] mix-blend-multiply pointer-events-none" 
                      style={{ backgroundImage: `url('https://quraapp.com.br/wp-content/uploads/2025/04/background-qura1.png')` }}
                    />
                  ) : (
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.45] mix-blend-multiply pointer-events-none" 
                      style={{ backgroundImage: `url('https://quraapp.com.br/wp-content/uploads/2025/04/background-qura1.png')` }}
                    />
                  )}
                  
                  {/* Subtle dark hover overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="flex items-center justify-center gap-2 z-10 w-full px-6">
                    <Icon className={`w-5 h-5 flex-shrink-0 ${link.primary ? 'text-white' : 'text-qura-dark'}`} />
                    <span className="text-[17px] tracking-wide text-center">{link.title}</span>
                  </div>
                </motion.a>
              )
            })}
          </div>

          {/* Real-time Tracking Black Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="w-full flex justify-center mt-6 sm:mt-10"
          >
            <div className="w-full max-w-[360px] bg-[#1a1c1e] border border-white/5 rounded-[32px] pt-9 px-6 pb-0 flex flex-col items-center relative overflow-hidden shadow-2xl z-20">
              
              {/* Background topological texture with low opacity */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.12] mix-blend-luminosity grayscale" 
                style={{ backgroundImage: `url('https://quraapp.com.br/wp-content/uploads/2025/04/background-qura1.png')` }}
              />

              <h2 className="text-white text-[32px] sm:text-[34px] font-bold leading-[1.05] tracking-tight relative z-10 w-full text-center mb-8 drop-shadow-md">
                Sua saúde<br />
                começa aqui!
              </h2>

              <div className="relative z-10 w-full flex justify-center mt-auto -mb-2">
                <img 
                  src="https://quraapp.com.br/wp-content/uploads/2025/04/qura-cena022.png" 
                  alt="Acompanhamento no app em tempo real" 
                  className="w-[98%] sm:w-full h-auto object-contain translate-y-3 drop-shadow-2xl" 
                  draggable="false"
                />
              </div>
            </div>
          </motion.div>

          <TestimonialCarousel />

          <div className="w-full text-center mt-2 pb-6 z-20">
            <p className="text-[13px] text-slate-500 font-medium">
              &copy; {new Date().getFullYear()} Qura. Todos os direitos reservados.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}
