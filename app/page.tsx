export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        
        {/* Logo / Brand Name */}
        <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight">
          RASTER MEDIA
        </h1>
        
        {/* Tagline */}
        <p className="text-2xl md:text-3xl text-blue-300 mb-8">
          Digital Media Solutions in Sri Lanka
        </p>
        
        {/* Coming Soon Badge */}
        <div className="inline-block bg-white/10 backdrop-blur-lg px-8 py-4 rounded-full border border-white/20 mb-12">
          <p className="text-xl text-white font-semibold">
            Coming Soon - January 2025
          </p>
        </div>
        
        {/* Contact Info */}
        <div className="space-y-3 text-blue-200">
          <p className="text-lg">rastermedia.lk</p>
          <p className="text-lg">📧 info@rastermedia.lk</p>
        </div>
        
        {/* Animated Dots */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        </div>
        
      </div>
    </main>
  );
}