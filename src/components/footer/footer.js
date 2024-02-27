/* eslint-disable @next/next/no-img-element */
function Footer() {
  return (
    <div className="w-screen lg:h-auto h-[654.7px]  py-10 lg:py-20 bg-[#062039] flex-col justify-center overflow-x-hidden items-center gap-9 lg:flex">
      <div className="h-[169px] flex-col justify-start lg:pl-0 pl-4 items-start lg:items-center lg:gap-[50px] flex">
        <div className="lg:self-stretch lg:justify-around  items-start flex flex-col lg:flex-row">
          <div className="flex-col justify-start lg:flex-1 items-start gap-2  lg:mb-0 mb-20 inline-flex">
            <div className="text-white text-[40px] font-extrabold font-manrope leading-[48px]">
              Stomps.io
            </div>
            <div className="md:w-[399.84px] text-zinc-100 text-base font-normal font-manrope leading-relaxed tracking-tight">
              Empowering Conversations, Unleashing Possibilities
            </div>
          </div>
          <div className="h-[119px] flex-col lg:gap-4 gap-12 lg:flex-row  justify-between  lg:flex-1  items-start flex">
            <div className="flex-col justify-start items-start  inline-flex lg:mx-4">
              <div className="text-sky-50 text-base font-bold font-manrope leading-snug tracking-tight">
                Quick links
              </div>
              <div className="flex-col justify-start items-start gap-3 flex">
                <div className="text-zinc-100 text-sm font-normal font-manrope leading-snug">
                  Pricing
                </div>
                <div className="text-zinc-100 text-sm font-normal font-manrope leading-snug">
                  API
                </div>
                <div className="text-zinc-100 text-sm font-normal font-manrope leading-snug">
                  Guide
                </div>
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-3 inline-flex lg:mx-6">
              <div className="text-white text-base font-bold font-manrope leading-snug tracking-tight">
                What we know
              </div>
              <div className="flex-col justify-start items-start gap-2 flex">
                <div className="text-zinc-100 text-sm font-normal font-manrope leading-snug">
                  Terms of Use
                </div>
                <div className="text-zinc-100 text-sm font-normal font-manrope leading-snug">
                  FAQ
                </div>
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-6 inline-flex">
              <div className="flex-col justify-start items-start gap-2 flex">
                <div className="text-zinc-100 text-sm font-bold font-manrope leading-tight tracking-tight">
                  Contact Us
                </div>
                <div className="justify-start items-start gap-2 inline-flex">
                  <div className="w-[29px] h-[29px] pl-[4.08px] pr-[4.92px] pt-[5px] pb-1 bg-zinc-100 rounded-[50px] justify-center items-center flex">
                    <img
                      src="./images/footer/Social_icon_facebook.svg"
                      alt="facebook"
                      className="w-5 h-5 relative flex-col justify-start items-start flex"
                    />
                  </div>
                  <div className="w-[29px] h-[29px] pl-1 pr-[5px] pt-[5px] pb-1 bg-zinc-100 rounded-[50px] justify-center items-center flex">
                    <img
                      alt="instagram"
                      src="./images/footer/social1.svg"
                      className="w-5 h-5 relative flex-col justify-start items-start flex"
                    />
                  </div>
                  <div className="w-[29px] h-[29px] pl-[4.08px] pr-[4.92px] pt-[5px] pb-1 bg-zinc-100 rounded-[50px] justify-center items-center flex">
                    <img
                      alt="twitter"
                      src="./images/footer/X2.svg"
                      className="w-5 h-5 relative flex-col justify-start items-start flex"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[1108px] w-[90%] h-[0px] hidden lg:block border border-blue-400 border-opacity-20" />
      </div>
      <div className="lg:w-[1108px] w-[90%] h-[0px] absolute justify-center  bottom-10 left-[15px] lg:hidden border border-blue-400 border-opacity-20" />
    </div>
  );
}

export default Footer;
