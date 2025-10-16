import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Subject {
  name: string;
  icon: string;
  grades: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
  };
}

const subjects: Subject[] = [
  { name: 'Математика', icon: 'Calculator', grades: { q1: 5, q2: 4, q3: 5, q4: 5 } },
  { name: 'Русский язык', icon: 'BookOpen', grades: { q1: 4, q2: 5, q3: 4, q4: 5 } },
  { name: 'Литература', icon: 'BookMarked', grades: { q1: 5, q2: 5, q3: 5, q4: 4 } },
  { name: 'Английский язык', icon: 'Languages', grades: { q1: 4, q2: 4, q3: 5, q4: 5 } },
  { name: 'История', icon: 'Landmark', grades: { q1: 5, q2: 4, q3: 4, q4: 5 } },
  { name: 'Обществознание', icon: 'Users', grades: { q1: 4, q2: 5, q3: 5, q4: 4 } },
  { name: 'География', icon: 'Globe', grades: { q1: 5, q2: 5, q3: 4, q4: 5 } },
  { name: 'Биология', icon: 'Leaf', grades: { q1: 4, q2: 4, q3: 5, q4: 4 } },
  { name: 'Физика', icon: 'Zap', grades: { q1: 5, q2: 4, q3: 4, q4: 5 } },
  { name: 'Химия', icon: 'TestTube', grades: { q1: 4, q2: 5, q3: 5, q4: 4 } },
  { name: 'Информатика', icon: 'Monitor', grades: { q1: 5, q2: 5, q3: 5, q4: 5 } },
  { name: 'Физкультура', icon: 'Dumbbell', grades: { q1: 5, q2: 5, q3: 5, q4: 5 } },
];

const Index = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<'all' | 'q1' | 'q2' | 'q3' | 'q4'>('all');

  const getGradeColor = (grade: number) => {
    if (grade === 5) return 'bg-green-100 text-green-700 border-green-300';
    if (grade === 4) return 'bg-blue-100 text-blue-700 border-blue-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const calculateAverage = (grades: { q1: number; q2: number; q3: number; q4: number }) => {
    return ((grades.q1 + grades.q2 + grades.q3 + grades.q4) / 4).toFixed(1);
  };

  const calculateTotalAverage = () => {
    const total = subjects.reduce((sum, subject) => {
      return sum + parseFloat(calculateAverage(subject.grades));
    }, 0);
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
          <p className="text-lg text-gray-600">8 класс • 2024-2025 учебный год</p>
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
            <Tabs value={selectedQuarter} onValueChange={(v) => setSelectedQuarter(v as any)}>
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
                  Все четверти
                </TabsTrigger>
                <TabsTrigger value="q1" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  1 четверть
                </TabsTrigger>
                <TabsTrigger value="q2" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  2 четверть
                </TabsTrigger>
                <TabsTrigger value="q3" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  3 четверть
                </TabsTrigger>
                <TabsTrigger value="q4" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  4 четверть
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
                <div className="space-y-3">
                  {selectedQuarter === 'all' ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">1 четверть</span>
                        <Badge className={`${getGradeColor(subject.grades.q1)} border font-semibold`}>
                          {subject.grades.q1}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">2 четверть</span>
                        <Badge className={`${getGradeColor(subject.grades.q2)} border font-semibold`}>
                          {subject.grades.q2}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">3 четверть</span>
                        <Badge className={`${getGradeColor(subject.grades.q3)} border font-semibold`}>
                          {subject.grades.q3}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">4 четверть</span>
                        <Badge className={`${getGradeColor(subject.grades.q4)} border font-semibold`}>
                          {subject.grades.q4}
                        </Badge>
                      </div>
                      <div className="pt-2 mt-2 border-t flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Средний балл</span>
                        <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-base px-3">
                          {calculateAverage(subject.grades)}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Badge className={`${getGradeColor(subject.grades[selectedQuarter])} border text-4xl px-6 py-3 font-bold`}>
                        {subject.grades[selectedQuarter]}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-4">
                        {selectedQuarter === 'q1' && '1 четверть'}
                        {selectedQuarter === 'q2' && '2 четверть'}
                        {selectedQuarter === 'q3' && '3 четверть'}
                        {selectedQuarter === 'q4' && '4 четверть'}
                      </p>
                    </div>
                  )}
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
                  {subjects.filter(s => calculateAverage(s.grades) === '5.0').length}
                </p>
                <p className="text-sm text-gray-600">Предметов на отлично</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <Icon name="Award" size={32} className="text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">
                  {subjects.reduce((sum, s) => sum + Object.values(s.grades).filter(g => g === 5).length, 0)}
                </p>
                <p className="text-sm text-gray-600">Пятёрок за год</p>
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
