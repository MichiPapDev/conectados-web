import Image from "next/image";
import "./globals.css?v=3";

export default function Home() {
  return (
    // la caja principal que contiene todo el contenido de la página
    <div className="flex flex-col items-center min-h-screen w-full bg-blue-100">

      <div className="flex flex-col lg:p-8 items-center bg-blue-100 text-black w-full h-screen" /* la caja que contiene el contenido de la página */ >

        <img
          src="/logo.jpeg"
          alt="Conecta2 Logo"
          width={500}
          height={350}
          className="
          h-50
          sm:m-8
          sm:h-32"
        />

        <h1 className="text-black text-4xl font-bold">Conecta2</h1>
        <br />

        <p className="
          text-black 
          text-center 
          text-sm 
          border-2 
          border-black 
           
          rounded-lg 
          bg-white 
          sm:text-sm 
          md:text-md 
          sm:w-4/5 
          md:w-3/5 
          lg:w-2/5 
          xl:w-1/3">
          
          ¿Listo para vivir momentos inolvidables? <br /><br /> 🌟

          Esta es una comunidad hecha para ti: un espacio donde las salidas se convierten en recuerdos, las conversaciones fluyen como en casa, y la diversión 
          nunca termina. Cada integrante suma su esencia para crear el grupo más auténtico y alegre.<br />

          No importa si vienes a jugar, a planear o simplemente a compartir, aquí siempre tendrás un lugar. ¡Únete y forma parte de esta hermosa familia! 💛
        </p>

      </div>

      <h2 className="text-white text-2xl">point left</h2>
      <div className="flex items-center justify-center bg-blue-500">
        <h2 className="text-white text-4xl font-bold">point center</h2>
      </div>


    </div>
  );
}