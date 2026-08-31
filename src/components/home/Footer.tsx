export default function Footer() {
  return (
    <footer className="bg-[#015f58] py-7 text-white">

      <div className="mx-auto grid max-w-[1000px] justify-items-center gap-10 px-6 lg:grid-cols-2">

        <div>

          <h3 className="text-lg font-bold">
            Garrison Grammar School
          </h3>

          <p className="mt-3 max-w-sm  leading-6 text-white/70">
            Inspiring students, developing potential and building
            a stronger future through quality education.
          </p>

        </div>

        <div>

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


      <div className="mx-auto mt-7 max-w-[1000px] border-t border-white/50 px-6 pt-5">

        <p className="text-center  text-white">
          © 2026 Garrison Grammar School. All rights reserved.
        </p>

      </div>

    </footer>
  );
}