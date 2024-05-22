import { ToastContext } from "@/Contexts/ToastContext";
import { Todo } from "@/Pages/Dashboard";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Dialog, DialogProps } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FormEvent, useContext, useEffect } from "react";

export default function TodoFormModal(props: DialogProps & { todo?: Todo }) {
    const page = usePage<PageProps>();
    const toast = useContext(ToastContext);

    const form = useForm<{
        content: string;
        user_id: number;
    }>({
        content: "",
        user_id: page.props.auth.user.id,
    });

    useEffect(() => {
        if (props.todo) {
            form.setData("content", props.todo.content);
        }
    }, [props.todo]);

    const submit = (e: FormEvent) => {
        e.preventDefault();

        const action = props.todo ? "patch" : "post";

        const url = props.todo
            ? route("todos.update", props.todo.id)
            : route("todos.store");

        form.submit(action, url, {
            onSuccess: (successPage: any) => {
                form.reset("content");

                toast.current?.show({
                    severity: successPage.props.toast.severity,
                    summary: successPage.props.toast.summary,
                    life: 3000,
                });

                props.onHide();
            },
        });
    };

    return (
        <Dialog
            className="w-1/3"
            header="Add New Todo"
            focusOnShow={false}
            draggable={false}
            {...props}
        >
            <form onSubmit={submit}>
                <div className="flex flex-col gap-y-8">
                    <InputText
                        value={form.data.content}
                        onChange={({ target }) =>
                            form.setData("content", target.value)
                        }
                        autoFocus
                    />

                    <Button type="submit" label="Submit" onClick={submit} />
                </div>
            </form>
        </Dialog>
    );
}
