const statistics = [
    {
        value: "400+",
        label: "Students",
    },
    {
        value: "55",
        label: "Teachers",
    },
    {
        value: "35",
        label: "Classes",
    },
    {
        value: "41+",
        label: "Years of Excellence",
    },
];

export default function Statistics() {
    return (
        <section className="bg-[#f6f8f8] py-16">

            <div className="mx-auto max-w-[1200px] px-6">

                <div className="mb-10 text-center">

                    <span className="text-lg font-bold text-[#01796f]">
                        Our School At A Glance
                    </span>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Growing together, achieving together.
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                        A community built around learning, growth and the
                        success of every student.
                    </p>

                </div>


                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {statistics.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#01796f]/30 hover:shadow-md"
                        >

                            <div className="text-3xl font-bold text-[#01796f] sm:text-4xl">
                                {stat.value}
                            </div>

                            <div className="mt-2 text-sm font-medium text-gray-500">
                                {stat.label}
                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}