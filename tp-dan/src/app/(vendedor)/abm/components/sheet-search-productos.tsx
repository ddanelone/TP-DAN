import {
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
  useCallback,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Product } from "@/interfaces/product-interface";
import { CirclePlus, LoaderCircle } from "lucide-react";
import { get } from "http";

interface SheetSearchProductsProps {
  isLoading: boolean;
  items: Product[];
  setItems: Dispatch<SetStateAction<Product[]>>;
  getItems: () => Promise<void>;
}

export function SheetSearchProducts({
  isLoading,
  items,
  setItems,
  getItems,
}: SheetSearchProductsProps) {
  const [id, setId] = useState<number | undefined>(undefined);
  const [nombre, setNombre] = useState<string>("");
  const [precioMin, setPrecioMin] = useState<number | undefined>(undefined);
  const [precioMax, setPrecioMax] = useState<number | undefined>(undefined);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Product[]>(items);
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const filterItems = useCallback(() => {
    getItems();
    const filtered = items.filter((item) => {
      return (
        (id === undefined || item.id === id) &&
        (!nombre || item.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
        (precioMin === undefined || item.precio >= precioMin) &&
        (precioMax === undefined || item.precio <= precioMax)
      );
    });
    setFilteredItems(filtered);
  }, [id, nombre, precioMin, precioMax]);

  useEffect(() => {
    if (!hasFetched) {
      getItems().then(() => setHasFetched(true));
    }
    filterItems();
  }, [getItems, hasFetched, filterItems]);

  const searchGo = () => {
    setItems(filteredItems);
    setIsSheetOpen(false);
  };

  const closeWindows = () => {
    getItems();
    resetFilters();
    setIsSheetOpen(false);
  };

  const resetFilters = () => {
    setId(undefined);
    setNombre("");
    setPrecioMin(undefined);
    setPrecioMax(undefined);
    filterItems();
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="px-6" onClick={() => setIsSheetOpen(true)}>
          {isLoading ? "Filtrando..." : "Buscar Productos"}
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criterios de búsqueda</SheetTitle>
          <SheetDescription>
            Ingrese al menos UN criterio para comenzar
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              Id
            </Label>
            <Input
              id="id"
              placeholder="id?"
              className="col-span-3"
              value={id === undefined ? "" : id}
              onChange={(e) =>
                setId(e.target.value ? parseInt(e.target.value) : undefined)
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Nombre
            </Label>
            <Input
              id="nombre"
              placeholder="Producto?"
              className="col-span-3"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="precioMin" className="text-right">
              Precio Mínimo
            </Label>
            <Input
              id="precioMin"
              placeholder="precio mínimo?"
              className="col-span-3"
              value={precioMin === undefined ? "" : precioMin}
              onChange={(e) =>
                setPrecioMin(
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="precioMax" className="text-right">
              Precio Máximo
            </Label>
            <Input
              id="precioMax"
              placeholder="precio máximo?"
              className="col-span-3"
              value={precioMax === undefined ? "" : precioMax}
              onChange={(e) =>
                setPrecioMax(
                  e.target.value ? parseFloat(e.target.value) : undefined
                )
              }
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="button" onClick={closeWindows}>
            Cancelar
          </Button>
          <Button type="button" onClick={searchGo}>
            Aplicar Filtro
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SheetSearchProducts;
