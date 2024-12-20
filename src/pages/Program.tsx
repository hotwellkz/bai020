import React from 'react';
import { Brain } from 'lucide-react';
import ProgramModule from '../components/ProgramModule';
import AIChat from '../components/AIChat';
import { useAuth } from '../contexts/AuthContext';
import { programData } from '../data/programData';
import { useNavigate } from 'react-router-dom';

const Program = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartLearning = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/lesson/1.1');
    }
  };

  return (
    <section className="pt-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <Brain className="text-red-500" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold">Программа курса</h1>
          </div>
          
          <p className="text-gray-400 text-lg mb-12">
            Полная программа обучения, разработанная экспертами и адаптированная под ваш темп с помощью ИИ. 
            Каждый модуль включает теорию, практику и тесты для закрепления материала.
          </p>

          <div className="space-y-6">
            <AIChat />
            
            {programData.map((module, index) => (
              <ProgramModule
                key={index}
                title={module.title}
                lessons={module.lessons}
              />
            ))}
          </div>

          <div className="mt-12 p-6 bg-red-500/10 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Готовы начать обучение?
            </h2>
            {!user ? (
              <p className="text-gray-300 mb-6">
                Зарегистрируйтесь, чтобы начать обучение с поддержкой ИИ-учителя 24/7.
              </p>
            ) : (
              <p className="text-gray-300 mb-6">
                Присоединяйтесь к курсу и станьте востребованным бизнес-аналитиком с поддержкой ИИ-учителя 24/7.
              </p>
            )}
            <button 
              onClick={handleStartLearning}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              Начать обучение
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;