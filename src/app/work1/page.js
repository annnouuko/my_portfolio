import AframeScene2 from "../components/AFrameScene2";
import Button from "../components/Button";
import Header from "../components/header";

export default function Work1() {
  return (
    <main>
      <Header />
      <div className="flex flex-row justify-center w-[1480px] h-[820px] m-10 gap-16">
        <div className="flex justify-center items-center w-[700px]">
          <div className="flex justify-center h-[650px] w-[700px]">
            <div className="flex flex-col text-[24px] h-[710px] justify-between">

              {/* Видео с нативным контроллом play */}
              <video
                src="/vids/main2.mp4"
                controls
                muted
                className="w-full h-[410px] rounded-lg object-contain bg-black"
              />

              {/* Ссылка на Behance с классами для кнопки и ховером */}
              <a
                href="https://www.behance.net/gallery/189030249/Cajt-dlja-etnicheskij-jakutskogo-magazina-oko-vedati"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-black border border-black rounded-full px-10 py-2 h-[50px] w-[300px] inline-block text-center text-[20px] font-handjet hover:bg-[#84FF00] hover:text-black transition-colors duration-300"
              >
                Полный кейс на Behance
              </a>

            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-end w-[740px] h-[700px] mt-14  ">
          <div className="flex  h-[700px] w-[600px] p-6 flex-col ">
            <h1 className="text-4xl    mb-6 text-black">
              Этнический магазин «Око Ведати»
            </h1>
            <div className="text-[24px] text-black leading-relaxed">
              Этот проект — часть моей личной истории.<br />
              Родом из Якутии, я с детства погружена в культуру, где традиции, символы и связь с природой являются не сувениром, а образом жизни. Именно этот опыт я вложила в создание цифрового пространства для магазина «Око Ведати».<br /><br />
              Задача:<br />
              Сделать сложную этническую эстетику и глубокую философию бренда понятной, удобной и притягательной для современного пользователя на всех устройствах.
            </div>
          </div>
        </div>


      </div>
    </main>
  );
}
