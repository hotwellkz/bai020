import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  showGift?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, showGift }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl max-w-md w-full mx-4 animate-fade-in">
        <div className="text-center">
          <Gift className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold mb-4">Поздравляем! 🎉</h2>
          <p className="text-gray-300 mb-6">
            Вы получили 100 токенов в подарок за регистрацию!
          </p>
          <button
            onClick={() => navigate('/program')}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-colors"
          >
            Начать обучение
          </button>
        </div>
      </div>
    </div>
  );
};