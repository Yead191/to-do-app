import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { motion, AnimatePresence } from 'framer-motion';

const TaskColumn = ({ category, tasks, onDrop, refetch }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: category.title, // Ensure `id` is a string
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            ref={setNodeRef}
            className={` bg-white rounded-xl  shadow-sm border ${category.borderColor} hover:shadow-md transition-shadow rounded-lg ${isOver ? "bg-gray-100" : ""}`}
            data-category={category.title}
        >

            <div className={`flex items-center justify-between rounded-t-xl gap-4 mb-6 ${category.color}`}>
                <div className={`p-3 rounded-lg flex items-center gap-4`}>
                    {/* Use `category.icon` as a React component */}
                    {category.icon && <category.icon className={`w-6 h-6 ${category.textColor}`} />}
                    <motion.h3
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-xl font-bold text-gray-900"
                    >
                        {category.title}
                    </motion.h3>
                </div>
                <div className="flex justify-between items-center">
                    
                </div>
                    <span className={`bg-white bg-opacity-90 px-2.5 mr-5  rounded-full text-sm font-medium`}>
                        {tasks?.length || 0}
                    </span>
            </div>

            <SortableContext
                items={tasks?.map(task => task._id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col space-y-2 p-4">
                    {tasks?.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            refetch={refetch}
                        />
                    ))}
                </div>
            </SortableContext>
        </motion.div>

    );
};

export default TaskColumn;
