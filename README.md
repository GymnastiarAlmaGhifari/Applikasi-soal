<h1 align="center"> Quiz App </h1>
<h3 align="center"> A quiz application that can be used to create and answer questions. </h3>

</br>

![-----------------------------------------------------](https://github.com/GymnastiarAlmaGhifari/Applikasi-soal/blob/main/Frontend/public/image.png)

<!-- TABLE OF CONTENTS -->
<h2 id="table-of-contents"> :book: Table of Contents</h2>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project"> ➤ About The Project</a></li>
    <li><a href="#Technology"> ➤ Technology</a></li>
    <li><a href="#folder-structure"> ➤ Folder Structure</a></li>
    <li><a href="#Quick"> ➤ Quick Start</a></li>
    <li><a href="#Contributors"> ➤ Contributors</a></li>
  </ol>
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- ABOUT THE PROJECT -->
<h2 id="about-the-project"> :pencil: About The Project</h2>

<p align="justify">
This question application has features that users create and answer questions with flexible settings for categories, numbers, difficulty levels, types, and time. Equipped with automatic assessment features, comprehensive results, and discussions.</p>
![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- Technology -->
<h2 id="Technology"> :fork_and_knife: Technology</h2>

<!--This project is written in Python programming language. <br>-->

The following open source packages are used in this project:

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Axios](https://axios-http.com/)
- [Docker](https://www.docker.com/)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!-- :paw_prints:-->
<!-- FOLDER STRUCTURE -->
<h2 id="folder-structure"> :cactus: Frontend Folder Structure</h2>

    code
    .
    │
    ├── node_modules
    ├── public
    │   ├── images
    ├── src
    │   ├── api
    |   │   ├── api.ts
    |   ├── components
    |   │   ├── common
    |   │   │  ├── ResultItem.tsx
    |   │   │  ├── SoalItem.tsx
    |   │   ├── ui
    |   │   │  ├── button.tsx
    |   │   │  ├── card.tsx
    |   │   │  ├── input.tsx
    |   │   │  ├── label.tsx
    |   │   │  ├── password-input.tsx
    |   │   │  ├── radio-group.tsx
    |   │   │  ├── select.tsx
    |   │   ├── ContentHasil.tsx
    |   │   ├── ContentSoal.tsx
    |   │   ├── CreateSoal.tsx
    |   │   ├── Header.tsx
    |   ├── context
    |   │   ├── Auth.tsx
    |   ├── hooks
    |   │   ├── useTrivia.ts
    |   │   ├── useTriviaResult.ts
    |   ├── lib
    |   │   ├── utils.ts
    |   │   ├── zodSchema.ts
    |   ├── pages
    │   │   ├── Dashboard.tsx
    │   │   ├── Hasil.tsx
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── Soal.tsx
    │   ├── services
    │   │   ├── AuthService.ts
    │   │   ├── TimerService.ts
    │   │   ├── TriviaService.ts
    │   ├── types
    │   │   ├── index.ts
    │   ├── App.tsx
    │   ├── global.css
    │   ├── main.tsx
    │   ├── vite-env.d.ts
    ├── .gitignore
    ├── .eslintrc.json
    ├── components.json
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── README.md
    ├── tailwind.config.js
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Quick"> ⚡️ Quick start </h2>

First, clone the repository:

```bash
git https://github.com/GymnastiarAlmaGhifari/Applikasi-soal.git
```

add two tabs in your terminal and run one of these commands in each tab:

```bash
cd frontend
```

```bash
cd backend
```

Install the necessary dependencies for Frontend and Backend:
    
 ```bash
npm install
```

<!-- forfrontend -->
add a .env file in the frontend folder and add the following environment variables:

```bash
VITE_BACKEND_URL=http://localhost:your_backend_port
```

<!-- forbackend -->
add a .env file in the backend folder and add the following environment variables:

```bash
JWT_SECRET=your_secret
DATABASE_URL=mysql://user:password@db:3306/databasename
```

<!-- prisma database -->
For backend and run the following command to create the tables in the database:

```bash
npx prisma db push
```

Start the development frontend:
    
```bash
npm run dev
```

Start the development server:

```bash
npm run nd:start
```

That's all you need to know to start! 🎉

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="Contributors">📜 Contributors</h2>

This project is the result of the collaborative efforts of several contributors. 💖 We appreciate the hard work and dedication of the following individuals:

<table align="center">
  <tr border="none">
    <td valign="top">  <a href="https://gymnastiarag.my.id/">
    <img src="https://github.com/7exp/backend/blob/main/public/images/AGIM-modified.png" alt="Gymnastiar Alma Ghifari" width="200px">
    <p align="center">Gymnastiar Alma Ghifari</p>
  </tr>
</table>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)
