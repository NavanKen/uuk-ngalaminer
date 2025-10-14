/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import GridKulinerLayout from "./ui/grid";

const Galery = () => {
  return (
    <>
      <div id="galery" className="min-h-screen w-full pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-7"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-800 text-4xl font-bold mb-4"
          >
            Kekayaan Kuliner Malang
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg max-w-2xl mx-auto"
          >
            Temukan Cita rasa autentik khas Malang, menjadikan setiap hidangan
            sebagai pengalaman istimewa bagi para penikmat kuliner
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="px-20 py-10"
        >
          <GridKulinerLayout />
        </motion.div>
      </div>
    </>
  );
};

export default Galery;
