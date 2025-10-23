import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const remainingHealth = 5; // Full health on the main menu

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-600 mb-4">Speedy Clean Scan</h1>
        <p className="text-lg text-gray-700 mb-8">
          Your mission: Identify and remove all contaminated food items before time runs out!
        </p>
        <Link href="/play">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-2xl">
            Start Game
          </button>
        </Link>
      </div>
      <div className="absolute bottom-10 left-10">
        <Image 
          src={`/images/main_character/health_${remainingHealth}.jpg`} 
          alt="Bao Bao Character" 
          width={160} 
          height={160} 
        />
      </div>
      <div className="absolute bottom-10 right-10 bg-white p-6 rounded-lg shadow-lg max-w-sm">
          <h2 className="text-2xl font-bold mb-4">How to Play</h2>
          <ul className="list-disc list-inside text-left">
              <li>Click on the spoiled or unsafe food items to remove them.</li>
              <li>Each correct click earns you points.</li>
              <li>Each incorrect click will cost you a life.</li>
              <li>Clear the grid before the timer runs out to win!</li>
          </ul>
      </div>
    </main>
  );
}
