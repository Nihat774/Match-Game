import { useEffect, useState } from "react";
import Swal from "sweetalert2";
function App() {
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const images = [
    { image: "/img1.jpg", matched: false },
    { image: "/img2.jpg", matched: false },
    { image: "/img3.jpg", matched: false },
  ];

  const startNewGame = () => {
    const shuffled = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setCards(shuffled);
    setFirstChoice(null);
    setSecondChoice(null);
  };

  // Handle card click
  const handleChoice = (card) => {
    if (!disabled && card !== firstChoice) {
      firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    }
  };

  // Check for a match
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);

      if (firstChoice.image === secondChoice.image) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.image === firstChoice.image ? { ...card, matched: true } : card
          )
        );

        Swal.fire({
          title: "🎉 Təbriklər, qazandınız!",
          confirmButtonText: "Yenidən oyna",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            startNewGame();
          }
        });
      }

      setTimeout(() => {
        setFirstChoice(null);
        setSecondChoice(null);
        setDisabled(false);
      }, 1000);
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <main>
      <h1>🧠 Memory Match Game</h1>

      <div className="cart">
        {cards.map((card) => (
          <img
            key={card.id}
            src={
              card === firstChoice || card === secondChoice || card.matched
                ? card.image
                : "/default.webp"
            }
            alt="card"
            onClick={() => handleChoice(card)}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
