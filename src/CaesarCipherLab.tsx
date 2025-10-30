import React, { useState } from 'react';
import { motion } from 'framer-motion';
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl bg-[#444654] p-4 shadow-lg">{children}</div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-4">{children}</div>
);

const Button = ({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-lg font-semibold transition ${className}`}
  >
    {children}
  </button>
);

const Input = ({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`rounded-md px-3 py-2 outline-none ${props.className}`}
  />
);


function CipherWheel({ shift }: { shift: number }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const radius = 120;
  const step = (2 * Math.PI) / alphabet.length;
  const rotation = (shift * 360) / 26;

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      <svg width="300" height="300" viewBox="0 0 300 300" className="absolute">
        {alphabet.map((letter, i) => {
          const angle = i * step - Math.PI / 2;
          const x = 150 + radius * Math.cos(angle);
          const y = 150 + radius * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fill="#ECECF1"
              fontFamily="monospace"
            >
              {letter}
            </text>
          );
        })}
      </svg>

      <motion.svg
        width="260"
        height="260"
        viewBox="0 0 300 300"
        className="absolute"
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      >
        {alphabet.map((letter, i) => {
          const angle = i * step - Math.PI / 2;
          const x = 150 + (radius - 30) * Math.cos(angle);
          const y = 150 + (radius - 30) * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fill="#10A37F"
              fontFamily="monospace"
            >
              {letter}
            </text>
          );
        })}
      </motion.svg>
    </div>
  );
}

export default function CaesarCipherLab() {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const caesarShift = (str: string, shift: number) => {
    return str
      .toUpperCase()
      .split('')
      .map((char) => {
        if (!alphabet.includes(char)) return char;
        const index = alphabet.indexOf(char);
        const newIndex = (index + shift + 26) % 26;
        return alphabet[newIndex];
      })
      .join('');
  };

  const handleProcess = () => {
    const shiftValue = mode === 'encrypt' ? shift : -shift;
    setResult(caesarShift(text, shiftValue));
  };

  return (
    <div className="min-h-screen bg-[#343541] text-[#ECECF1] flex flex-col items-center py-10 px-4">
      <motion.h1
        className="text-4xl font-bold mb-8 text-[#10A37F]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Caesar Cipher Learning Lab
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <Card className="w-full max-w-md bg-[#444654] text-[#ECECF1] shadow-xl">
          <CardContent className="p-6 flex flex-col gap-4">
            <Input
              placeholder="Enter your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-[#40414F] border-none text-[#ECECF1] placeholder-[#8E8EA0]"
            />
            <div className="flex gap-2 items-center">
              <label className="font-medium">Shift:</label>
              <Input
                type="number"
                min="0"
                max="25"
                value={shift}
                onChange={(e) => setShift(Number(e.target.value))}
                className="w-20 bg-[#40414F] border-none text-[#ECECF1]"
              />
              <Button
                variant={mode === 'encrypt' ? 'default' : 'outline'}
                className="bg-[#10A37F] text-white hover:bg-[#0E8C6E] border-none"
                onClick={() => setMode('encrypt')}
              >
                Encrypt
              </Button>
              <Button
                variant={mode === 'decrypt' ? 'default' : 'outline'}
                className="bg-[#10A37F] text-white hover:bg-[#0E8C6E] border-none"
                onClick={() => setMode('decrypt')}
              >
                Decrypt
              </Button>
              <Button
                onClick={handleProcess}
                className="bg-[#19C37D] text-white border-none hover:bg-[#0E8C6E]"
              >
                Process
              </Button>
            </div>
            <div className="bg-[#40414F] p-4 rounded-lg shadow-inner">
              <h2 className="font-semibold mb-2 text-[#19C37D]">Result:</h2>
              <p className="text-lg font-mono break-words">{result}</p>
            </div>
          </CardContent>
        </Card>

        <CipherWheel shift={shift} />
      </div>
    </div>
  );
}
