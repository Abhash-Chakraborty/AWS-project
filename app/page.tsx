import Auth from './components/Auth'

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Recipe AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover delicious recipes based on your ingredients
        </p>
      </div>
      
      <Auth />
    </main>
  )
}
