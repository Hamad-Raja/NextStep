import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, ShieldCheck, Zap, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGetProductsQuery } from '../slices/productsApiSlice'

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="bg-offwhite min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Slow Zoom */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: 'linear' }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.1.0&auto=format&fit=crop&w=1920&q=80')` }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block text-gold font-bold tracking-[0.3em] uppercase mb-4 text-sm"
            >
              Umii Luxury Footwear
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black text-white leading-tight mb-8"
            >
              Step Into The <br />
              <span className="text-gradient">Extraordinary.</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed font-light"
            >
              Crafted in Italy, designed for the world. Experience the perfect harmony of avant-garde design and unparalleled comfort.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-6">
              <Link to="/shop" className="btn-luxury group flex items-center gap-2">
                Explore Collection <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/about" className="px-8 py-4 border border-white/30 text-white font-bold tracking-widest uppercase text-xs backdrop-blur-sm hover:bg-white hover:text-onyx transition-all duration-300">
                Our Heritage
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-10 bg-white/30" />
        </motion.div>
      </section>

      {/* --- CATEGORIES GRID --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: 'Performance', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop', link: '/shop?category=Men' },
              { title: 'Lifestyle', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop', link: '/shop?category=Women' },
              { title: 'Signature', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop', link: '/shop' },
            ].map((cat, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="group relative h-[600px] overflow-hidden cursor-pointer shadow-lg"
              >
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute bottom-12 left-12 transition-all duration-500 group-hover:bottom-14">
                  <span className="text-gold font-bold tracking-[0.3em] uppercase text-[9px] mb-2 block">Umii Series</span>
                  <h3 className="text-4xl text-white font-black uppercase mb-6 tracking-tighter">{cat.title}</h3>
                  <div className="w-12 h-[1px] bg-gold mb-6 group-hover:w-24 transition-all duration-500" />
                  <Link to={cat.link} className="text-white text-[10px] font-black tracking-[0.4em] uppercase flex items-center gap-2 group-hover:text-gold transition-colors">
                    Explore <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- NEW ARRIVALS --- */}
      <section className="py-24 bg-offwhite">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold font-bold tracking-widest uppercase text-xs">Curated Selection</span>
              <h2 className="text-5xl font-black mt-2">New Arrivals</h2>
            </motion.div>
            <Link to="/shop" className="text-onyx font-bold border-b-2 border-onyx pb-1 hover:text-gold hover:border-gold transition-colors">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {isLoading ? (
                <div className="col-span-full h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-onyx"></div>
                </div>
            ) : error ? (
                <p className="text-red-500 overflow-hidden text-xs">Error: {error?.status} {JSON.stringify(error?.data || error)}</p>
            ) : products?.slice(0, 4).map((product) => (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 mb-6 group">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    {/* Fast Shop Button on hover */}
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button className="w-full bg-white text-onyx py-4 font-bold uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-2">
                        <ShoppingBag size={14} /> Quick View
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-gold transition-colors">{product.name}</h3>
                  <p className="text-gray-500 mt-1 font-medium">${product.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED SECTION: CRAFTSMANSHIP --- */}
      <section className="relative py-32 bg-onyx text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <Zap size={600} className="text-gold absolute -top-40 -right-40 rotate-12" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:w-1/2 relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Craftsmanship" 
                className="w-full rounded-none shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute -bottom-10 -right-10 bg-gold text-onyx p-10 hidden md:block">
                <span className="text-4xl font-black block">100%</span>
                <span className="text-xs font-bold uppercase tracking-widest">Handcrafted</span>
              </div>
            </motion.div>

            <div className="md:w-1/2 space-y-8">
              <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs">The Excellence</span>
              <h2 className="text-6xl font-black leading-tight">Beyond The <br /> Silhouette.</h2>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                At Umii, we don't just make shoes; we architect experiences. Every pair undergoes a 200-step assembly process, combining aerospace-grade cushioning with ethically sourced premium leathers.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                {[
                  { icon: <ShieldCheck className="text-gold" />, title: 'Life Warranty', desc: 'Durability guaranteed for life.' },
                  { icon: <Globe className="text-gold" />, title: 'Sustainable', desc: '100% Recyclable packaging.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-500 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10">
                <Link to="/about" className="btn-luxury">Discover Our Process</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black mb-6 uppercase">Join The Inner Circle</h2>
            <p className="text-gray-500 mb-10 text-lg font-light">
              Be the first to access limited drops and exclusive members-only collections. No spam, just pure luxury.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-6 py-4 bg-gray-50 border-none focus:ring-2 focus:ring-onyx transition-all font-light"
              />
              <button className="btn-luxury min-w-[200px]">Subscribe</button>
            </form>
            <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest">By joining you agree to our Terms & Privacy Policy.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
