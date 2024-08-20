import api from "./axios";
import { User } from "@/interfaces/user.interface";
import { setInLocalstorage } from "@/action/set-in-localstorage";
import { getFromLocalstorage } from "@/action/get-from-localstorage";
import { Product } from "@/interfaces/product-interface";
import { Costumer } from "@/interfaces/costumer.interface";
import { AuthorizedUser } from "@/interfaces/user-authorize.interface";
import { Building } from "@/interfaces/building.interface";
import { Coordinates } from "@/interfaces/coordinate.interface";
import { Address } from "@/interfaces/address.interface";

/* ========== Usuarios  ========== */

export const signIn = async (user: {
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const response = await api.post("/usuarios/login", user);
    const { jwt, user: userData } = response.data;

    setInLocalstorage("jwt", jwt);
    setInLocalstorage("user", userData);

    return userData;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errors) {
      throw new Error(error.response.data.errors[0]);
    } else {
      throw new Error("Error al iniciar sesión");
    }
  }
};

export const createUser = async (user: {
  name: string;
  surname: string;
  dni: string;
  email: string;
  password: string;
  role: number;
}): Promise<void> => {
  try {
    await api.post("/usuarios/register", user);
    await signIn({ email: user.email, password: user.password });
  } catch (error) {
    throw error;
  }
};

