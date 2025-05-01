import { useState, useEffect } from 'react'

const AdCarousel = () => {
  const ads = [
    'https://cdn.prod.website-files.com/5ef27cb65411b70949a151e9/5fa67de01a8f78f5d9392f2e_Free%20shipping%20(2).png',
    'https://images.unsplash.com/photo-1613690399151-65ea69478674?q=80&w=3546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://via.placeholder.com/1200x300?text=Free+Shipping+on+Orders+$50%2B'
  ]
  const [currentAd, setCurrentAd] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [ads.length])

  return (
    <div className="mx-4 my-6">
      <img
        src={ads[currentAd]}
        alt="Advertisement"
        className="w-full h-64 object-cover rounded-lg shadow-lg transition-opacity duration-500"
      />
    </div>
  )
}

export default AdCarousel