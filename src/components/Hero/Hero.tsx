"use client";
import { useState } from "react";
import GradientWrapper from "../GradientWrapper/GradientWrapper";
import NavLink from "../NavLink/NavLink";

import Image from "next/image";
import HeroIntroVideo from "../HeroIntroVideo/HeroIntroVideo";
const Hero = () => {
  const [isVideoPoppedUp, setVideoPopUp] = useState(false);

  return (
    <GradientWrapper>
      <section>
        <div className="custom-screen items-center gap-12 text-gray-600 flex flex-col sm:justify-center sm:text-center xl:flex-row xl:text-left">
          <div className="flex-none space-y-5 max-w-4xl xl:max-w-2xl">
            <h1 className="text-4xl text-white font-extrabold sm:text-6xl">
              Explorez les Ressources du Master à l'ISCAE
            </h1>
            <p className="text-gray-300 max-w-xl sm:mx-auto xl:mx-0">
              Explorez en profondeur les matières et les modules du Master à
              l'ISCAE avec notre application. Obtenez des informations
              détaillées pour maîtriser chaque aspect de votre programme
              d'études et exceller dans votre parcours académique.
            </p>
            <div className="items-center gap-x-3 font-medium text-sm sm:flex sm:justify-center xl:justify-start">
              <NavLink
                href="#pricing"
                className="block text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700"
                scroll={false}
              >
                Lire plus
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </GradientWrapper>
  );
};

export default Hero;
