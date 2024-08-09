import {
  CircleUserRound,
  FileText,
  LifeBuoy,
  LogOut,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/use-user";
import { signOutAccount } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { getFromLocalstorage } from "@/action/get-from-localstorage";

export function ProfileDropdown() {
  const user = useUser();

  const router = useRouter();

  const salir = () => {
    //Verificar que no hayan quedado trazas de clientes ni obras en el localstorage
    const idClient = getFromLocalstorage("idClient");
    if (idClient) {
      localStorage.removeItem("idClient");
    }
    const selectedBuilding = getFromLocalstorage("selectedBuilding");
    if (selectedBuilding) {
      localStorage.removeItem("selectedBuilding");
    }

    signOutAccount();
    router.push("/");
  };

  const redir = () => {
    router.push("/profile");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="mr-2">Cuenta</span>
          <CircleUserRound className="m-auto w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div>
            {user?.name} {user?.surname}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => redir()}>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil de usuario</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Términos y condiciones</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Soporte</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => salir()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Salir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
