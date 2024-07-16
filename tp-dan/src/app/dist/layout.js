"use client";
"use strict";
exports.__esModule = true;
var google_1 = require("next/font/google");
require("./globals.css");
var react_hot_toast_1 = require("react-hot-toast");
var use_user_1 = require("@/hooks/use-user");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var inter = google_1.Inter({ subsets: ["latin"] });
function RootLayout(_a) {
    var children = _a.children;
    var user = use_user_1.useUser();
    var pathName = navigation_1.usePathname();
    var router = navigation_1.useRouter();
    var authRoutes = ["/", "/sign-up", "/forgot-password"];
    var protectedRoutes = [
        "/productos",
        "/pedidos",
        "/obras",
        "/profile",
        "/abm/productos",
        "/abm/pedidos",
        "/abm/obras",
        "/abm/clientes",
    ];
    react_1.useEffect(function () {
        if (user) {
            // Redirigir usuarios autenticados fuera de las rutas de autenticación
            if (authRoutes.includes(pathName)) {
                if (user.role === 1 && pathName !== "/abm/clientes") {
                    router.push("/abm/productos");
                }
                else if (user.role === 0 && pathName !== "/obras") {
                    router.push("/obras");
                }
            }
        }
        else {
            // Redirigir a la página de login si no hay usuario autenticado y se encuentra en una ruta protegida
            if (!authRoutes.includes(pathName) &&
                protectedRoutes.includes(pathName)) {
                router.push("/");
            }
        }
    }, [user, pathName, router]);
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: inter.className },
            children,
            React.createElement(react_hot_toast_1.Toaster, null))));
}
exports["default"] = RootLayout;
