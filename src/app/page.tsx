import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const remainingHealth = 5; // Full health on the main menu

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-600 mb-4">Speedy Clean Scan</h1>
        <p className="text-lg text-red-600 mb-8">
          {/* Your mission: Identify and remove all contaminated food items before time runs out! */}
          Nhiệm vụ của bạn: Chọn tất cả các thực phẩm sạch trước khi thời gian hết!
        </p>
        <Link href="/play">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-2xl">
            Bắt đầu
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
      <div className="absolute bottom-10 right-10 bg-white p-6 rounded-lg shadow-lg max-w-sm text-red-600">
          <h2 className="text-2xl font-bold mb-4">Cách chơi</h2>
          <ul className="list-disc list-inside text-left">
              <li>Nhấn vào các thực phẩm bị ôi thiu hoặc không an toàn để xóa chúng.</li>
              <li>Mỗi lần nhấn đúng sẽ được cộng điểm.</li>
              <li>Mỗi lần nhấn sai sẽ mất một mạng.</li>
              <li>Chọn tất cả các thực phẩm tốt trước khi thời gian hết!</li>
          </ul>
      </div>
    </main>
  );
}
