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
import { LoaderCircle } from "lucide-react";
import { searchProducts } from "@/lib/auth";

interface SheetSearchProductsProps {
  items: Product[];
  setItems: Dispatch<SetStateAction<Product[]>>;
  getItems: () => Promise<void>;
}

export function SheetSearchProducts({
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filterItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await searchProducts(
        0,
        10,
        id,
        nombre,
        precioMin,
        precioMax
      );
      setFilteredItems(data);
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id, nombre, precioMin, precioMax, setItems]);

  useEffect(() => {
    if (!hasFetched) {
      getItems().then(() => setHasFetched(true));
    }
  }, [getItems, hasFetched]);

  const searchGo = async () => {
    await filterItems();
    setIsSheetOpen(false);
  };

  const closeWindows = async () => {
    await getItems();
    resetFilters();
    setIsSheetOpen(false);
  };

  const resetFilters = () => {
    setId(undefined);
    setNombre("");
    setPrecioMin(undefined);
    setPrecioMax(undefined);
    setFilteredItems(items); // Reset filtered items to the original items
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="px-6" onClick={() => setIsSheetOpen(true)}>
          Buscar Productos
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
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading ? "Filtrando..." : "Aplicar Filtro"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SheetSearchProducts;
