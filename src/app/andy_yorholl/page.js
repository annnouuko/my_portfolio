import AframeScene2 from "../components/AFrameScene2";
import Button from "../components/Button";
import Header from "../components/header";

export default function Work1() {
  return (
    <main>
      <Header />
      <div className="flex flex-row justify-start w-[1480px] h-[820px] m-10 gap-16">
        <div className="flex justify-center items-center w-[700px]">
          <div className="flex justify-center h-[650px] w-[700px]">
            <div className="flex flex-col text-[24px] h-[710px] justify-between">
              <img
                src="/img/andy_yourholl.png"
               
                className="w-full h-[600px] "
              />
              <Button className="mt-4">Полный кейс на Behance</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-[1192px] h-[1218px]">
          <AframeScene2 />
        </div>
      </div>
    </main>
  );
}
