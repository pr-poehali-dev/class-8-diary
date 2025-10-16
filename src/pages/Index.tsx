import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Subject {
  name: string;
  icon: string;
  grade: number;
}

const initialSubjects: Subject[] = [
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
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const { toast } = useToast();

  const getGradeColor = (grade: number) => {
    if (grade === 5) return 'bg-green-100 text-green-700 border-green-300';
    if (grade === 4) return 'bg-blue-100 text-blue-700 border-blue-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const calculateTotalAverage = () => {
    const total = subjects.reduce((sum, subject) => sum + subject.grade, 0);
    return (total / subjects.length).toFixed(2);
  };

  const handleGradeClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setSelectedGrade(subject.grade);
    setIsDialogOpen(true);
  };

  const handleSaveGrade = () => {
    if (selectedSubject) {
      setSubjects(subjects.map(s => 
        s.name === selectedSubject.name ? { ...s, grade: selectedGrade } : s
      ));
      toast({
        title: 'Оценка изменена',
        description: `${selectedSubject.name}: ${selectedGrade}`,
      });
      setIsDialogOpen(false);
    }
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
                  <Badge 
                    className={`${getGradeColor(subject.grade)} border text-5xl px-8 py-4 font-bold cursor-pointer hover:scale-110 transition-transform`}
                    onClick={() => handleGradeClick(subject)}
                  >
                    {subject.grade}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-4">1 четверть</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-3 text-blue-600 hover:text-blue-700"
                    onClick={() => handleGradeClick(subject)}
                  >
                    <Icon name="Edit" size={16} className="mr-1" />
                    Изменить
                  </Button>
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedSubject && (
                  <>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                      <Icon name={selectedSubject.icon} size={16} className="text-white" />
                    </div>
                    {selectedSubject.name}
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                Выберите оценку за 1 четверть
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center gap-3 py-6">
              {[2, 3, 4, 5].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`w-16 h-16 rounded-xl font-bold text-2xl transition-all duration-200 ${
                    selectedGrade === grade
                      ? 'scale-110 shadow-lg ' + getGradeColor(grade) + ' border-2'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Отмена
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white hover:opacity-90"
                onClick={handleSaveGrade}
              >
                <Icon name="Check" size={16} className="mr-1" />
                Сохранить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;