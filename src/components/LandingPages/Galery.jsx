import GridKulinerLayout from "./ui/grid";

const Galery = () => {
  return (
    <>
      <div className="min-h-screen w-full pt-28">
        <div className="text-center mb-7">
          <h1 className="text-slate-800 text-4xl font-bold mb-4">
            Kekayaan Kuliner Malang
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Temukan Cita rasa autentik khas Malang, menjadikan setiap hidangan
            sebagai pengalaman istimewa bagi para penikmat kuliner
          </p>
        </div>
        <div className="px-20 py-10">
          <GridKulinerLayout />
        </div>
      </div>
    </>
  );
};

export default Galery;
