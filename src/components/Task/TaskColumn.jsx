import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const TaskColumn = ({ category, tasks, onDrop, refetch }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: category,
    });

    const handleDrop = (event) => {
        if (onDrop) {
            onDrop(event, category);
        }
    };

    return (
        <div
            ref={setNodeRef}
            className={`p-4 border rounded-lg ${isOver ? "bg-gray-100" : ""}`}
            data-category={category}
            onDrop={handleDrop}
        >
            <h2 className="text-xl font-bold mb-2">{category}</h2>

            <SortableContext
                items={tasks.map(task => task._id)} 
                strategy={verticalListSortingStrategy}
                animation={200} 
            >
                <div className="flex flex-col space-y-2">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            refetch={refetch} 
                        />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};

export default TaskColumn;
