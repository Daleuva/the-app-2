# Saturn App

A premium, mobile-first social and dating application designed to provide a seamless user experience. This project is built with **Next.js**, **Tailwind CSS**, and **PWA (Progressive Web App)** technologies, optimized for mobile devices and conversion into a native APK.

## 📱 Project Overview

This application is designed from the ground up to function as a native mobile app. It features a modern, high-end UI with smooth animations and a comprehensive feature set for social interaction.

### Key Features

The project includes a complete ecosystem of features:

*   **Authentication & Onboarding**:
    *   Secure **Login** system.
    *   Engaging **Welcome** screens.
    *   Interactive **Quiz** for user preferences.
    *   Account **Verification** flow.

*   **Profile System**:
    *   **Setup Profile**: Guided flow to create a user profile.
    *   **Edit Profile**: Easy-to-use interface for updating details.
    *   **View Profile**: Rich profile displays.

*   **Social Interaction**:
    *   **Matches**: Algorithm-driven matching system.
    *   **Likes**: See who likes you and manage interactions.
    *   **Chat**: Real-time messaging interface.

*   **Monetization**:
    *   **Subscription**: Premium features and subscription management.

## 🛠 Technical Architecture (PMW/PWA)

This project utilizes **PWA (Progressive Web App)** technology (referenced as "PMW" in some contexts). This allows the web application to:

1.  **Install on Devices**: Users can add the app to their home screen.
2.  **Offline Capabilities**: Caching strategies for performance and offline access.
3.  **Native-like Feel**: Smooth transitions and app-like navigation.

It is built using:
*   **Next.js 14**: For server-side rendering and routing.
*   **Tailwind CSS**: For rapid, utility-first styling.
*   **Framer Motion**: For fluid animations.
*   **next-pwa**: To handle PWA service worker generation.

## 📲 Mobile App & APK Conversion

**Important**: This project is explicitly designed to be converted into a mobile application (APK for Android).

*   **Mobile-First Design**: All UI elements are sized and positioned for touch interaction on mobile screens.
*   **APK Generation**: The PWA structure allows for easy wrapping into an APK using tools like Trusted Web Activities (TWA) or PWA-to-APK converters.
*   **Usage**: The app is intended to be used primarily on mobile devices or in a mobile-view emulator.

## 🚀 Getting Started

To run the project locally for development:

1.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**:
    Open [http://localhost:3000](http://localhost:3000).
    > **Tip**: Open your browser's DevTools (F12) and toggle the "Device Toolbar" (Ctrl+Shift+M) to view the app in mobile mode.

## 📦 Build for Production

To build the application for production deployment:

```bash
npm run build
npm start
```

---

## Project overview (Português Brasil)

Este é um aplicativo social e de namoro premium, desenvolvido com foco na experiência mobile. O projeto utiliza tecnologias **Next.js**, **Tailwind CSS** e **PWA (Progressive Web App)**, sendo otimizado para dispositivos móveis e para conversão em um aplicativo nativo (APK).

### Visão Geral do Projeto

O aplicativo foi desenhado desde o início para funcionar como um app nativo. Ele apresenta uma interface moderna de alta qualidade, com animações fluidas e um conjunto completo de funcionalidades para interação social.

### Principais Funcionalidades

O projeto inclui um ecossistema completo de recursos:

*   **Autenticação e Onboarding**:
    *   Sistema seguro de **Login**.
    *   Telas de **Boas-vindas** envolventes.
    *   **Quiz** interativo para preferências do usuário.
    *   Fluxo de **Verificação** de conta.

*   **Sistema de Perfil**:
    *   **Configuração de Perfil**: Fluxo guiado para criar o perfil do usuário.
    *   **Editar Perfil**: Interface fácil para atualizar detalhes.
    *   **Visualizar Perfil**: Exibição rica de perfis.

*   **Interação Social**:
    *   **Matches**: Sistema de combinação baseado em algoritmo.
    *   **Likes**: Veja quem curtiu você e gerencie interações.
    *   **Chat**: Interface de mensagens em tempo real.

*   **Monetização**:
    *   **Assinatura**: Recursos premium e gerenciamento de assinaturas.

### Arquitetura Técnica (PMW/PWA)

Este projeto utiliza a tecnologia **PWA (Progressive Web App)** (às vezes referenciada como "PMW"). Isso permite que a aplicação web:

1.  **Instalação em Dispositivos**: Usuários podem adicionar o app à tela inicial.
2.  **Capacidades Offline**: Estratégias de cache para performance e acesso offline.
3.  **Sensação de App Nativo**: Transições suaves e navegação similar a apps nativos.

### App Mobile e Conversão APK

**Importante**: Este projeto foi explicitamente projetado para ser convertido em um aplicativo móvel (APK para Android).

*   **Design Mobile-First**: Todos os elementos da interface são dimensionados e posicionados para interação por toque em telas de celular.
*   **Geração de APK**: A estrutura PWA permite fácil empacotamento em um APK usando ferramentas como Trusted Web Activities (TWA) ou conversores de PWA para APK.
*   **Uso**: O app deve ser usado principalmente em dispositivos móveis ou em emuladores de visualização móvel.
