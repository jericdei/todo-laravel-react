import { Toast } from "primereact/toast";
import { createContext, createRef } from "react";

const toastRef = createRef<Toast>();
export const ToastContext = createContext(toastRef);

const ToastContextProvider = (props: any) => {
    return (
        <ToastContext.Provider value={toastRef}>
            {props.children}
            <Toast ref={toastRef} position="bottom-right" />
        </ToastContext.Provider>
    );
};

export default ToastContextProvider;
