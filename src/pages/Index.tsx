import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Subject {
  name: string;
  icon: string;
  grade: number;
}

const subjects: Subject[] = [
  { name: 'Алгебра', icon: 'Calculator', grade: 5 },
  { name: 'Геометрия', icon: 'Triangle', grade: 4 },
  { name: 'Русский язык', icon: 'BookOpen', grade: 4 },
  { name: 'Литература', icon: 'BookMarked', grade: 5 },
  { name: 'Английский язык', icon: 'Languages', grade: 4 },
  { name: 'История', icon: 'Landmark', grade: 5 },
  { name: 'Обществознание', icon: 'Users', grade: 4 },
  { name: 'География', icon: 'Globe', grade: 5 },
  { name: 'Биология', icon: 'Leaf', grade: 4 },
  { name: 'Физика', icon: 'Zap', grade: 5 },
  { name: 'Химия', icon: 'TestTube', grade: 4 },
  { name: 'Информатика', icon: 'Monitor', grade: 5 },
  { name: 'Физкультура', icon: 'Dumbbell', grade: 5 },
];

const Index = () => {


  const getGradeColor = (grade: number) => {
    if (grade === 5) return 'bg-green-100 text-green-700 border-green-300';
    if (grade === 4) return 'bg-blue-100 text-blue-700 border-blue-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const calculateTotalAverage = () => {
    const total = subjects.reduce((sum, subject) => sum + subject.grade, 0);
    return (total / subjects.length).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mb-4 shadow-lg">
            <Icon name="GraduationCap" size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Электронный дневник
          </h1>
          <p className="text-lg text-gray-600">8 класс • 1 четверть • 2024-2025 учебный год</p>
        </div>

        <Card className="mb-6 shadow-lg border-0 animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon name="TrendingUp" size={24} />
                Общая статистика
              </span>
              <Badge variant="secondary" className="bg-white text-blue-700 text-lg px-4 py-1">
                Средний балл: {calculateTotalAverage()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600">Показаны оценки за 1 четверть</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <Card
              key={subject.name}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center shadow-md">
                    <Icon name={subject.icon} size={20} className="text-white" />
                  </div>
                  <span className="text-lg">{subject.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Badge className={`${getGradeColor(subject.grade)} border text-5xl px-8 py-4 font-bold`}>
                    {subject.grade}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-4">1 четверть</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 shadow-lg border-0 animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Icon name="Trophy" size={24} />
              Достижения
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <Icon name="Star" size={32} className="text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-700">
                  {subjects.filter(s => s.grade === 5).length}
                </p>
                <p className="text-sm text-gray-600">Предметов на отлично</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <Icon name="Award" size={32} className="text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">
                  {subjects.filter(s => s.grade === 5).length}
                </p>
                <p className="text-sm text-gray-600">Пятёрок в четверти</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                <Icon name="Target" size={32} className="text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-700">{calculateTotalAverage()}</p>
                <p className="text-sm text-gray-600">Общий средний балл</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;