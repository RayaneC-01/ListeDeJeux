// Fonction pour jouer un son de bip court (bip aigu)
export const jouerSonTicTac = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine"; // Type d'onde sonore
    oscillator.frequency.value = 800; // Fréquence en Hz (plus le chiffre est haut, plus le son est aigu)

    // Volume du son (court et bref)
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1); // Le son dure 0.1 seconde
  } catch (e) {
    console.error("Erreur audio", e);
  }
};