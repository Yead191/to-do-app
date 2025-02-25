import { useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import TaskColumn from '@/components/Task/TaskColumn';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useAuth from '@/hooks/useAuth';
import Spinner from '@/Spinner/Spinner';
import {
    PlusIcon,
    CheckCircleIcon,
    ClockIcon,
    ListBulletIcon,
    ArrowPathIcon,
    ExclamationCircleIcon,
    ChartBarIcon,
    CalendarIcon,
    BellAlertIcon,
    FireIcon
} from '@heroicons/react/24/outline';
import Stats from '@/components/stats/Stats';

const categories = [{

    title: 'To-Do',
    icon: ListBulletIcon,
    color: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    iconBg: 'bg-purple-100'
},
{
    title: 'In Progress',
    icon: ClockIcon,
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    iconBg: 'bg-blue-100'
},
{
    title: 'Done',
    icon: CheckCircleIcon,
    color: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    iconBg: 'bg-green-100'
}]

const Today = () => {
    const { user, loading } = useAuth()
    const axiosPublic = useAxiosPublic();
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks', user],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/my-tasks/today/${user.email}`);
            return res.data;
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        date: new Date(),
        category: 'To-Do',
        timestamp: new Date().toISOString(),
    });

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeTask = tasks.find(task => task._id === active.id);
        const overCategory = over.id;

        if (activeTask && overCategory) {
            await toast.promise(axiosPublic.put(`/tasks/${activeTask._id}`, { category: overCategory }), {
                loading: 'Updating Task...',
                success: <b>Task Updated!</b>,
                error: <b>Unable to Update!</b>
            });

            refetch();
        }
    };

    const addTask = async () => {


        if (!newTask.title.trim()) {
            toast.error('Title is required.');
            return;
        }
        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = newTask.date.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            toast.error('Cannot select a past date.');
            return;
        }
        const formattedTask = {
            ...newTask,
            date: newTask.date.toISOString(),
            timestamp: new Date().toISOString(),
            email: user.email
        };

        await toast.promise(
            axiosPublic.post('/tasks', formattedTask),
            {
                loading: 'Adding task...',
                success: <b>Task added successfully!</b>,
                error: <b>Failed to add task.</b>,
            }
        );
        refetch();
        setIsModalOpen(false);
        setNewTask({
            title: '',
            description: '',
            date: new Date(),
            category: 'To-Do',
        });
    };
    if (loading) {
        return <Spinner></Spinner>
    }
    if (user && isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <main className="overflow-y-auto p-4 lg:container mx-auto">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Today's Tasks</h1>
                {/* Add New Task Dialog */}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsModalOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" /> Add New Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Task</DialogTitle>
                        </DialogHeader>
                        {
                            user ?
                                <div className="space-y-4">
                                    {/* Task Title */}
                                    <Input
                                        placeholder="Title (required, max 50 characters)"
                                        value={newTask.title}
                                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                        maxLength={50}
                                    />
                                    {/* Task Description */}
                                    <Textarea
                                        placeholder="Description (optional, max 200 characters)"
                                        value={newTask.description}
                                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                        maxLength={200}
                                    />
                                    {/* Task Date */}
                                    <Calendar
                                        mode="single"
                                        selected={newTask.date}
                                        onSelect={(date) => {
                                            if (date) {
                                                setNewTask({ ...newTask, date });
                                            }
                                        }}
                                    />
                                    {/* Task Category */}
                                    <Select
                                        value={newTask.category.title}
                                        onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat.title} value={cat.title}>{cat.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {/* Add Task Button */}
                                    <Button onClick={addTask}>Add Task</Button>
                                </div>
                                :
                                <p className='text-red-400'>Please Login to Add New Task</p>
                        }
                    </DialogContent>
                </Dialog>
            </div>
            <Stats tasks={tasks}></Stats>

            {/* Task Columns */}
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full">
                    {categories?.map(category => (
                        <TaskColumn
                            key={category.title}
                            category={category}
                            refetch={refetch}
                            tasks={tasks?.filter(task => task.category === category.title)}
                            onDrop={handleDragEnd}
                        />
                    ))}
                </div>
            </DndContext>
        </main>
    );
};

export default Today;