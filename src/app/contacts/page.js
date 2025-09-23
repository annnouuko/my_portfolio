
import AframeScene2 from "../components/AFrameScene2";
import AFrameScene3 from "../components/AFrameScene3";
import AFrameScene from "../components/AFrameScene3";
import Button from "../components/Button";
import Header from "../components/header";


export default function Contacts() {
    return (
        <main className="pt-2 md:pt-16 lg:pt-2 overflow-x-hidden">
            <Header></Header>
            <div className="flex flex-row justify-start w-[1480px] h-[820px] m-4 lg:m-10  gap-[4rem]  ">
                <div className="flex  justify-center items-center  flex-row  w-[700px]  ">
                    <div className="flex justify-start h-[650px] w-[700px]">
                        <div className="flex flex-col text-[24px] h-[710px] justify-between text-[clamp(23px,8vw,24px)]">
                            <div>

                                <div>Контакты:</div>
                                <ul className="ml-6 mt-2 list-disc">
                                    <li>Телеграм: @anikvvv</li>
                                    <li>Почта: kozhev.nikova.anna.@mail.ru</li>
                                    <li>Behace: https://www.behance.net/anUtta</li>
                                    <li>Pinterest: kozhevnikovaanna921@gmail.com</li>
                                </ul>
                            </div>

                            
                        </div>

                    </div>
                </div>
                <div className="flex flex-row justify-center w-[1192px] h-[1218]">
                    <AFrameScene3></AFrameScene3>
                    


                </div>



            </div>

        </main>
    )
}