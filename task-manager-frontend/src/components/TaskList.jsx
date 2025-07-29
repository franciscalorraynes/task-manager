import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Calendar, Edit, Trash2, CheckCircle, Clock, AlertCircle, Target } from 'lucide-react';
import apiService from '../services/api';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const tasksData = await apiService.getTasks();
      setTasks(tasksData);
    } catch (error) {
      setError('Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await apiService.createTask(taskData);
      await loadTasks();
      setShowForm(false);
    } catch (error) {
      setError('Erro ao criar tarefa');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await apiService.updateTask(editingTask.taskId, taskData);
      await loadTasks();
      setEditingTask(null);
    } catch (error) {
      setError('Erro ao atualizar tarefa');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await apiService.deleteTask(taskId);
        await loadTasks();
      } catch (error) {
        setError('Erro ao excluir tarefa');
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: { variant: 'secondary', className: 'bg-amber-100 text-amber-800 border-amber-200' },
      in_progress: { variant: 'default', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      completed: { variant: 'outline', className: 'bg-green-100 text-green-800 border-green-200' },
    };

    const labels = {
      pending: 'Pendente',
      in_progress: 'Em Andamento',
      completed: 'Concluída',
    };

    const config = variants[status] || variants.pending;

    return (
      <Badge variant={config.variant} className={config.className}>
        {labels[status] || status}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const inProgress = tasks.filter(task => task.status === 'in_progress').length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    
    return { total, completed, inProgress, pending };
  };

  const stats = getTaskStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-lg font-medium text-gray-700">Carregando tarefas...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total</p>
                <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600">Pendentes</p>
                <p className="text-2xl font-bold text-amber-800">{stats.pending}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Em Andamento</p>
                <p className="text-2xl font-bold text-blue-800">{stats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Concluídas</p>
                <p className="text-2xl font-bold text-green-800">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Minhas Tarefas</h2>
          <p className="text-gray-600">Organize e acompanhe seu progresso</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Nova Tarefa
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
        />
      )}

      {tasks.length === 0 ? (
        <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-dashed border-2 border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Target className="w-16 h-16 text-gray-400 mb-4" />
            <div className="text-gray-500 text-xl font-medium mb-2">Nenhuma tarefa encontrada</div>
            <p className="text-gray-400 text-center mb-6 max-w-md">
              Comece criando sua primeira tarefa para organizar seu trabalho e aumentar sua produtividade
            </p>
            <Button 
              onClick={() => setShowForm(true)} 
              variant="outline"
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar primeira tarefa
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {tasks.map((task) => (
            <Card 
              key={task.taskId || task.id || `task-${Math.random()}`} 
              className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-r from-white to-blue-50/30"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <CardTitle className="text-lg text-gray-800">{task.title}</CardTitle>
                      {task.description && (
                        <CardDescription className="mt-1 text-gray-600">
                          {task.description}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(task.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingTask(task)}
                      className="hover:bg-blue-100 hover:text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTask(task.taskId || task.id)}
                      className="hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  {task.dueDate && (
                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span className="text-amber-700">Vence: {formatDate(task.dueDate)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span>Criada em: {formatDate(task.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;