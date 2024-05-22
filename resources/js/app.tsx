import "./bootstrap";
import "../css/app.css";
import "remixicon/fonts/remixicon.css";

import { createRoot, hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { PrimeReactProvider } from "primereact/api";
import ToastContextProvider from "./Contexts/ToastContext";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx"),
        ),
    setup({ el, App, props }) {
        const Render = () => (
            <PrimeReactProvider value={{ unstyled: false }}>
                <ToastContextProvider>
                    <App {...props} />
                </ToastContextProvider>
            </PrimeReactProvider>
        );

        if (import.meta.env.DEV) {
            createRoot(el).render(<Render />);
            return;
        }

        hydrateRoot(el, <Render />);
    },
    progress: {
        color: "#4B5563",
    },
});
