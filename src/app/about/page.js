import AframeScene2 from "../components/AFrameScene2";
import Button from "../components/Button";
import Header from "../components/header";

export default function About() {
    return (
        <main className="pt-14 md:pt-16 lg:pt-2 overflow-x-hidden">

            <Header></Header>
            <div className="flex flex-col lg:flex-row justify-start w-full max-w-full lg:w-[1480px] h-auto lg:h-[820px] mt-1 lg:m-4 lg:m-10 gap-6 lg:gap-[4rem]">
                <div className="flex justify-center items-center w-full lg:w-[700px]">
                    <div className="flex justify-start h-auto lg:h-[650px] w-full lg:w-[700px] px-4 lg:px-0  ">
                        <div className="flex flex-col text-[24px] h-auto lg:h-[710px] justify-between text-[clamp(23px,2vw,24px)] w-full ">
                            <div className="w-full">
                                Окончила институт бизнеса и дизайна в 2024 году по программе цифровой дизайн и веб-проектирование.
                                Создаю интерфейсы, иллюстрации, анимацию и 3D — от концепта до реализации.
                                Работала с производством (дизайн-завод) и какао-брендом (Mojo Cacao). Люблю креативить, создавать и улучшать.
                                <div className="mt-1">Инструменты:</div>
                                <ul className="ml-6 mt-1 list-disc">
                                    <li>Adobe Photoshop, Illustrator, Effects</li>
                                    <li>Figma</li>
                                    <li>Blender</li>
                                    <li>Next.js</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Сцена A-Frame */}
                <div className="flex justify-center w-full lg:w-1/2 max-h-[400px] lg:h-[700px] overflow-auto">
                    <AframeScene2 />
                </div>

            </div>
        </main>
    );
}