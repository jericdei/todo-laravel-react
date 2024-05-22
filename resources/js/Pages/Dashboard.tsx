import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "primereact/button";
import { useContext, useState } from "react";
import TodoFormModal from "@/Components/TodoFormModal";
import { ToastContext } from "@/Contexts/ToastContext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export interface Todo {
    id?: number;
    content: string;
}

export interface DashboardProps {
    todos: Todo[];
}

export default function Dashboard({ auth, todos }: PageProps & DashboardProps) {
    const [showModal, setShowModal] = useState(false);
    const toast = useContext(ToastContext);
    const [selectedTodo, setSelectedTodo] = useState<Todo>();

    const editTodo = (todo: Todo) => {
        setSelectedTodo(todo);
        setShowModal(true);
    };

    const deleteTodo = (id: number) => {
        confirmDialog({
            header: "Delete Confirmation",
            message: "Are you sure you want to delete this todo?",
            accept: () => {
                router.delete(route("todos.destroy", id), {
                    onSuccess: ({ props }: any) => {
                        toast?.current?.show({
                            severity: props.toast.severity,
                            summary: props.toast.summary,
                            life: 3000,
                        });
                    },
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="flex justify-end p-6 text-gray-900 dark:text-gray-100">
                            <Button
                                label="New"
                                severity="success"
                                onClick={() => {
                                    setSelectedTodo(undefined);
                                    setShowModal(true);
                                }}
                            />
                        </div>

                        <div className="px-16 pt-8">
                            <h1 className="text-2xl font-bold">Todos</h1>

                            <ul className="my-4">
                                {todos.length > 0 ? (
                                    todos.map((todo: Todo) => (
                                        <div
                                            key={todo.id}
                                            className="flex items-center justify-between space-y-4"
                                        >
                                            <li className="px-4 py-2">
                                                {todo.content}
                                            </li>

                                            <div className="flex items-center gap-4">
                                                <Button
                                                    icon="ri-pencil-fill ri-lg"
                                                    text
                                                    tooltip="Edit Todo"
                                                    tooltipOptions={{
                                                        position: "top",
                                                    }}
                                                    onClick={() =>
                                                        editTodo(todo)
                                                    }
                                                />

                                                <Button
                                                    icon="ri-delete-bin-fill ri-lg"
                                                    severity="danger"
                                                    text
                                                    tooltip="Delete Todo"
                                                    tooltipOptions={{
                                                        position: "top",
                                                    }}
                                                    onClick={() =>
                                                        deleteTodo(
                                                            todo.id as number,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="p-32 text-center">
                                        No todos found.
                                    </p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <TodoFormModal
                onHide={() => setShowModal(false)}
                visible={showModal}
                todo={selectedTodo}
            />

            <ConfirmDialog />
        </AuthenticatedLayout>
    );
}
