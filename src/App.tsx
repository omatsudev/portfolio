import { useState, useEffect } from 'react'
import {
  Github, Linkedin, Mail, ExternalLink, Code2, Server, Database,
  Globe, Terminal, Layers, Menu, X, ChevronDown, User,
  Cpu, Rocket, Building2, MessageCircle
} from 'lucide-react'

const projects = [
  {
    name: "BarFlow Hub",
    tagline: "O sistema operacional do seu bar",
    description: "SaaS multi-tenant para gestão completa de bares e distribuidoras. PDV com múltiplos terminais via QR code, controle de estoque, financeiro, CRM de clientes, fornecedores e relatórios de desempenho.",
    url: "https://barflow-hub.pages.dev",
    tags: ["React", "TypeScript", "Supabase", "Tailwind"],
    color: "from-orange-500 to-amber-400",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  {
    name: "Omnichannel",
    tagline: "Gestão multicanal para o varejo moderno",
    description: "Plataforma SaaS para centralizar produtos, pedidos, estoque e NF-e de múltiplos canais de venda. Arquitetura monorepo com backend NestJS + BullMQ e frontend React.",
    url: "https://omnichannel-35w.pages.dev",
    tags: ["React", "NestJS", "TypeScript", "Redis", "BullMQ"],
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    name: "Boa Clínica",
    tagline: "Plataforma de gestão para clínicas",
    description: "SaaS para gestão de clínicas de saúde. Prontuário eletrônico, agenda de consultas, gestão de pacientes, financeiro, equipe com controle de acesso por perfil e CRM integrado.",
    url: "https://boa-clinica.pages.dev",
    tags: ["React", "TypeScript", "Supabase", "shadcn/ui"],
    color: "from-cyan-500 to-teal-400",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
  },
  {
    name: "EduNota",
    tagline: "Anotações inteligentes para educação infantil",
    description: "Plataforma para professores de educação infantil registrarem observações individuais de alunos e gerarem relatórios pedagógicos completos com inteligência artificial (Claude AI).",
    url: "https://edu-nota.pages.dev",
    tags: ["React", "NestJS", "TypeScript", "Anthropic AI"],
    color: "from-teal-500 to-emerald-400",
    bg: "bg-teal-50",
    border: "border-teal-200",
  },
  {
    name: "Imob Manager",
    tagline: "Gestão completa para corretores de imóveis",
    description: "PWA para corretores imobiliários gerenciarem portfólio de imóveis, clientes e negociações. Funciona offline e instala no celular, ideal para uso em visitas externas.",
    url: "https://imob-manager.pages.dev",
    tags: ["React", "TypeScript", "Supabase", "PWA"],
    color: "from-emerald-600 to-green-400",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    name: "Serra Privacy (LGPD)",
    tagline: "Adequação à LGPD para empresas",
    description: "Plataforma Next.js para gestão de conformidade com a Lei Geral de Proteção de Dados. Inventário de dados, gestão de consentimentos, DPO, incidentes e relatórios de compliance.",
    url: "https://lgpd-platform.vercel.app",
    tags: ["Next.js 16", "React 19", "TypeScript", "Supabase"],
    color: "from-violet-600 to-purple-500",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
  {
    name: "Cicla MOB",
    tagline: "Acompanhe seu ciclo com o Método Billings",
    description: "Aplicativo mobile-first para acompanhamento do ciclo menstrual baseado no Método de Ovulação Billings. Registro diário, calendário, histórico e notificações personalizadas.",
    url: "https://cicla-mob.pages.dev",
    tags: ["React", "TypeScript", "Supabase", "Mobile-first"],
    color: "from-rose-500 to-pink-400",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
  {
    name: "Plataforma de Mini Aplicações",
    tagline: "Luizalabs · Magazine Luiza — Aplicativo Magalu",
    description: "Serviço backend de alta escala para gerenciamento do ciclo de vida de mini aplicações dentro do Aplicativo Magalu, o super app de varejo da Magazine Luiza. Foco em APIs, versionamento, distribuição e confiabilidade distribuída.",
    url: "https://github.com/omatsudev",
    tags: ["Node.js", "TypeScript", "Fastify", "Distributed Systems", "Observability", "Caching"],
    color: "from-blue-700 to-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
    isWork: true,
    company: "Luizalabs · Magazine Luiza",
    period: "Nov 2022 — Presente",
  },
  {
    name: "Painel Administrativo",
    tagline: "Luizalabs · Magazine Luiza — Aplicativo Magalu",
    description: "Interface administrativa para gestão e monitoramento de mini aplicações do Aplicativo Magalu. Controles de visibilidade, versionamento, rollout e observabilidade em tempo real para times internos da Magazine Luiza.",
    url: "https://github.com/omatsudev",
    tags: ["Next.js", "TypeScript", "NextAuth", "Tailwind"],
    color: "from-blue-700 to-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
    isWork: true,
    company: "Luizalabs · Magazine Luiza",
    period: "Nov 2022 — Presente",
  },
  {
    name: "Rede Social Educacional",
    tagline: "TO Brasil — Integração Descomplica",
    description: "Backend completo de uma rede social educacional integrada à plataforma Descomplica. API REST com módulos de cadastro/perfil, turmas, threads, notificações e sistema de convites. 100% de cobertura de testes, com entrega do MVP no prazo.",
    url: "https://github.com/omatsudev",
    tags: ["Node.js", "TypeScript", "Jest", "Supertest", "REST API"],
    color: "from-emerald-600 to-green-500",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    isWork: true,
    company: "TO Brasil",
    period: "Dez 2020 — Mar 2022",
  },
  {
    name: "Sistema de Precificação e Transporte Pet",
    tagline: "Moovipet — Freelance",
    description: "Calculadora dinâmica de precificação por trechos de rota com composição automática do valor total. Algoritmo de verificação de capacidade para transporte pet validando vagas por tamanho e peso de cada animal, integrado ao sistema legado.",
    url: "https://github.com/omatsudev",
    tags: ["PHP", "Laravel", "MySQL"],
    color: "from-amber-500 to-yellow-400",
    bg: "bg-amber-50",
    border: "border-amber-200",
    isWork: true,
    company: "Moovipet",
    period: "Ago 2021 — Dez 2021",
  },
  {
    name: "Microsserviços de Validação Documental",
    tagline: "Grupo PetraGold — Rio de Janeiro",
    description: "Arquitetura de microsserviços com MoleculerJS para plataforma financeira. Microsserviço de validação de CNPJ/CPF com integração direta à Receita Federal, garantindo autenticidade em fluxos críticos de negócio.",
    url: "https://github.com/omatsudev",
    tags: ["Node.js", "MoleculerJS", "MongoDB", "Microsserviços"],
    color: "from-yellow-600 to-amber-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    isWork: true,
    company: "Grupo PetraGold",
    period: "Abr 2018 — Ago 2021",
  },
]

const stack = [
  { category: "Backend", icon: Server, items: ["Node.js", "TypeScript", "Fastify", "Express", "NestJS", "Moleculer", "PHP", "Laravel"] },
  { category: "Frontend", icon: Globe, items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Vite"] },
  { category: "Banco de Dados", icon: Database, items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "TypeORM", "Knex", "Sequelize"] },
  { category: "Infraestrutura", icon: Cpu, items: ["Docker", "Apigee", "Kong", "Azion", "OpenTelemetry", "Instana"] },
  { category: "Testes", icon: Terminal, items: ["Jest", "Supertest", "Vitest", "React Testing Library"] },
  { category: "Metodologias", icon: Layers, items: ["Microsserviços", "REST APIs", "Scrum", "Kanban", "TDD", "Clean Architecture"] },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'stack', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'about', label: 'Sobre' },
    { id: 'projects', label: 'Projetos' },
    { id: 'stack', label: 'Stack' },
    { id: 'contact', label: 'Contato' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#home" className="font-bold text-white text-lg">
            <span className="text-blue-400">LO</span><span className="hidden sm:inline"> · Lauro Omatsu</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`text-sm transition-colors ${activeSection === l.id ? 'text-blue-400 font-medium' : 'text-gray-400 hover:text-white'}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://www.linkedin.com/in/omatsu/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
          <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 py-4 flex flex-col gap-4">
            {navLinks.map(l => (
              <a key={l.id} href={`#${l.id}`} className="text-sm text-gray-300" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="https://www.linkedin.com/in/omatsu/" target="_blank" rel="noopener noreferrer"
              className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center">LinkedIn</a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-8 text-3xl font-black shadow-2xl shadow-blue-900/50">
            LO
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Disponível para novos projetos
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            Lauro Omatsu
          </h1>
          <p className="text-xl sm:text-2xl text-blue-300 font-semibold mb-4">
            Software Engineer
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Mais de 15 anos em TI, com foco nos últimos 8 em desenvolvimento de software de alto impacto. Especializado em backend Node.js e TypeScript, com expertise em microsserviços e frontend moderno com React e Next.js.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["Node.js", "TypeScript", "React", "Next.js", "Fastify", "PostgreSQL"].map(t => (
              <span key={t} className="bg-gray-800 border border-gray-700 text-gray-300 text-sm px-3 py-1.5 rounded-lg">{t}</span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projects" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg">
              Ver projetos <Rocket className="w-5 h-5" />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-gray-800 border border-gray-700 hover:border-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg">
              Entrar em contato <Mail className="w-5 h-5" />
            </a>
          </div>
          <a href="#about" className="mt-16 inline-flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors">
            <span className="text-sm">Saiba mais</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-4 sm:px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-blue-900/50 border border-blue-700/50 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">Sobre mim</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Sou um engenheiro de software com <strong className="text-white">mais de 15 anos de experiência em TI</strong>, sendo os últimos 8 dedicados inteiramente ao desenvolvimento de produtos digitais de alto impacto e escalabilidade.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Minha especialidade é construir backends robustos com <strong className="text-white">Node.js e TypeScript</strong>, com experiência profunda em arquiteturas de microsserviços, APIs RESTful e sistemas distribuídos — usando Fastify, Express e Moleculer no dia a dia.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                No frontend, construo interfaces modernas e performáticas com <strong className="text-white">React e Next.js</strong>. Tenho paixão por produtos que resolvem problemas reais — o que me levou a criar 7+ SaaS independentes além da minha atuação profissional.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Anos em TI", value: "15+" },
                  { label: "Anos como dev", value: "8+" },
                  { label: "Projetos SaaS", value: "7+" },
                  { label: "Testes cobertos", value: "100%" },
                ].map(s => (
                  <div key={s.label} className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
                    <p className="text-3xl font-black text-blue-400">{s.value}</p>
                    <p className="text-gray-400 text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: Server, title: "Backend & Microsserviços", desc: "APIs RESTful de alta performance, arquiteturas de microsserviços e sistemas distribuídos com Node.js, TypeScript e Fastify." },
                { icon: Globe, title: "Frontend Moderno", desc: "Interfaces responsivas e performáticas com React, Next.js, Tailwind CSS e foco em experiência do usuário." },
                { icon: Database, title: "Banco de Dados & Cache", desc: "PostgreSQL, MySQL, MongoDB e Redis — modelagem, otimização de queries e estratégias de cache eficientes." },
                { icon: Code2, title: "Qualidade & Testes", desc: "TDD, testes unitários com Jest e de integração com Supertest. Código limpo, documentado e sustentável." },
              ].map(c => (
                <div key={c.title} className="flex gap-4 bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-900/50 border border-blue-700/50 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">{c.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-4 sm:px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-900/50 border border-blue-700/50 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">Projetos</h2>
          </div>
          <p className="text-gray-400 mb-12 ml-14">Produtos que construí do zero — de SaaS B2B a apps mobile-first.</p>

          {/* Personal projects */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">Projetos Próprios</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {projects.filter(p => !p.isWork).map(p => (
              <div key={p.name} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all group">
                <div className={`h-2 bg-gradient-to-r ${p.color}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-white">{p.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{p.tagline}</p>
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-400 transition-colors mt-0.5">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map(t => (
                      <span key={t} className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Work projects */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Building2 className="w-3 h-3" /> Projetos Profissionais
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.filter(p => p.isWork).map(p => (
              <div key={p.name} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all">
                <div className={`h-2 bg-gradient-to-r ${p.color}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white">{p.name}</h3>
                      <p className="text-xs text-blue-400 font-medium mt-0.5">{p.tagline}</p>
                      {'period' in p && (
                        <p className="text-xs text-gray-500 mt-0.5">{p.period}</p>
                      )}
                    </div>
                    <span className="text-xs bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded-md shrink-0 ml-3">Profissional</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map(t => (
                      <span key={t} className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="py-24 px-4 sm:px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-blue-900/50 border border-blue-700/50 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">Stack</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stack.map(s => (
              <div key={s.category} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-blue-900/50 border border-blue-700/50 flex items-center justify-center">
                    <s.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="font-semibold text-white text-sm">{s.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map(item => (
                    <span key={item} className="bg-gray-800 border border-gray-700 text-gray-300 text-xs px-2.5 py-1 rounded-lg">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 sm:px-6 bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-900/50 border border-blue-700/50 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white">Contato</h2>
          </div>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Quer conversar sobre um projeto, oportunidade ou parceria? Fique à vontade para entrar em contato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.linkedin.com/in/omatsu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a
              href="https://wa.me/5524981593376"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
            <a
              href="https://github.com/omatsudev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gray-800 border border-gray-700 hover:border-gray-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8 px-4 sm:px-6 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Lauro Omatsu · Feito com React + Tailwind
        </p>
      </footer>
    </div>
  )
}
