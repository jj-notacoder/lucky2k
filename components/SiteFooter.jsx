const IG = 'https://www.instagram.com/luckytwothousand/';

export default function SiteFooter() {
  return (
    <footer id="site-footer" className="w-full">
      <div className="border-t-4 border-[#EF2E31]" />
      <div className="border-t-4 border-[#EF2E31]" />

      <div className="flex w-full flex-col items-center justify-center bg-[url('/donutfinal/footer.jpeg')] bg-cover bg-center bg-no-repeat px-5 py-16 text-center">
        <p
          className="font-['Clarendon'] text-[clamp(34px,7vw,82px)] font-black italic leading-none text-white"
          style={{ textShadow: '0 3px 0 #EF2E31, 0 0 18px rgba(239,46,49,0.75)' }}
        >
          SEE YOU IN THE MINA!
        </p>
        <a
          href={IG}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 font-['Lora'] text-xl font-bold text-white md:text-2xl"
          style={{ color: '#fff' }}
        >
          @luckytwothousand
        </a>
      </div>
    </footer>
  );
}
