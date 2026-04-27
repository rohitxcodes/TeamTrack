# Frontend Tree

## Tree

```text
Frontend/
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
├── public/
│   ├── logo.svg
│   ├── logoDark.svg
│   └── user.svg
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── Common/
    │   │   └── PageHeader.jsx
    │   └── layout/
    │       ├── Footer.jsx
    │       └── Navbar.jsx
    ├── context/
    │   ├── theme-context.js
    │   ├── ThemeContext.jsx
    │   └── useTheme.js
    ├── pages/
    │   ├── Admin/
    │   │   ├── AdminTasksPage.jsx
    │   │   └── AdminUsersPage.jsx
    │   ├── Both/
    │   │   ├── AccountPage.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── WorkSpace.jsx
    │   └── Public/
    │       ├── AboutPage.jsx
    │       ├── HomePage.jsx
    │       ├── LandingPage.jsx
    │       ├── LoginPage.jsx
    │       └── RegisterPage.jsx
    ├── routes/
    │   └── AppRouter.jsx
    └── style/
        ├── App.css
        └── index.css
```

## One-line Description Per File

- `.env`: Frontend environment variables used at build/runtime.
- `.gitignore`: Git ignore rules for frontend artifacts.
- `eslint.config.js`: ESLint setup for linting JavaScript/React code.
- `index.html`: Root HTML shell where the React app mounts.
- `package-lock.json`: Exact dependency lockfile for reproducible installs.
- `package.json`: Frontend scripts, metadata, and dependencies.
- `vite.config.js`: Vite dev/build configuration.
- `public/logo.svg`: Light-theme TeamTrack logo asset.
- `public/logoDark.svg`: Dark-theme TeamTrack logo asset.
- `public/user.svg`: User/account icon asset.
- `src/App.jsx`: Top-level app composition (theme provider + router).
- `src/main.jsx`: React entry point that mounts app to DOM.
- `src/components/Common/PageHeader.jsx`: Reusable page title/subtitle UI block.
- `src/components/layout/Footer.jsx`: Shared footer UI component.
- `src/components/layout/Navbar.jsx`: Shared navbar UI with theme toggle button.
- `src/context/theme-context.js`: Theme context object definition.
- `src/context/ThemeContext.jsx`: Theme provider and theme toggle logic.
- `src/context/useTheme.js`: Hook to consume theme context values.
- `src/pages/Admin/AdminTasksPage.jsx`: Admin tasks screen UI.
- `src/pages/Admin/AdminUsersPage.jsx`: Admin users screen UI.
- `src/pages/Both/AccountPage.jsx`: Account/profile screen UI.
- `src/pages/Both/Dashboard.jsx`: Dashboard board-style screen UI.
- `src/pages/Both/WorkSpace.jsx`: Workspace screen UI.
- `src/pages/Public/AboutPage.jsx`: Public about screen UI.
- `src/pages/Public/HomePage.jsx`: Public home screen UI.
- `src/pages/Public/LandingPage.jsx`: Public landing/hero screen UI.
- `src/pages/Public/LoginPage.jsx`: Login form screen UI.
- `src/pages/Public/RegisterPage.jsx`: Register form screen UI.
- `src/routes/AppRouter.jsx`: Central route-to-page mapping.
- `src/style/App.css`: App-level shared style classes.
- `src/style/index.css`: Global base styles and utility foundations.
