````md
# RemoteControl

Aplicación móvil desarrollada con **React Native**, **Expo** y **TypeScript** para la administración de dispositivos inteligentes.

La aplicación permite registrar dispositivos, administrarlos y controlar su estado mediante una interfaz sencilla e intuitiva. Toda la información se almacena localmente utilizando **AsyncStorage**, permitiendo conservar los datos entre ejecuciones de la aplicación.

---

## Características

La aplicación permite:

- Agregar nuevos dispositivos.
- Editar dispositivos existentes.
- Eliminar dispositivos.
- Encender y apagar dispositivos.
- Marcar dispositivos como favoritos.
- Visualizar únicamente los dispositivos favoritos.
- Persistencia local mediante AsyncStorage.
- Navegación mediante Bottom Tabs y Native Stack.
- Interfaz desarrollada completamente con componentes nativos de React Native.

---

## Conceptos aplicados

Durante el desarrollo del proyecto se aplicaron los siguientes conceptos:

- React Native con Expo
- TypeScript
- Componentes funcionales
- Hooks
  - useState
  - useEffect
  - useCallback
  - useFocusEffect
- React Navigation
- AsyncStorage
- Componentización
- Props
- Manejo de estado
- FlatList
- Formularios
- Arquitectura modular
- Separación de responsabilidades

---

## Tecnologías utilizadas

### Frameworks

- React Native 0.81
- Expo SDK 54

### Lenguajes

- TypeScript
- JavaScript

### Navegación

- React Navigation
  - Native Stack Navigator
  - Bottom Tab Navigator

### Persistencia de datos

- AsyncStorage

### Componentes UI

- React Native Paper
- Expo Vector Icons

### Otras librerías utilizadas

- Firebase *(preparado para futuras integraciones)*
- React Native Gesture Handler
- React Native Safe Area Context

---

## Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm
- Git

Y alguna de las siguientes opciones para ejecutar la aplicación:

- Expo Go
- Android Studio

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/juanires/TrabajoFinalRN.git
```

Ingresar al proyecto:

```bash
cd TrabajoFinalRN
```

Instalar las dependencias:

```bash
npm install
```

---

## Ejecución

Iniciar el servidor de desarrollo:

```bash
npx expo start
```

También puede ejecutarse mediante:

Android

```bash
npm run android
```

iOS

```bash
npm run ios
```

Web

```bash
npm run web
```

---

## Estructura del proyecto

```
TrabajoFinalRN
│
├── app/
│
├── assets/
│
├── components/
│
├── navigation/
│
├── screens/
│
├── storage/
│
├── styles/
│
├── types/
│
├── App.tsx
│
├── package.json
│
└── README.md
```

La organización del proyecto sigue una arquitectura modular que facilita el mantenimiento y la reutilización del código.

---

## Arquitectura

El proyecto se encuentra dividido en diferentes módulos con responsabilidades específicas.

| Carpeta | Responsabilidad |
|----------|-----------------|
| **screens** | Pantallas principales de la aplicación |
| **components** | Componentes reutilizables |
| **navigation** | Configuración de la navegación |
| **storage** | Persistencia mediante AsyncStorage |
| **types** | Interfaces y tipos TypeScript |
| **styles** | Hojas de estilos |
| **assets** | Recursos gráficos e imágenes |

Esta organización permite mantener el código desacoplado y facilita la incorporación de nuevas funcionalidades.

---

## Decisiones de diseño

Aunque el proyecto fue creado utilizando una plantilla de **Expo**, cuya entrada principal es `expo-router/entry`, la navegación de la aplicación fue implementada completamente utilizando **React Navigation**.

Esta decisión fue tomada con fines educativos para comprender en profundidad el funcionamiento de la navegación en React Native antes de utilizar soluciones basadas en archivos como Expo Router.

Durante el desarrollo se implementaron manualmente conceptos como:

- Native Stack Navigation.
- Bottom Tab Navigation.
- Navegación entre pantallas.
- Paso de parámetros.
- Gestión del ciclo de vida mediante `useFocusEffect`.
- Organización de múltiples navegadores.

Expo Router se mantiene únicamente como punto de entrada del proyecto generado por Expo, mientras que toda la lógica de navegación se implementó utilizando React Navigation.


Repositorio del proyecto:

https://github.com/juanires/TrabajoFinalRN
````
