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

// updateUser function in React
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

// Función para obtener la lista de productos
export const getProducts = async (): Promise<Product[]> => {
  try {
    // Obtén el token del local storage
    const token = getFromLocalstorage("jwt");

    // Configura la cabecera de autorización
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Realiza la solicitud para obtener la lista de productos
    const response = await api.get("/productos", config);
    const products = response.data;

    return products;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para obtener un producto específico por su ID
export const getProductById = async (
  productId: number
): Promise<Product | null> => {
  try {
    // Obtén el token del local storage
    const token = getFromLocalstorage("jwt");

    // Configura la cabecera de autorización
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Realiza la solicitud para obtener el producto por ID
    const response = await api.get(`/productos/${productId}`, config);
    const product = response.data;

    return product;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // Si el producto no se encuentra, retorna null
      return null;
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

// Función para crear o actualizar un producto
export const saveProduct = async (product: Product): Promise<Product> => {
  try {
    // Obtén el token del local storage
    const token = getFromLocalstorage("jwt");

    // Configura la cabecera de autorización
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Si el id es null, se crea un nuevo producto, de lo contrario se actualiza el producto existente
    const response = await api.post("/productos", product, config);
    const savedProduct = response.data;

    return savedProduct;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para eliminar un producto por ID
export const deleteProductById = async (productId?: number): Promise<void> => {
  try {
    // Obtén el token del local storage
    const token = getFromLocalstorage("jwt");

    // Configura la cabecera de autorización
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Realiza la solicitud para eliminar el producto por ID
    await api.delete(`/productos/${productId}`, config);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ==========  CLIENTES ========== */

// Función para obtener la lista de clientes
export const getAllClients = async () => {
  try {
    const token = getFromLocalstorage("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get("/clientes", config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para obtener un cliente por ID
export const getClientById = async (id?: number) => {
  try {
    const token = getFromLocalstorage("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get(`/clientes/${id}`, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para obtener un cliente por ID
export const getClientByEmail = async (email?: string) => {
  try {
    const token = getFromLocalstorage("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get(`/clientes/email/${email}`, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para crear un nuevo cliente
export const createClient = async (clientData: Costumer) => {
  try {
    const token = getFromLocalstorage("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.post("/clientes", clientData, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para actualizar un cliente existente
export const updateClient = async (id?: number, clientData?: Costumer) => {
  try {
    const token = getFromLocalstorage("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.put(`/clientes/${id}`, clientData, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para eliminar un cliente
export const deleteClient = async (id?: number) => {
  try {
    const token = getFromLocalstorage("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await api.delete(`/clientes/${id}`, config);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ========== USUARIOS HABILITADOS PARA OPERAR POR UN CLIENTE ========== */

// Función para obtener la lista de usuarios habilitados
export const getAllAuthorizedUsers = async () => {
  try {
    const token = getFromLocalstorage("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get("/clientes/usuarios-habilitados", config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para obtener un usuario habilitado por ID
export const getAuthorizedUserById = async (id?: number) => {
  try {
    const token = getFromLocalstorage("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get(
      `/clientes/usuarios-habilitados/${id}`,
      config
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para crear un nuevo usuario habilitado
export const createAuthorizedUser = async (
  id?: number,
  userData?: AuthorizedUser
) => {
  try {
    const token = getFromLocalstorage("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.post(
      `/clientes/${id}/usuarios-habilitados`,
      userData,
      config
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para actualizar un usuario habilitado existente
export const updateAuthorizedUser = async (
  id?: number,
  userData?: AuthorizedUser
) => {
  try {
    const token = getFromLocalstorage("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.put(
      `/clientes/usuarios-habilitados/${id}`,
      userData,
      config
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Función para eliminar un usuario habilitado
export const deleteAuthorizedUser = async (id?: number) => {
  try {
    const token = getFromLocalstorage("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await api.delete(`/clientes/usuarios-habilitados/${id}`, config);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ==========  OBRAS ========== */
export const getAllObras = async () => {
  try {
    const response = await api.get("/obras");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getEstadosObras = async () => {
  try {
    const response = await api.get("/obras/estados");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getObraById = async (id?: number) => {
  try {
    const response = await api.get(`/obras/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const createObra = async (obraData: Building) => {
  try {
    const response = await api.post("/obras", obraData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateObra = async (id?: number, obraData?: Building) => {
  try {
    const response = await api.put(`/obras/${id}`, obraData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteObra = async (id?: number) => {
  try {
    await api.delete(`/obras/${id}`);
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/* ========== Obtener latitud y longitud pasando la dirección como body ========== */
export const getCoordinates = async (
  address: Address
): Promise<Coordinates> => {
  try {
    const response = await api.post("/obras/coordenadas", address);
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
      obraData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
