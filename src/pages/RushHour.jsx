// Page Jeu de Mémoire de Cartes
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
// import AnimationLoading from "../components/AnimationLoading";

export default function RushHour() {


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      {/* En-tête */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </Link>
        <h1 className="text-2xl font-black text-amber-400">Jeu Rush Hour</h1>
      </div>
      {/* <AnimationLoading /> */}
    </div>
  );
}
