"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const page = () => {
  const handleNextBtn = () => {
    const div = document.querySelector("#slider");
    let sliderBoxWidth = div.clientWidth;

    div.scrollLeft += sliderBoxWidth;
  };
  const handlePrevBtn = () => {
    const div = document.querySelector("#slider");
    let sliderBoxWidth = div.clientWidth;

    div.scrollLeft -= sliderBoxWidth;
  };

  const controllers = () => {
    let controller = document.querySelector("#controller").childNodes;
    const div = document.querySelector("#slider");
    let sliderBoxWidth = div.clientWidth;

    controller.forEach((v) => {
      v.addEventListener("click", () => {
        let id = v.dataset.id;
        if (id === controller.length - 1) {
          div.scrollLeft = div.scrollWidth - sliderBoxWidth;
        } else {
          const offset = id * sliderBoxWidth;
          div.scrollLeft = offset;
        }
        // console.log("Controller Btn: ", div.clientWidth);
      });
    });
  };

  return (
    <div className="w-full min-h-[100vh] mt-[50px]">
      <div className="w-full h-[80vh] object-contain relative">
        <Image
          src="/storyBanner.webp"
          alt="story banner"
          layout="responsive"
          width={0}
          height={0}
          style={{ width: "100%", minHeight: "100%" }}
        />
      </div>
      <div className="w-[400px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white flex items-center justify-center  gap-[5px] flex-col">
        <span>
          <Image src="/StoryLogowhite.svg" alt="logo" width={60} height={60} />
        </span>
        <span className="text-[80px] font-[600]">Our Story</span>
        <span className="text-[30px] font-[400] tracking-tight">
          Designed in Canada.
          <br /> Inspire Better Living.
        </span>
      </div>

      <div className="w-[300px] absolute top-[20%] left-[5%]">
        <ul className="style-none text-white text-[13px] flex flex-col gap-[10px]">
          <Link href={"#beginnings"} className="flex">
            <li className="w-full cursor-pointer">Our beginnings</li>
          </Link>
          <Link href={"#our_values"} className="flex">
            <li className="w-full cursor-pointer">Our values</li>
          </Link>
          <Link href={"#goals"} className="flex">
            <li className="w-full cursor-pointer">Our sustainability goals</li>
          </Link>
          <Link href={"#community"} className="flex">
            <li className="w-full cursor-pointer">Our community & partners</li>
          </Link>
        </ul>
      </div>
      <div className="w-[70%] mx-auto my-[50px] text-center font-[500] text-[18px]">
        We believe in considering the impact of the choices we make every day
        and view those choices as an opportunity to better ourselves. Our
        purpose is to Inspire a Better way of Living by creating conscious
        products that last through time. By marrying innovation with
        eco-friendly processes, we strive to help shape a cleaner, healthier,
        and more mindful world where human progress is in harmony with the
        planet&apos;s well-being.
      </div>
      <div
        className="w-full min-h-[60vh] grid grid-cols-[2fr_2fr] my-[50px] gap-[30px] px-[30px]"
        id="beginnings"
      >
        <div className="w-full object-contain">
          <Image
            src="/OurStoryBeginnings.webp"
            alt="office"
            layout="responsive"
            width={0}
            height={0}
            objectFit="contain"
            style={{ width: "100%", minHeight: "100%" }}
          />
        </div>
        <div className="w-full flex flex-col justify-center text-balance p-[10px] box-border">
          <h1 className="text-[50px] font-[500] my-[20px] ">
            How it all started
          </h1>
          <p className="tracking-tighter text-[15px] font-[500] my-[10px] leading-[20px] ">
            Frank And Oak was founded in Montreal in 2012, with a mission to
            create an apparel brand that would speak to a new generation of
            creatives and entrepreneurs.
          </p>
          <p className="tracking-tighter text-[15px] font-[500] my-[10px] leading-[20px] ">
            What once started as a favourite in Montreal’s Mile End quickly
            blossomed into one of Canada’s leading lifestyle brands and digital
            retailers.
          </p>
          <p className="tracking-tighter text-[15px] font-[500] my-[10px] leading-[20px] ">
            A certified B Corp, Frank And Oak is now a leader in sustainable
            fashion and using innovative fabrics from nature to make products
            that are thoughtfully designed to help you live better, enjoy more,
            and feel good in everything you wear.
          </p>
          <span className="my-[20px] font-[500] text-[20px]">
            The Frank And Oak team
          </span>
        </div>
      </div>
      <div
        className="w-[90%] m-[50px_auto] min-h-[60vh] px-[60px] flex justify-center flex-col"
        id="our_values"
      >
        <span className="text-[40px] font-[500] my-[30px]">Our Values</span>
        <div className="w-full grid grid-cols-[1fr_1fr_1fr_1fr] gap-[20px]">
          <div className="p-[10px] box-border">
            <span className="font-[500] text-[18px] block my-[10px]">
              Act with purpose
            </span>
            <span className="my-[10px] text-[13px] text-balance">
              We design durable products that blend timeless style with
              functional features that help lay the foundation for better
              living.
            </span>
          </div>
          <div className="p-[10px] box-border">
            <span className="font-[500] text-[18px] block my-[10px]">
              Create communities
            </span>
            <span className="my-[10px] text-[13px] text-balance">
              We bring together a community of passionate and diverse
              individuals who want to be part of something bigger.
            </span>
          </div>
          <div className="p-[10px] box-border">
            <span className="font-[500] text-[18px] block my-[10px]">
              Inspire innovation
            </span>
            <span className="my-[10px] text-[13px] text-balance">
              We are a forward-thinking brand that delivers cutting-edge
              products to fit our customers&apos; modern and evolving
              lifestyles.
            </span>
          </div>
          <div className="p-[10px] box-border">
            <span className="font-[500] text-[18px] block my-[10px]">
              Be authentic
            </span>
            <span className="my-[10px] text-[13px] text-balance">
              We are driven by passion, not ego. We recognize and celebrate our
              individuality, strengths, and even weaknesses, but remain humble
              and open to continuous improvement.
            </span>
          </div>
        </div>
      </div>

      <div
        className="bg-[#F6F2EB] w-full p-[50px] my-[20px] grid grid-cols-[2fr_2fr] min-h-[100vh] gap-[30px]"
        id="goals"
      >
        <div className="px-[30px]">
          <span className="text-[50px] leading-[50px] font-[500] my-[20px] block">
            Our 2023 achievements
          </span>
          <span className="tracking-tighter leading-[20px] my-[30px] text-balance">
            By adopting circularity and innovation as our design philosophy, we
            strive to help shape a better, more mindful world where human
            progress is in harmony with the planet’s well-being. After years of
            work, reflection, and challenges, and in line with our pledge for
            transparency, we are proud to share our progress and the significant
            milestones we’ve reached so far.
          </span>
          <span className="my-[40px] text-[25px] font-[500] block">
            Read the full report{" "}
            <FaArrowRight className="inline-block text-[16px] font-light" />
          </span>
        </div>
        <div className="px-[30px] ">
          <div className="p-[10px]">
            <span
              className="text-[40px] font-[600] block"
              style={{
                WebkitTextStroke: "3px black",
                color: "#f6f2eb",
                WebkitTextFillColor: "#f6f2eb",
                paintOrder: "stroke fill",
              }}
            >
              100%
            </span>
            <span className="font-[500] text-[20px] block">
              of our assortment is responsible.
            </span>
            <span className="leading-[20px] tracking-tight">
              For us, that means all our products either contain low-impact,
              cruelty-free, organic, biodegradable, or recycled fibres, or are
              manufactured using industry-leading technologies and processes.{" "}
            </span>
          </div>
          <div className="p-[10px]">
            <span
              className="text-[40px] font-[600] block"
              style={{
                WebkitTextStroke: "3px black",
                color: "#f6f2eb",
                WebkitTextFillColor: "#f6f2eb",
                paintOrder: "stroke fill",
              }}
            >
              Less than 0.5%
            </span>
            <span className="font-[500] text-[20px] block">
              of our products feature virgin polyester.
            </span>
            <span className="leading-[20px] tracking-tight">
              We have (almost) eliminated the use of virgin polyester and
              replaced it with recycled polyester.
            </span>
          </div>
          <div className="p-[10px]">
            <span
              className="text-[40px] font-[600] block"
              style={{
                WebkitTextStroke: "3px black",
                color: "#f6f2eb",
                WebkitTextFillColor: "#f6f2eb",
                paintOrder: "stroke fill",
              }}
            >
              100%
            </span>
            <span className="font-[500] text-[20px] block">
              of our denim collection is designed to be circular.
            </span>
            <span className="leading-[20px] tracking-tight">
              All our denim styles are designed to be easily recycled. This
              means we craft them using conscious materials, salvaged fibres,
              and zero rivets.
            </span>
          </div>
          <div className="p-[10px]">
            <span
              className="text-[40px] font-[600] block"
              style={{
                WebkitTextStroke: "3px black",
                color: "#f6f2eb",
                WebkitTextFillColor: "#f6f2eb",
                paintOrder: "stroke fill",
              }}
            >
              Over 70%
            </span>
            <span className="font-[500] text-[20px] block">
              of our styles are made using mono-fibres and bi-fibres.
            </span>
            <span className="leading-[20px] tracking-tight">
              The more fibres are mixed together in a garment, the harder it
              will be to recycle. That is why we strive to keep the percentage
              of multi-fibre pieces to less than 30% of our collection.
            </span>
          </div>
          <div className="p-[10px]">
            <span
              className="text-[40px] font-[600] block"
              style={{
                WebkitTextStroke: "3px black",
                color: "#f6f2eb",
                WebkitTextFillColor: "#f6f2eb",
                paintOrder: "stroke fill",
              }}
            >
              More than 40%
            </span>
            <span className="font-[500] text-[20px] block">
              of our deliveries were carbon-neutral in 2023.
            </span>
            <span className="leading-[20px] tracking-tight">
              Since October 2022, we have been working with our warehousing and
              last-mile logistics partner, GoBolt, to make our deliveries carbon
              neutral. Last year, they delivered more than 40% of our packages.
              15% of these deliveries were done by Electric Vehicle (EV), and
              the rest was offset by sequestering carbon.
            </span>
          </div>
          <div className="p-[10px]">
            <span
              className="text-[40px] font-[600] block"
              style={{
                WebkitTextStroke: "3px black",
                color: "#f6f2eb",
                webkitTextFillColor: "#f6f2eb",
                paintOrder: "stroke fill",
              }}
            >
              Code of Conduct
            </span>
            <span className="font-[500] text-[20px] block">
              We require all our manufacturing partners to sign our Code of
              Conduct.
            </span>
            <span className="leading-[20px] tracking-tight">
              As part of our commitment to transparency and accountability, we
              adhere to the highest standards of fair labour practices and
              environmental protection. That is why we require our partners to
              have completed, or be in the process of completing, compliance
              audits conducted by international organizations such as BSCI
              (Business Social Compliance Initiative) and WRAP (Worldwide
              Responsible Accredited Production).
            </span>
          </div>
        </div>
      </div>

      <div
        className="w-full min-h-[60vh] grid grid-cols-[2fr_2fr] my-[50px] gap-[20px] px-[30px] box-border"
        id="community"
      >
        <div className="w-full flex flex-col justify-center text-balance p-[10px] box-border ">
          <h1 className="text-[50px] font-[500] my-[10px] ">Our community</h1>
          <span className="my-[10px] font-[500] text-[20px]">
            Mighty oaks from little acorns grow
          </span>
          <p className="tracking-tighter text-[15px] font-[500] my-[10px] leading-[20px] ">
            It only takes a tiny spark to turn a meaningful idea into an
            impactful pursuit. Today, we are a group of 300 people from over 20
            different countries. Sharing our optimism and embodying our values
            is our job, but it is also a reflection of our true selves. We stand
            together on what’s important. Here are a few throwbacks to some of
            our achievements:
          </p>
        </div>
        <div className="w-full relative box-border flex items-center justify-center">
          <FaArrowLeft
            className="w-[30px] h-[30px] rounded-[50%] bg-[rgba(0,0,0,0.5)] text-white absolute top-[50%] left-[25px] text-[18px] font-light p-[5px] cursor-pointer z-30"
            onClick={handlePrevBtn}
          />
          <FaArrowRight
            className="w-[30px] h-[30px] rounded-[50%] bg-[rgba(0,0,0,0.5)] text-white absolute top-[50%] right-[25px] text-[18px] font-light p-[5px] cursor-pointer z-30"
            onClick={handleNextBtn}
          />
          <div
            className="absolute bottom-[10%] left-[50%] grid grid-flow-col gap-[20px] z-40"
            id="controller"
            onClick={controllers}
          >
            <span
              className="w-[20px] h-[20px] bg-[rgba(255,255,255,0.7)] rounded-[50%] cursor-pointer translate-x-[-50%] hover:bg-white"
              data-id="0"
            ></span>
            <span
              className="w-[20px] h-[20px] bg-[rgba(255,255,255,0.7)] rounded-[50%] cursor-pointer translate-x-[-50%] hover:bg-white"
              data-id="1"
            ></span>
            <span
              className="w-[20px] h-[20px] bg-[rgba(255,255,255,0.7)] rounded-[50%] cursor-pointer translate-x-[-50%] hover:bg-white"
              data-id="2"
            ></span>
          </div>
          <div
            className="w-[450px] min-h-[60vh] grid grid-flow-col overflow-hidden scroll-smooth box-border"
            id="slider"
          >
            <div className="w-[450px] object-contain relative">
              <Image
                src="/communitySectionImg1.webp"
                alt="office"
                layout="responsive"
                width={0}
                height={0}
                objectFit="contain"
                style={{ width: "100%", minHeight: "100%" }}
              />
              <div className="absolute bottom-[10px] p-[30px]">
                <span className="block text-white">Make it Local</span>
                <span className="text-[13px] text-white">
                  A limited edition series of organic cotton T-shirts designed
                  in partnership with 3 local artists and made exclusively in
                  Quebec to showcase the richness of local production and
                  craftsmanship.
                </span>
              </div>
            </div>
            <div className="w-[450px] object-contain relative">
              <Image
                src="/communitySectionImg2.webp"
                alt="office"
                layout="responsive"
                width={0}
                height={0}
                objectFit="contain"
                style={{ width: "100%", minHeight: "100%" }}
              />
              <div className="absolute bottom-[10px] p-[30px]">
                <span className="block text-white">Town Brewery</span>
                <span className="text-[13px] text-white">
                  We teamed up with Town Brewery and created over 5,000 cans of
                  IPA beer called Coastal Waters.
                  <br />
                  For every can sold, $1 is donated to the David Suzuki
                  Foundation, which aims to protect Canada’s oceans, and marine
                  life biodiversity.
                </span>
              </div>
            </div>
            <div className="w-[450px] object-contain relative">
              <Image
                src="/communitySectionImg3.webp"
                alt="office"
                layout="responsive"
                width={0}
                height={0}
                objectFit="contain"
                style={{ width: "100%", minHeight: "100%" }}
              />
              <div className="absolute bottom-[10px] p-[30px]">
                <span className="block text-white">Vallée Duhamel</span>
                <span className="text-[13px] text-white">
                  We helped showcase Montreal-based artists Vallée Duhamel and
                  sponsored their interactive art exhibition at the
                  multidisciplinary Le Livart.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
