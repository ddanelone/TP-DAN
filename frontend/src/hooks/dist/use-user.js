"use client";
"use strict";
exports.__esModule = true;
exports.useUser = void 0;
var get_from_localstorage_1 = require("@/action/get-from-localstorage");
var navigation_1 = require("next/navigation");
var navigation_2 = require("next/navigation");
var react_1 = require("react");
exports.useUser = function () {
    var _a = react_1.useState(null), user = _a[0], setUser = _a[1];
    var router = navigation_2.useRouter();
    var pathName = navigation_1.usePathname();
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
    var isInProtectedRoute = protectedRoutes.includes(pathName);
    react_1.useEffect(function () {
        var jwt = get_from_localstorage_1.getFromLocalstorage("jwt");
        if (!jwt) {
            setUser(null);
            if (isInProtectedRoute) {
                router.push("/");
            }
        }
        else {
            var userInLocalstorage = get_from_localstorage_1.getFromLocalstorage("user");
            if (userInLocalstorage) {
                setUser(userInLocalstorage);
            }
        }
    }, [pathName]);
    return user;
};
