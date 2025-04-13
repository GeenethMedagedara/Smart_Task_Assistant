# Smart_Task_Assistant

---

## Overview

Developed an AI-integrated Smart Task Assistant to streamline daily productivity through natural language input. This full-stack application has the ability to use OpenAI's LLM to break down tasks into subtasks using LangChain, which can also sync with Google Calendar(sets dates), Gmail(sends reminder emails) and Trello(Create Cards) for scheduling using Zapier.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [How This Works](#how-this-works)
- [Why Built](#why-this-is-built)

## Features:

- Ability break down tasks into manageable subtasks using LLM (LangChain + OpenAI).
- Google Calendar integration to schedule tasks/events.
- Email reminders using Gmail.
- External API integrations for tools like Notion and Zapier.
- Mark tasks as complete and trigger automated workflows (e.g., via Zapier).

## Tech Stack

- Frontend: React.js (Vite), TailwindCSS
- Backend: Node.js & Express (Task logic, scheduling), FastAPI (LangChain microservice)
- AI & NLP: LangChain, OpenAI API (GPT-4)
- APIs & Services: Zapier Webhooks, MongoDB (via Mongoose)

## Installation

1. Clone Repo

```
git clone https://github.com/GeenethMedagedara/Smart_Task_Assistant.git
cd smart_task_assistant
```

2. Install Dependencies

```
pip install -r requirements.txt

# Go to client directory
cd client
npm install

# Go to server directory
cd server
npm install
```

3. Run the App
```
# To run react app
cd client 
npm run dev

# To run flask backend
cd server
npm start

# To run fastAPI microservice
cd langchain_service
uvicorn main:app --reload --port 5001
```

5. Access the frontend at
```
http://localhost:8080
```

## How This Works

> In the UI user hase the ability to create, update, complete and delete tasks. When a task is created Zapier webhook is triggered and the task is set automatically in the google calendar and Trello Card is created along with an email is also sent using Gmail. In the Assistant tab user has the ability to access the ChatGPT LLM integrated using LangChain and has the ability converse with the user Create Sub-tasks and also organize task into the respective category using prompt engineering.

## Why This is Built

> This project is created to gain an understanding of how to implement automation and scheduling techniques and to showcase practical integration of LLMs, microservices, usage of automation tools in a real-world task management scenarios.