'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { Users, Cpu, PenTool, Lightbulb, Menu, X } from 'lucide-react'

const FloatingShape = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg opacity-20"
    initial={{ y: 0 }}
    animate={{ y: [-20, 20, -20] }}
    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay }}
  />
)

const ConnectingLines = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <motion.line
      x1="10%" y1="30%" x2="50%" y2="70%"
      stroke="url(#lineGradient)"
      strokeWidth="0.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />
    <motion.line
      x1="90%" y1="10%" x2="50%" y2="90%"
      stroke="url(#lineGradient)"
      strokeWidth="0.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
    />
    <defs>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
  </svg>
)

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 md:p-6 flex flex-col items-center text-center">
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 p-2 md:p-3 rounded-full mb-3 md:mb-4">
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
    </div>
    <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm md:text-base text-gray-300">{description}</p>
  </div>
)

export function ModernLandingPageRevised() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md' : ''}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            >
              Roman Inc.
            </motion.div>
            <div className="hidden md:flex space-x-6">
              {['Vision', 'Services', 'SAKURA TOKYO'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 py-2">
            {['Vision', 'Services', 'SAKURA TOKYO'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 md:px-0">
          <motion.div style={{ opacity }} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-800 opacity-20"></div>
            <ConnectingLines />
            <FloatingShape delay={0} />
            <FloatingShape delay={1} />
            <FloatingShape delay={2} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center z-10"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              共創で未来を描く
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-xl md:max-w-2xl mx-auto">
              web3で、ビジネスと社会に革新をもたらす
            </p>
            <Button 
              size="lg" 
              onClick={() => scrollToSection('vision')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              ビジョンを見る
            </Button>
          </motion.div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <ConnectingLines />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Roman株式会社の共創ビジョン
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-sm md:text-base text-gray-300 mb-4 md:mb-6"
            >
              私たちは、ブロックチェーン技術とWeb3の可能性を追求し、革新的な共創ソリューションを提供する企業です。DAOコンサルティングとSAKURA TOKYOを軸に、ビジネスと社会のデジタルトランスフォーメーションを推進し、新たな価値を共に創造します。
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base text-gray-300"
            >
              未来を見据えた技術と創造性で、クライアントと共に新しい可能性を探求し、革新的なプロジェクトを実現します。共創の力で、より良い未来を築きましょう。
            </motion.p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              SERVICE
            </h2>
            <p className="text-lg md:text-xl text-center mb-8 md:mb-12 text-gray-300">
              Web3事業の立ち上げをサポートします
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <ServiceCard
                icon={Users}
                title="DAOコンサルティング"
                description="分散型自律組織（DAO）の設計、実装、運営をサポートします。ガバナンストークンの設計、投票システムの構築、コミュニティ管理など、DAOに関する包括的なコンサルティングを提供します。"
              />
              <ServiceCard
                icon={PenTool}
                title="Web3企画立案"
                description="Web3事業立ち上げのための企画提案・コンサルティングを行います。NFT企画やトークン企画時のチェーン選定から、資本政策のサポートやホワイトペーパーの作成も多数の実績があります。"
              />
              <ServiceCard
                icon={Cpu}
                title="システム開発"
                description="NFT・トークンの発行経験豊富なブロックチェーンエンジニアのみならず、企画の実現に必要なスキルセットのあるエンジニアが開発を行います。"
              />
              <ServiceCard
                icon={Lightbulb}
                title="イノベーション支援"
                description="Web3技術を活用した新規事業開発や既存ビジネスの変革をサポートします。最新のトレンドと技術を組み合わせ、革新的なソリューションを提案します。"
              />
            </div>
            <div className="text-center mt-8 md:mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                サービス詳細へ
              </Button>
            </div>
          </div>
        </section>

        {/* SAKURA TOKYO Section */}
        <section id="sakura-tokyo" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden">
          <ConnectingLines />
          <div className="text-center mb-4 relative z-10">
            <span className="inline-block bg-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
              自社サービス
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 relative z-10">
            SAKURA TOKYO
          </h2>
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                デジタルとフィジカルの融合
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-6">
                Roman Inc.が提供する革新的なNFT×アパレルサービス「SAKURA TOKYO」で、ファッションの新しい可能性を探求します。デジタルアートとフィジカルアパレルを融合させ、唯一無二の体験を創出します。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-purple-300">主な特徴</h4>
                  <ul className="list-disc list-inside text-sm md:text-base text-gray-300 space-y-2">
                    <li>限定デザインのNFTコレクション</li>
                    <li>NFTと連動したフィジカルアパレル</li>
                    <li>コミュニティ主導のデザイン投票システム</li>
                    <li>ブロックチェーン認証による真正性の保証</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-purple-300">メリット</h4>
                  <ul className="list-disc list-inside text-sm md:text-base text-gray-300 space-y-2">
                    <li>デジタルとフィジカルの価値の相乗効果</li>
                    <li>コレクターズアイテムとしての希少性</li>
                    <li>ファッションブランドとの独自コラボレーション</li>
                    <li>持続可能なファッションへの貢献</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 md:mt-8">
                <Button 
                  size="lg"
                  className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
                >
                  SAKURA TOKYOを体験する
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-lg md:text-xl font-bold mb-4 sm:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Roman Inc.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm md:text-base hover:text-white transition-colors">プライバシーポリシー</a>
            <a href="#" className="text-sm md:text-base hover:text-white transition-colors">利用規約</a>
          </div>
        </div>
        <div className="mt-4 text-center text-xs md:text-sm text-gray-500">
          © 2023 Roman Inc. All rights reserved.
        </div>
      </footer>
    </div>
  )
}