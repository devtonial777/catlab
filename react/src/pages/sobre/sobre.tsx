import './sobre.scss'

export function Sobre() {
  return (
    <section className="about max-w-5xl mx-auto px-4 py-10 flex flex-col gap-10">

      {/* PERFIL */}
      <div className="about__hero flex flex-col gap-6 md:flex-row md:items-center">

        {/* FOTO */}
        <div className="flex justify-center md:justify-center">
          <img
            src="/sobre/imgSobre_Perfil.webp"
            alt="Marcos Tonial"
            className="about__avatar"
          />
        </div>

        {/* TEXTO */}
        <div className="flex flex-col text-center md:text-left">

          <h1 className="text-2xl font-bold primary-color">
            Marcos Tonial
          </h1>

          <p className="text-sm text-gray-500">
            Desenvolvedor Full Stack com foco em Front-end
          </p>

          <p className="mt-5">
            Desenvolvedor full stack com foco em front-end, atuando na construção de
            interfaces modernas, responsivas e bem estruturadas.
          </p>

          <p className="mt-5">
            Minha experiência com back-end me permite ter uma visão mais ampla das aplicações,
            contribuindo não apenas na interface, mas também em integrações, modelagem de dados
            e decisões técnicas.
          </p>

        </div>
      </div>

      {/* Tecnologias */}
      <div className="about__skills flex flex-col gap-3">

        <h2 className="text-lg font-semibold text-center md:text-left">
          Tecnologias
        </h2>

        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <span className="about__badge">Angular</span>
          <span className="about__badge">React</span>
          <span className="about__badge">TypeScript</span>
          <span className="about__badge">SCSS</span>
          <span className="about__badge">Tailwind</span>
          <span className="about__badge">Node.js</span>
          <span className="about__badge">PHP</span>
          <span className="about__badge">MySQL</span>
        </div>

      </div>

      {/* HOBBIES */}
      <div className="about__hobbies flex flex-col gap-4">

        <h2 className="text-lg font-semibold text-center md:text-left">
          Fora do código
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          <img
            src="/sobre/imgSobreForadoCod_PordoSol.webp"
            className="about__hobby"
          />

          <img
            src="/sobre/imgSobreForadoCod_Festa.webp"
            className="about__hobby"
          />

          <img
            src="/sobre/imgSobreForadoCod_Proj.webp"
            className="about__hobby"
          />

          <img
            src="/sobre/imgSobreForadoCod_Cachu.webp"
            className="about__hobby"
          />

        </div>
      </div>

    </section>
  )
}