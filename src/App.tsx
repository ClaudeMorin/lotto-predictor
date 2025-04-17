
import React, { useState } from "react";

export default function App() {
  const [prediction, setPrediction] = useState<number[]>([]);
  const [inputNumbers, setInputNumbers] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePrediction = () => {
    setLoading(true);
    const cleaned = inputNumbers
      .split(',')
      .map(num => parseInt(num.trim(), 10))
      .filter(num => !isNaN(num) && num >= 1 && num <= 70);

    if (cleaned.length < 10) {
      alert("⚠️ 숫자 10개 이상 입력해주세요 (1~70 사이, 쉼표로 구분)");
      setLoading(false);
      return;
    }

    const shuffled = [...cleaned].sort(() => 0.5 - Math.random());
    const recommended = shuffled.slice(0, 10).sort((a, b) => a - b);

    setTimeout(() => {
      setPrediction(recommended);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: 10 }}>
        🎯 실시간 로또 예측기
      </h2>

      <label style={{ display: 'block', marginBottom: 8 }}>직전 회차 번호 22개 입력 (쉼표로 구분)</label>
      <input
        type="text"
        placeholder="예: 1,5,12,23,..."
        value={inputNumbers}
        onChange={(e) => setInputNumbers(e.target.value)}
        style={{ width: '100%', padding: 10, fontSize: 16, marginBottom: 16 }}
      />

      <button
        onClick={generatePrediction}
        disabled={loading}
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          marginBottom: 24
        }}
      >
        {loading ? '예측 중...' : '번호 예측하기'}
      </button>

      {prediction.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 10,
          textAlign: 'center',
          fontSize: 18
        }}>
          {prediction.map((num) => (
            <div key={num} style={{
              background: '#f3f3f3',
              padding: 10,
              borderRadius: 8,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
