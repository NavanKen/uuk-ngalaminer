const foods = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    title: "Makanan Lezat",
    description: "Hidangan spesial dengan cita rasa yang menggugah selera",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    title: "Sajian Premium",
    description: "Menu istimewa yang memanjakan lidah Anda",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=1200&fit=crop",
    title: "Pizza Favorit",
    description: "Pizza dengan topping melimpah dan keju yang meleleh",
    gridClass: "col-span-1 row-span-2",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    title: "Burger Spesial",
    description: "Burger juicy dengan daging premium dan saus rahasia",
    gridClass: "col-span-2 row-span-1",
  },
];

const GridKulinerLayout = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-5 h-[450px]">
      {foods.map((food) => (
        <div
          key={food.id}
          className={`relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer ${food.gridClass}`}
        >
          <img
            src={food.src}
            alt={food.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{food.title}</h3>
              <p className="text-sm text-gray-200">{food.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridKulinerLayout;
