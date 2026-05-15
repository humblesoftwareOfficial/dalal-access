# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start Expo dev server (scan QR with Expo Go)
npm run android    # Start with Android emulator
npm run ios        # Start with iOS simulator
npm run web        # Start with web browser
```

No lint or test scripts are configured. This is a JavaScript project (no TypeScript).

## App Overview

**Dalal Access** (`com.humblesoft.dalalaccess`) — a mobile event access-control system. Core flows: authenticate → manage events → scan QR codes at entry → track guest check-ins.

## Architecture

### Entry & Providers

[App.js](App.js) bootstraps fonts, then wraps the app in:
- `UserProvider` + `EventProvider` — React Context for global state (no Redux)
- `PaperProvider` — react-native-paper theming
- `SafeAreaProvider`, `RootSiblingParent`

### Navigation

[src/navigation/index.js](src/navigation/index.js) uses a React Navigation Stack. On mount it reads secure storage; if a token exists the user lands on `Home`, otherwise on `Authentication`.

Stack routes: `Authentication` → `Home` → `EventAccess` / `NewGuest` / `GuestInfos`

### State Management

Two Context providers in [src/config/contexts/](src/config/contexts/):
- `UserContext` — current user, auth token
- `EventContext` — active event data

### API Layer

[src/config/api/index.js](src/config/api/index.js) — Axios client with Bearer token auth.  
Base URL is currently hardcoded to `http://192.168.10.93:3000` (local dev); a production URL is commented out. Switch this when targeting production.

Endpoint groups: authentication, users, access control, events, guests.

### Local Storage

[src/config/local/](src/config/local/) uses `expo-secure-store` to persist: `access_token`, `code`, `email`, `firstName`, `lastName`.

### Styling

- [src/styling/colors.js](src/styling/colors.js) — central color palette
- [src/styling/system.js](src/styling/system.js) — global layout constants
- Per-domain style files: `cards.js`, `inputs.js`, `guests.js`, `event.js`, `contact.js`
- Component-level styles use `styled-components`

### Key Directories

| Path | Purpose |
|---|---|
| `src/screens/` | Feature screens (`Home/`, `access/`, `authentification/`, `guests/`) |
| `src/components/` | Shared UI components (buttons, cards, modals, inputs, etc.) |
| `src/config/api/` | Axios API client |
| `src/config/contexts/` | UserContext and EventContext providers |
| `src/config/local/` | Secure storage helpers |
| `src/styling/` | Colors, layout constants, shared style objects |
| `src/navigation/` | Stack navigator and auth guard |
| `src/assets/` | Fonts and images |

## Build & Distribution

[eas.json](eas.json) defines EAS Build profiles:
- `development` — dev client build
- `beta` / `preview` — internal distribution
- `production` — store release

Run EAS builds with: `eas build --profile <profile> --platform <ios|android>`

## Notable Dependencies

- `expo-camera` + `expo-barcode-scanner` — QR/barcode scanning at event entry
- `react-native-paper` — Material Design component library
- `react-native-qrcode-svg` — QR code generation for guests
- `expo-contacts` + `expo-calendar` — contact/calendar integration
- `libphonenumber-js` — phone number validation
- `react-native-calendars` — calendar UI
