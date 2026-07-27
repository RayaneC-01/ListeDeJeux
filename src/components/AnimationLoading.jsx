import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1, // Les carrés s'animent les uns après les autres
    },
  },
};

const blockVariants = {
  initial: { scale: 0.8, opacity: 0.3 },
  animate: {
    scale: [0.8, 1.2, 0.8],
    opacity: [0.3, 1, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function AnimationLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 p-4">
      {/* Bouton Retour positionné en haut à gauche */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Retour au menu</span>
      </Link>
      {/* Grille de chargement stylée */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 gap-3"
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            variants={blockVariants}
            className="h-8 w-8 rounded-lg bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
          />
        ))}
      </motion.div>

      {/* Texte avec effet de brillance (shimmer) */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 font-black  tracking-[0.2em] text-slate-400 text-[20px]"
      >
        Ce jeu arrive très bientôt !!
      </motion.p>
    </div>
  );
}