// updateUser
export const updateUser = async (userId: number, user: User): Promise<User> => {
  try {
    // Obtén el token del local storage
    const token = getFromLocalstorage("jwt");

    // Configura la cabecera de autorización
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Realiza la solicitud de actualización con las cabeceras configuradas
    const response = await api.patch(
      `/usuarios/update-data/${userId}`,
      user,
      config
    );
    const updatedUserData = response.data;

    // Guarda los datos actualizados del usuario en el local storage
    setInLocalstorage("user", updatedUserData);

    return updatedUserData;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const signOutAccount = (): void => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
};

export const sendResetEmail = async (email: string): Promise<void> => {
  try {
    const response = await api.post("/usuarios/reset-password", { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ========== Productos  ========== */

export const getProducts = async (page: number, size: number) => {
  try {
    const config = {
      ...getAuthHeaders(),
      params: { page, size },
    };

    const response = await api.get("/productos", config);

    return {
      data: response.data.content,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const searchProducts = async (
  page: number,
  size: number,
  id?: number,
  nombre?: string,
  precioMin?: number,
  precioMax?: number
) => {
  try {
    const config = {
      ...getAuthHeaders(),
      params: { page, size, id, nombre, precioMin, precioMax },
    };

    const response = await api.get("/productos/search", config);

    return {
      data: response.data.content,
      totalPages: response.data.totalPages,
    };
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para obtener un producto específico por su ID
export const getProductById = async (
  productId?: number
): Promise<Product | null> => {
  try {
    const response = await api.get(`/productos/${productId}`, getAuthHeaders());
    const product = response.data;
    return product;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

// Función para crear o actualizar un producto
export const saveProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await api.post("/productos", product, getAuthHeaders());
    const savedProduct = response.data;
    return savedProduct;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para eliminar un producto por ID
export const deleteProductById = async (productId?: number): Promise<void> => {
  try {
    await api.delete(`/productos/${productId}`, getAuthHeaders());
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ========== Validar Stock de Producto ========== */

export const checkStockProducto = async (id?: number, cantidad?: number) => {
  try {
    const response = await api.post(
      `/productos/${id}/verificar-stock`,
      {
        cantidad: cantidad,
      },
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Error al verificar el stock del producto");
    }
  }
};

// Función para actualizar la orden de provisión de un producto
export const updateOrderProvision = async (
  productId?: number,
  cantidad?: number,
  precio?: number
): Promise<Product> => {
  try {
    const response = await api.put(
      `/productos/${productId}/update-stock-and-price`,
      { cantidad, precio },
      getAuthHeaders()
    );
    const updatedProduct = response.data;
    return updatedProduct;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para actualizar el descuento promocional de un producto
export const updatePromotionalDiscount = async (
  productId?: number,
  descuento?: number
): Promise<Product> => {
  try {
    const response = await api.put(
      `/productos/${productId}/update-descuento`,
      { descuento },
      getAuthHeaders()
    );
    const updatedProduct = response.data;
    return updatedProduct;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ========== CLIENTES ========== */

export const getAllClients = async () => {
  try {
    const response = await api.get("/clientes", getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getClientById = async (id?: number) => {
  try {
    const response = await api.get(`/clientes/${id}`, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getClientByEmail = async (email?: string) => {
  try {
    const response = await api.get(
      `/clientes/email/${email}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para crear un nuevo cliente
export const createClient = async (clientData: Costumer) => {
  try {
    const response = await api.post("/clientes", clientData, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateClient = async (id?: number, clientData?: Costumer) => {
  try {
    const response = await api.put(
      `/clientes/${id}`,
      clientData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteClient = async (id?: number) => {
  try {
    await api.delete(`/clientes/${id}`, getAuthHeaders());
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ========== USUARIOS HABILITADOS PARA OPERAR POR UN CLIENTE ========== */

export const getAllAuthorizedUsers = async () => {
  try {
    const response = await api.get(
      "/clientes/usuarios-habilitados",
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getAuthorizedUserById = async (id?: number) => {
  try {
    const response = await api.get(
      `/clientes/usuarios-habilitados/${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const createAuthorizedUser = async (
  id?: number,
  userData?: AuthorizedUser
) => {
  try {
    const response = await api.post(
      `/clientes/${id}/usuarios-habilitados`,
      userData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateAuthorizedUser = async (
  id?: number,
  userData?: AuthorizedUser
) => {
  try {
    const response = await api.put(
      `/clientes/usuarios-habilitados/update-usuario-habilitado/${id}`,
      userData,
      getAuthHeaders()
    );
    console.log("userData Recibida: ", userData);
    console.log("RsponseDAta: ", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteAuthorizedUser = async (id?: number) => {
  try {
    await api.delete(`/clientes/usuarios-habilitados/${id}`, getAuthHeaders());
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ========== OBRAS ========== */
export const getAllObras = async () => {
  try {
    const response = await api.get("/obras", getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getEstadosObras = async () => {
  try {
    const response = await api.get("/obras/estados", getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getObraById = async (id?: number) => {
  try {
    const response = await api.get(`/obras/${id}`, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const createObra = async (obraData: Building) => {
  try {
    const response = await api.post("/obras", obraData, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateObra = async (id?: number, obraData?: Building) => {
  try {
    const response = await api.put(`/obras/${id}`, obraData, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteObra = async (id?: number) => {
  try {
    await api.delete(`/obras/${id}`, getAuthHeaders());
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ========== Obtener latitud y longitud pasando la dirección como body ========== */
export const getCoordinates = async (
  address: Address
): Promise<Coordinates> => {
  try {
    const response = await api.post(
      "/obras/coordenadas",
      address,
      getAuthHeaders()
    );
    return response.data as Coordinates;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ========== Aplicar reglas de negocio previo a asignar una obra ========== */
export const validarObra = async (idCliente?: number, obraData?: Building) => {
  try {
    const response = await api.post(
      `/obras/cliente/validar-obra/${idCliente}`,
      obraData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ========== GESTION DE PEDIDOS ========== */

export const getAllPedidos = async () => {
  try {
    const response = await api.get("/pedidos", getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getPedidoById = async (id: string) => {
  try {
    const response = await api.get(`/pedidos/${id}`, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const createPedido = async (pedidoData: any) => {
  try {
    const response = await api.post("/pedidos", pedidoData, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Error al procesar el pedido: " + error.message);
    }
  }
};

export const deletePedido = async (id?: string) => {
  try {
    await api.delete(`/pedidos/${id}`, getAuthHeaders());
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const addClienteToPedido = async (id: string, clienteData: any) => {
  try {
    const response = await api.post(
      `/pedidos/${id}/cliente`,
      clienteData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const addProductoToDetalle = async (id: string, detalleData: any) => {
  try {
    const response = await api.post(
      `/pedidos/${id}/detalle`,
      detalleData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getClienteByPedidoId = async (pedidoId: string) => {
  try {
    const response = await api.get(
      `/pedidos/clientes/${pedidoId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getProductosByPedidoId = async (pedidoId: string) => {
  try {
    const response = await api.get(
      `/pedidos/productos/${pedidoId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const newStatusOrder = async (pedidoId?: string, orderHistory?: any) => {
  try {
    const response = await api.put(
      `/pedidos/${pedidoId}/estado`,
      orderHistory,
      getAuthHeaders()
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para obtener el token
const getAuthHeaders = () => {
  const token = getFromLocalstorage("jwt");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
