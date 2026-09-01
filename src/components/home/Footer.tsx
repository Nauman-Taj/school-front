export default function Footer() {
  return (
    <footer className="bg-[#015f58] py-7 text-white">
      
      <div className="mx-auto grid max-w-[1000px] gap-8 px-6 text-center justify-items-center lg:grid-cols-2 lg:text-left">

        {/* School Info */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-lg font-bold">
            Garrison Grammar School
          </h3>

          <p className="mt-3 max-w-sm leading-6 text-white/70">
            Inspiring students, developing potential and building
            a stronger future through quality education.
          </p>
        </div>


        {/* Contact */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="font-semibold">
            Contact
          </h3>

          <div className="mt-4 space-y-2 text-white/70">
            <p>+92 300 5454544</p>
            <p>info@garrisonschool.edu.pk</p>
            <p>Multan, Pakistan</p>
          </div>
        </div>

      </div>


      {/* Copyright */}
      <div className="mx-auto mt-7 max-w-[1000px] border-t border-white/30 px-6 pt-5">
        <p className="mx-auto max-w-md text-center text-sm text-white">
          © 2026 Garrison Grammar School. All rights reserved.
        </p>
      </div>

    </footer>
  );
}