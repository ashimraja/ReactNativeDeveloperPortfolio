  import React, { useState, useEffect } from 'react'
  import { Link } from 'react-router-dom'
  import { motion, AnimatePresence } from 'framer-motion'
import ContactModal from './ContactModal'

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
  ]

  export default function Navbar({ onContactOpen }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [active, setActive] = useState('Home')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 20)
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close mobile menu on resize to desktop
    useEffect(() => {
      const onResize = () => { if (window.innerWidth >= 640) setMenuOpen(false) }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }, [])

    const handleNavClick = (label, href) => {
      setActive(label)
      setMenuOpen(false)
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    const barVariants = {
      closed: { rotate: 0, y: 0, opacity: 1 },
    }

    return (
      <nav className="fixed top-6 left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-5xl mx-auto px-6 pointer-events-auto">
          {/* Main pill */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
            className={`flex items-center justify-between glass px-5 py-2.5 rounded-2xl transition-shadow duration-300 ${
              scrolled ? 'shadow-md' : 'shadow-sm'
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" onClick={() => setActive('Home')}>
              <motion.span
                className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-base font-semibold text-slate-900 tracking-tight">Ashim Raja</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden sm:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.label, link.href)}
                  className="relative text-sm font-medium px-3 py-1.5 rounded-xl transition-colors duration-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  {active === link.label && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 bg-slate-100 rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10" style={{ color: active === link.label ? '#0f172a' : undefined }}>
                    {link.label}
                  </span>
                  {active === link.label && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-600"
                    />
                  )}
                </button>
              ))}

              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="ml-2 text-sm font-semibold text-white bg-slate-900 px-4 py-1.5 rounded-xl hover:bg-slate-800 transition-colors duration-200"
                onClick={() => { setMenuOpen(false); onContactOpen() }}
              >
                Let's talk
              </motion.button>
            </div>

            {/* Hamburger */}
            <button
              className="sm:hidden flex flex-col gap-[5px] p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-5 h-0.5 bg-slate-700 rounded-full origin-center"
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block w-5 h-0.5 bg-slate-700 rounded-full"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-0.5 bg-slate-700 rounded-full origin-center"
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </motion.div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.2, 0.9, 0.2, 1] }}
                className="mt-2 glass rounded-2xl p-3 shadow-md sm:hidden"
              >
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    onClick={() => handleNavClick(link.label, link.href)}
                    className={`w-full text-left text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-200 block ${
                      active === link.label
                        ? 'text-slate-900 bg-slate-100'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <div className="h-px bg-slate-200 my-2" />
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="w-full text-sm font-semibold text-white bg-slate-900 px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
                  onClick={() => { setMenuOpen(false); onContactOpen() }}
                >
                  Let's talk
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    )
  }