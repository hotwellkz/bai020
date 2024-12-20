import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await auth.currentUser?.updatePassword(newPassword);
      setSuccess('Пароль успешно изменен');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError('Ошибка при изменении пароля');
      console.error('Password change error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <User className="text-red-500" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Профиль</h1>
                <p className="text-gray-400">Управление аккаунтом</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                <Mail className="text-red-500" size={24} />
                <div>
                  <p className="font-medium text-lg">{user?.email}</p>
                  <p className="text-sm text-gray-400">Email для входа в аккаунт</p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => signOut()}
                  className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-white px-6 py-3 rounded-full transition-colors border border-gray-600/50"
                >
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;