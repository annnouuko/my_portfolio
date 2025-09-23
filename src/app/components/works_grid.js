import React from 'react';
import Link from 'next/link';
import HoverVideoPlayer from 'react-hover-video-player';

export default function Works_grids() {
  const works = [
    { caption: 'Сайт этнического магазина Око Ведати', href: '/work1', type: 'video', videoSrc: '/vids/oko_ved1.mp4' },
    { caption: 'CRM-система Florium', href: '/work2', type: 'image', imgSrc: '/img/crm_florium.png' },
    { caption: 'Платформа Тишина', href: '/work3', type: 'image', imgSrc: '/img/tishina.png' },

    { caption: 'Плакат к Энди Уорхолу', href: '/andy_yorholl', type: 'image', imgSrc: '/img/andy_yourholl.png' },
    { caption: 'Плакат для конкурса Multiverse', href: '/work5', type: 'image', imgSrc: '/img/flower.png' },
    { caption: 'Плакаты для оформления завода', href: '/work6', type: 'image', imgSrc: '/img/design_zavod.png' },

    { caption: '3D скульптура', href: '/3Dsculpt', type: 'video', videoSrc: '/vids/sculpt3.mp4' },
    { caption: 'Мой автопортрет', href: '/avtoport', type: 'video', videoSrc: '/vids/avto_por.mp4' },
    { caption: 'Иллюстрация персонажа', href: '/work9', type: 'video', videoSrc: '/vids/tach.mp4' },
    { caption: 'Иллюстрация персонажа', href: '/marmel', type: 'image', imgSrc: '/img/mar.png' },
    { caption: 'Мой 3D персонаж', href: '/me_3d_pers', type: 'image', imgSrc: '/img/me_3d.jpg' },
   
  ];

  // Разбиваем на ряды по 3 работы
  const rows = [];
  for (let i = 0; i < works.length; i += 3) {
    rows.push(works.slice(i, i + 3));
  }

  return (
    <div className="flex flex-col justify-start w-full max-w-[1465px] m-2 lg:m-10 gap-12">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row flex-wrap justify-center gap-8 w-full">
          {row.map(({ caption, href, type, videoSrc, imgSrc }, index) => (
            <div
              key={index}
              className="flex flex-col items-center flex-grow min-w-[250px] max-w-[250px] sm:min-w-[250px] sm:max-w-[430px] sm:h-auto cursor-pointer"
            >
              <Link href={href} className="w-full block">
                {type === 'video' ? (
                  <div className="w-full aspect-square overflow-hidden">
                    <HoverVideoPlayer
                      videoSrc={videoSrc}
                      muted
                      loop
                      className="w-full h-full object-cover block"
                    />
                  </div>
                ) : (
                  <img
                    src={imgSrc}
                    alt={caption}
                    className="w-full aspect-[8/8] object-cover bg-slate-200"
                  />
                )}
              </Link>
              <div className="mt-2 text-left text-[24px] text-black text-lg w-full">{caption}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
