import React, { useState, useEffect } from 'react';

const App = () => {
  const numRows = 30; // You can change this to increase the number of rows
  const numCols = 10;

  const [positions, setPositions] = useState(Array.from({ length: numRows }, (_, i) => {
    if (i === 10) return 80;
    if (i >= 11 && i <= 19) return 70 - (i - 11) * 10;
    return (i % numCols) * 10;
  }));

  const [directions, setDirections] = useState(Array.from({ length: numRows }, (_, i) => {
    if (i >= 10 && i <= 19) return -1;
    if (i >= 20 && i <= 29) return 1;
    return 1;
  })); // 1 for right, -1 for left

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prevPositions => prevPositions.map((prev, index) => {
        if (prev >= 90) {
          setDirections(directions => {
            const newDirections = [...directions];
            newDirections[index] = -1;
            return newDirections;
          });
          return prev - 10;
        } else if (prev <= 0) {
          setDirections(directions => {
            const newDirections = [...directions];
            newDirections[index] = 1;
            return newDirections;
          });
          return prev + 10;
        } else {
          return prev + 10 * directions[index];
        }
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [directions]);

  const arr = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(i * numCols + j + 1);
    }
    arr.push(row);
  }

  return (
    <div className='m-0 p-0 bg-black'>
      <div className="flex flex-col gap-0">
        {arr.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-0 relative">
            {row.map((el, colIndex) =>{
            const isDiagonal = (Math.floor(rowIndex / 10) % 2 === 0 && rowIndex%10 === colIndex) ||
            (Math.floor(rowIndex / 10) % 2 === 1 && rowIndex%10 + colIndex === numCols -2);
            return (
              <div key={el} className={`w-[10%] aspect-square flex  text-white border-white justify-center items-center border  ${isDiagonal ? 'bg-blue-600' : ''}`}>
                <div className="text-center p-2 relative z-20">{el}</div>
              </div>
            );
            })}
            <div className="w-[10%] aspect-square bg-red-600 absolute top-0 z-10" style={{ left: `${positions[rowIndex]}%` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;