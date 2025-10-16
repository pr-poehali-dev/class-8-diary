import { useState, useMemo, useCallback } from 'react';
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

interface ScheduleLesson {
  subject: string;
  time: string;
  grade?: number;
  homework?: string;
}

interface DaySchedule {
  day: string;
  date: string;
  lessons: ScheduleLesson[];
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

const weekSchedule: DaySchedule[] = [
  {
    day: 'Понедельник',
    date: '14.10',
    lessons: [
      { subject: 'Алгебра', time: '8:00-8:40', grade: 5, homework: 'Решить задачи №145-150' },
      { subject: 'Русский язык', time: '9:00-9:40', grade: 4, homework: 'Упражнение 87' },
      { subject: 'История', time: '10:05-10:45', grade: 5 },
      { subject: 'Физика', time: '11:00-11:40', grade: 5, homework: 'Параграф 12, задачи' },
      { subject: 'Английский язык', time: '11:50-12:25', grade: 4 },
      { subject: 'Биология', time: '12:30-13:05', grade: 4, homework: 'Читать параграф 8' },
    ]
  },
  {
    day: 'Вторник',
    date: '15.10',
    lessons: [
      { subject: 'Геометрия', time: '8:00-8:40', grade: 4, homework: 'Теоремы выучить' },
      { subject: 'Литература', time: '9:00-9:40', grade: 5 },
      { subject: 'Химия', time: '10:05-10:45', grade: 4, homework: 'Лабораторная работа' },
      { subject: 'География', time: '11:00-11:40', grade: 5 },
      { subject: 'Информатика', time: '11:50-12:25', grade: 5, homework: 'Программирование задач' },
      { subject: 'Обществознание', time: '12:30-13:05', grade: 4 },
    ]
  },
  {
    day: 'Среда',
    date: '16.10',
    lessons: [
      { subject: 'Русский язык', time: '8:00-8:40', grade: 4 },
      { subject: 'Алгебра', time: '9:00-9:40', grade: 5, homework: 'Контрольная работа' },
      { subject: 'Английский язык', time: '10:05-10:45', grade: 4, homework: 'Учить слова стр. 42' },
      { subject: 'Физика', time: '11:00-11:40', grade: 5 },
      { subject: 'Биология', time: '11:50-12:25', grade: 4 },
      { subject: 'Литература', time: '12:30-13:05', grade: 5, homework: 'Читать главы 3-5' },
    ]
  },
  {
    day: 'Четверг',
    date: '17.10',
    lessons: [
      { subject: 'История', time: '8:00-8:40', grade: 5, homework: 'Сообщение о войне 1812 г.' },
      { subject: 'Геометрия', time: '9:00-9:40', grade: 4 },
      { subject: 'Химия', time: '10:05-10:45', grade: 4, homework: 'Решить уравнения' },
      { subject: 'Обществознание', time: '11:00-11:40', grade: 4 },
      { subject: 'География', time: '11:50-12:25', grade: 5 },
      { subject: 'Информатика', time: '12:30-13:05', grade: 5 },
    ]
  },
  {
    day: 'Пятница',
    date: '18.10',
    lessons: [
      { subject: 'Литература', time: '8:00-8:40', grade: 5 },
      { subject: 'Алгебра', time: '9:00-9:40', grade: 5 },
      { subject: 'Английский язык', time: '10:05-10:45', grade: 4 },
      { subject: 'Русский язык', time: '11:00-11:40', grade: 4, homework: 'Сочинение' },
      { subject: 'Физика', time: '11:50-12:25', grade: 5 },
      { subject: 'История', time: '12:30-13:05', grade: 5 },
    ]
  },
];

const Index = () => {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [activeTab, setActiveTab] = useState<'grades' | 'schedule'>('grades');
  const { toast } = useToast();

  const getGradeColor = useCallback((grade: number) => {
    if (grade === 5) return 'bg-green-100 text-green-700 border-green-300';
    if (grade === 4) return 'bg-blue-100 text-blue-700 border-blue-300';
    return 'bg-gray-100 text-gray-700 border-gray-300';
  }, []);

  const totalAverage = useMemo(() => {
    const total = subjects.reduce((sum, subject) => sum + subject.grade, 0);
    return (total / subjects.length).toFixed(2);
  }, [subjects]);

  const fiveGradesCount = useMemo(() => subjects.filter(s => s.grade === 5).length, [subjects]);

  const handleGradeClick = useCallback((subject: Subject) => {
    setSelectedSubject(subject);
    setSelectedGrade(subject.grade);
    setIsDialogOpen(true);
  }, []);

  const handleSaveGrade = useCallback(() => {
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
  }, [selectedSubject, selectedGrade, subjects, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Ученик</p>
            <p className="text-sm font-semibold text-gray-800">Котов Андрей</p>
            <p className="text-xs text-gray-500">2025-2026 учебный год</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-white/80 backdrop-blur-sm text-gray-500 hover:text-gray-700 hover:bg-white/90"
            onClick={() => setIsDialogOpen(true)}
          >
            <Icon name="Settings" size={16} />
          </Button>
        </div>
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mb-4 shadow-lg">
            <Icon name="GraduationCap" size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Электронный дневник
          </h1>
          <p className="text-lg text-gray-600">8 класс • 1 четверть</p>
        </div>

        <div className="flex justify-center gap-2 mb-6 animate-fade-in">
          <Button
            variant={activeTab === 'grades' ? 'default' : 'outline'}
            onClick={() => setActiveTab('grades')}
            className="px-6"
          >
            <Icon name="BookOpen" size={18} className="mr-2" />
            Оценки
          </Button>
          <Button
            variant={activeTab === 'schedule' ? 'default' : 'outline'}
            onClick={() => setActiveTab('schedule')}
            className="px-6"
          >
            <Icon name="Calendar" size={18} className="mr-2" />
            Расписание
          </Button>
        </div>

        {activeTab === 'grades' && (
          <>
        <Card className="mb-6 shadow-lg border-0 animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon name="TrendingUp" size={24} />
                Общая статистика
              </span>
              <Badge variant="secondary" className="bg-white text-blue-700 text-lg px-4 py-1">
                Средний балл: {totalAverage}
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
                  {fiveGradesCount}
                </p>
                <p className="text-sm text-gray-600">Предметов на отлично</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <Icon name="Award" size={32} className="text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">
                  {fiveGradesCount}
                </p>
                <p className="text-sm text-gray-600">Пятёрок в четверти</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                <Icon name="Target" size={32} className="text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-700">{totalAverage}</p>
                <p className="text-sm text-gray-600">Общий средний балл</p>
              </div>
            </div>
          </CardContent>
        </Card>
          </>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-4 animate-fade-in">
            {weekSchedule.map((day, dayIndex) => (
              <Card key={day.day} className="shadow-lg border-0" style={{ animationDelay: `${dayIndex * 0.1}s` }}>
                <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon name="Calendar" size={20} />
                      {day.day}
                    </span>
                    <Badge variant="secondary" className="bg-white text-blue-700">
                      {day.date}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {day.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-semibold text-sm">
                            {lesson.time}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{lesson.subject}</p>
                            {lesson.homework && (
                              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                <Icon name="FileText" size={14} />
                                {lesson.homework}
                              </p>
                            )}
                          </div>
                        </div>
                        {lesson.grade && (
                          <Badge className={`${getGradeColor(lesson.grade)} border text-2xl px-4 py-2 font-bold`}>
                            {lesson.grade}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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